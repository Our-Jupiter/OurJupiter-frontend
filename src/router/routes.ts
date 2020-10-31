import { RouteConfig } from 'vue-router';

import Home from '@/views/pages/Home.vue';
import Login from '@/views/pages/auth/Login.vue';
import Join from '@/views/pages/auth/Join.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/join',
    component: Join,
  },
];

export const routeMethod = {
  getRoutes: () => routes,
};
