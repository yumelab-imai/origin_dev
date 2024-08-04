"use server";
import axios from 'axios';
import humps from 'humps';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use(
    config => {
      const token = cookies().get('token')?.value;
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
      if (error.response && error.response.status === 401) {
        redirect("/user/login");
      }
      return Promise.reject(error);
    }
);

export default instance;
