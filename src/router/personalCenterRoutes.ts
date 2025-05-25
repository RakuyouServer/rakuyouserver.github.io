import type {RouteRecordRaw} from "vue-router";
import type {RouteMetaDetail} from "@/types/routerMetaDetail.ts";

const personalCenterRoutes: RouteRecordRaw[] = [
  {
    path: '/pc',
    name: 'personal-center-view',
    component: () => import('@/views/PersonalCenterView.vue'),
    redirect: {name: 'personal-info-page'},
    meta: {
      requiresAuth: true,
    } as RouteMetaDetail,
    children: [
      {
        path: 'info',
        name: 'personal-info-page',
        component: () => import('@/pages/pc/PersonalInfoPage.vue'),
        meta: {
          title: '个人信息',
          requiresAuth: true,
        } as RouteMetaDetail,
      },
    ]
  },
];

export default personalCenterRoutes;