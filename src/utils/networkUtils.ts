import axios, {type AxiosRequestHeaders, type InternalAxiosRequestConfig} from "axios";
import {accessToken, isAccessTokenExpired, refresh} from "@/services/auth";
import type {AccessTokenEntity} from "@/types/auth.ts";
import routerInstance from "@/router";

const baseURL = 'http://127.0.0.1:81/api';

const createAuthInstance = () => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 3000,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<AccessTokenEntity> | null = null;

  // 请求拦截器
  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    let token: AccessTokenEntity | null = accessToken.value;

    if (!token || isAccessTokenExpired()) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refresh()
          .then(newToken => {
            isRefreshing = false;
            refreshPromise = null;
            return newToken;
          })
          .catch(error => {
            isRefreshing = false;
            refreshPromise = null;

            routerInstance.push({name: 'login-page'});
            throw error;
          });
      }

      try {
        const newToken = await refreshPromise!;
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newToken.value}`,
        } as AxiosRequestHeaders;
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.value}`,
      } as AxiosRequestHeaders;
    }

    return config;
  });

  return instance;
};

export const axiosAuthorized = createAuthInstance();
export const axiosUnauthorized = axios.create({
  baseURL: baseURL,
  timeout: 3000,
});