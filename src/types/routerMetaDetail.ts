import type {RouteMeta} from "vue-router";

export interface RouteMetaDetail extends RouteMeta {
  // 路由页面的标题
  title?: string;
  // 是否需要身份验证
  requiresAuth?: boolean;
}