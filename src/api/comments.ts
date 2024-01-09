import http from "./http";

// 获取单个视频详情
const getVideoComment = async (id: number) => {
  try {
    const response = await http.get(`/api/v1/videos/${id}/comments`);
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
}

export { getVideoComment };
