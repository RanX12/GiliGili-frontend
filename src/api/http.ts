import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001', // 替换为您的 API 基础 URL
  headers: {
    'Content-Type': 'application/json',
    // 添加任何其他需要的全局头信息
  },
  withCredentials: true,
});

export default http;
