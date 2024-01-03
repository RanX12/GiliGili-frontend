import http from "./http";

// 获取 token
const uplpadTokenAPI = async () => {
  try {
    const response = await http.post('/api/v1/upload/token');
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};

export { uplpadTokenAPI };
