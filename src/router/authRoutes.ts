import type {RouteRecordRaw} from "vue-router";
import type {RouteMetaDetail} from "@/types/routerMetaDetail.ts";

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth-view',
    component: () => import('@/views/AuthView.vue'),
    redirect: {name: 'login-page'},
    meta: {
      requiresAuth: false
    } as RouteMetaDetail,
    children: [
      {
        path: 'login',
        name: 'login-page',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: {
          title: '登录',
        } as RouteMetaDetail,
      },
      {
        path: 'register',
        name: 'register-page',
        component: () => import('@/pages/auth/RegisterPage.vue'),
        meta: {
          title: '注册',
        } as RouteMetaDetail,
      }
    ]
  },
];

export default authRoutes;