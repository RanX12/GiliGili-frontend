import http from "./http";
import type { User } from "./types";

// 登录
const login = async (form: { username: string, password: string }): Promise<User> => {
  try {
    const response = await http.post('/api/v1/user/login', form);
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};

// 注册
const register = async (form: { nickname: string, user_name: string, password: string, password_confirm: string }): Promise<User> => {
  try {
    const response = await http.post('/api/v1/user/register', form);
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};

const checkUserStatus = async () => {
  try {
    const response = await http.get('/api/v1/user/check_status');
    return response.data
  } catch (error) {
    // 处理错误
    throw error;
  }
}

export { login, register, checkUserStatus };
