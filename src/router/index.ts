import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Postvideo from '~/components/videos/Postvideo.vue';
import VideoInfo from '~/components/videos/VideoInfo.vue';


// 定义路由的类型
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { headerType: 'homeHeader' } },
  { path: '/about', component: About, meta: { headerType: 'homeHeader' } },
  { path: '/postvideo', component: Postvideo, meta: { headerType: 'homeHeader' } },
  { path: '/videos/:id', name: 'VideoInfo', component: VideoInfo, props: true, meta: { headerType: 'VideoInfoHeader' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
