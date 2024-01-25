import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Postvideo from '~/components/videos/Postvideo.vue';
import VideoInfo from '~/components/videos/VideoInfo.vue';
import ChatMessage from '~/components/users/ChatMessage.vue'


// 定义路由的类型
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/postvideo', component: Postvideo },
  { path: '/videos/:id', name: 'VideoInfo', component: VideoInfo, props: true }, // meta: { headerType: 'VideoInfoHeader' }
  { path: '/users/:id/chat', name: 'ChatMessage', component: ChatMessage, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
