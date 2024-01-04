export interface Video {
  id?: number; // id 创建的时候不存在，但是获取的时候存在
  title: string;
  info: string;
}

export interface User {
  nickname: string;
  user_name: string;
  password: string;
  password_confirm: string;
}