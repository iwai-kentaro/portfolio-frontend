import axios from 'axios';
import { API_V1_BASE_URL } from '../constants/api';

// ローカルストレージからトークンを取得
const token = localStorage.getItem('jwt');

// axios クライアントを作成
const axiosClient = axios.create({
  baseURL: API_V1_BASE_URL,
  headers: {
    Authorization: 'Bearer' + token, // トークンがある場合のみ付与
  },
});

export default axiosClient;
