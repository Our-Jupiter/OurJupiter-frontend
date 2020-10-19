import { RouteConfig } from 'vue-router';

import Home from '@/views/pages/Home.vue';
import Login from '@/views/pages/Login.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
];

export const routeMethod = {
  getRoutes: () => routes,
};
