import { RouteConfig } from 'vue-router';

import Home from '@/views/pages/Home.vue';
import Login from '@/views/pages/auth/Login.vue';
import Join from '@/views/pages/auth/Join.vue';
import GroupList from '@/views/pages/group/GroupList.vue';
import GroupMain from '@/views/pages/group/GroupMain.vue';
import Save from '@/views/pages/posts/Save.vue';
import Detail from '@/views/pages/posts/Detail.vue';
import Update from '@/views/pages/posts/Update.vue';
import List from '@/views/pages/posts/List.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/home',
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
  {
    path: '/group',
    component: GroupList,
  },
  {
    path: '/group/:id',
    component: GroupMain,
  },
  {
    path: '/save',
    name: 'save',
    component: Save,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/update/:id',
    name: 'update',
    component: Update,
  },
  {
    path: '/list/:id',
    component: List,
    name: 'list',
  },
];

export const routeMethod = {
  getRoutes: () => routes,
};
