import type {RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import authRoutes from './authRoutes.ts';
import type {RouteMetaDetail} from "@/types/routerMetaDetail.ts";
import {useUserStore} from "@/stores";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页',
      requiresAuth: false,
    } as RouteMetaDetail
  },
  ...authRoutes
];

export const routerInstance = createRouter({
  history: createWebHistory(),
  routes,
});

routerInstance.beforeEach((to, _, next) => {
  const toMeta = to.meta as RouteMetaDetail;

  const isAuthenticated = useUserStore().authorized;

  if (toMeta.requiresAuth && !isAuthenticated) {
    next({name: 'login-page'});
  } else {
    document.title = toMeta.title ? `RakuAnime - ${toMeta.title}` : 'RakuAnime';
    next();
  }
});

export default routerInstance;