import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Postvideo from '~/components/videos/Postvideo.vue';
import VideoInfo from '~/components/videos/VideoInfo.vue';


// 定义路由的类型
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/postvideo', component: Postvideo },
  { path: '/videos/:id', name: 'VideoInfo', component: VideoInfo, props: true }, // meta: { headerType: 'VideoInfoHeader' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
