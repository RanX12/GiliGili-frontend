import http from "./http";
import type { Video } from "./types";

// 假设后端接收的数据结构为 { title: string, info: string }
const postVideo = async (form: { title: string, info: string }): Promise<Video> => {
  try {
    const response = await http.post('/api/v1/videos', form);
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};

// 获取单个视频详情
const getVideo = async (id: number): Promise<Video[]> => {
  try {
    const response = await http.get(`/api/v1/videos/${id}`);
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
}

// 获取视频列表
const getVideos = async (): Promise<Video[]> => {
  try {
    const response = await http.get('/api/v1/videos');
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
}

export { postVideo, getVideo, getVideos };
