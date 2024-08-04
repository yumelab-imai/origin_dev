'use client';
import axios from 'axios';
import humps from 'humps';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_CLIENT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use(
    config => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // データをスネークケースに変換
      if (config.data) {
        config.data = humps.decamelizeKeys(config.data);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
      // データをキャメルケースに変換
      if (response.data) {
        response.data = humps.camelizeKeys(response.data);
      }
      return response;
    },
    error => {
      // ログインしていない状態でログイン画面にアクセスしようとした場合
      if (error.response && error.response.status === 401 && window.location.pathname !== "/user/login") {
        window.location.href = "/user/login";
      }
      return Promise.reject(error);
    }
);

export default instance;
