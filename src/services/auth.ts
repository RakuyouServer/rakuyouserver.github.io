import {axiosAuthorized, axiosUnauthorized} from "@/utils/networkUtils.ts";
import type {AccessTokenEntity, LoginRequest, RegisterRequest} from "@/types/auth.ts";
import {ref} from "vue";

export const refresh = () => new Promise<AccessTokenEntity>((resolve, reject) =>
  axiosUnauthorized.post<AccessTokenEntity>(
    '/auth/refresh'
  ).then(({data}) => {
    setAccessToken(getAccessTokenStorage(), data);
    resolve(data);
  }).catch(err => {
    clearAccessToken();
    reject(err);
  }));

export const login = (form: LoginRequest) => new Promise<AccessTokenEntity>((resolve, reject) =>
  axiosUnauthorized.postForm<AccessTokenEntity>(
    '/auth/login',
    form,
  ).then(({data}) => {
    setAccessToken(form.remember ? localStorage : sessionStorage, data);
    resolve(data);
  }).catch(error => {
    clearAccessToken();
    reject(error);
  }));

export const logout = () => new Promise<string>((resolve, reject) =>
  axiosAuthorized.post<string>(
    '/auth/logout',
  ).then(({data}) => resolve(data)).catch(reject).finally(clearAccessToken));

export const register = (form: RegisterRequest) => new Promise<string>((resolve, reject) =>
  axiosUnauthorized.post<string>(
    '/auth/register',
    form,
  ).then(({data}) => resolve(data)).catch(reject));

const getAccessToken = (): AccessTokenEntity | null => {
  const tokenEntity = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (tokenEntity == null) return null;
  return JSON.parse(tokenEntity);
};

export const accessToken =
  ref<AccessTokenEntity | null>(getAccessToken());

export const getAccessTokenStorage = (): Storage =>
  localStorage.getItem('access_token') ? localStorage : sessionStorage;

export const setAccessToken = (storage: Storage, token: AccessTokenEntity | null) => {
  if (token) {
    storage.setItem('access_token', JSON.stringify(token));
    accessToken.value = token;
  } else clearAccessToken();
};

export const clearAccessToken = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  accessToken.value = null;
};

export const isAccessTokenExpired = (): boolean => {
  const token: AccessTokenEntity | null = accessToken.value;
  if (!token) return true;
  const now = Date.now();
  return now + 3050 >= token.exp; // 如果剩余有效期不足3秒就认为过期了
};