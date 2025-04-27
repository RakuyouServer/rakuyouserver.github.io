import axios, {type AxiosError, type AxiosRequestConfig, type AxiosResponse} from "axios";
import {accessToken, clearAccessToken, getAccessTokenStorage, setAccessToken} from "@/services/auth";
import routerInstance from "@/router";
import type {AccessTokenEntity} from "@/types/auth.ts";

const baseURL = 'http://127.0.0.1:81/api';

const createInstance = () => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 3000,
  });

  type AxiosRequestRetryConfig = AxiosRequestConfig & { _retry?: boolean };

  let refreshing = false;
  let retryRequests: (() => void)[] = [];

  const addToRetryQueue = (originalRequest: AxiosRequestRetryConfig) => {
    retryRequests.push(() => {
      originalRequest._retry = true;
    });
  };

  // 请求拦截器
  instance.interceptors.request.use(config => {
    const token: AccessTokenEntity | null = accessToken.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  }, error => Promise.reject(error));

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestRetryConfig

      if (error.response?.status === 401 && !originalRequest._retry) {
        // 只针对需要验证的页面处理
        const route = routerInstance.currentRoute.value;

        const noAuthPages = ['login-page', 'register-page'];
        if (noAuthPages.includes(route?.name as string)) {
          return Promise.reject(error);
        }

        if (!refreshing) {
          refreshing = true;
          try {
            const refreshResponse = await axios.post<AccessTokenEntity>(`${baseURL}/auth/refresh`);
            const newToken = refreshResponse.data;
            setAccessToken(getAccessTokenStorage(), newToken);

            // 刷新完后执行所有挂起的请求
            retryRequests.forEach(callback => callback());
            retryRequests = [];

            refreshing = false;
          } catch (refreshError) {
            refreshing = false;
            retryRequests = [];
            // 刷新失败，跳到登录页
            clearAccessToken();
            await routerInstance.push({name: 'login-page'});
            return Promise.reject(refreshError);
          }
        }

        // 把当前请求挂起，等待刷新完成后再执行
        return new Promise(resolve => {
          addToRetryQueue(originalRequest);
          resolve(instance(originalRequest));
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createInstance();