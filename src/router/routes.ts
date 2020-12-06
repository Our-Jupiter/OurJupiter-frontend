import { RouteConfig } from 'vue-router';

import Home from '@/views/pages/Home.vue';
import Login from '@/views/pages/auth/Login.vue';
import Join from '@/views/pages/auth/Join.vue';
import GroupList from '@/views/pages/group/GroupList.vue';
import GroupMain from '@/views/pages/group/GroupMain.vue';
import GroupJoin from '@/views/pages/group/GroupJoin.vue';
import Save from '@/views/pages/posts/Save.vue';
import Detail from '@/views/pages/posts/Detail.vue';
import Update from '@/views/pages/posts/Update.vue';
import List from '@/views/pages/posts/List.vue';
import CertificationCreate from '@/views/pages/certification/CertificationCreate.vue';
import CertificationList from '@/views/pages/certification/CertificationList.vue';
import GoalRecord from '@/views/pages/goal/GoalRecord.vue';

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
    name: 'groupMain',
    component: GroupMain,
  },
  {
    path: '/invite/:userId/:groupId',
    component: GroupJoin,
  },
  {
    path: '/certification',
    name: 'certificationCreate',
    component: CertificationCreate,
  },
  {
    path: '/certificationList/:groupId',
    name: 'certificationList',
    component: CertificationList,
  },
  {
    path: '/goalRecord/:groupId',
    name: 'goalRecord',
    component: GoalRecord,
  },
  {
    path: '/save/:groupId',
    name: 'save',
    component: Save,
  },
  {
    path: '/detail/:groupId/:postId',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/update/:groupId/:postId',
    name: 'update',
    component: Update,
  },
  {
    path: '/list/:groupId',
    component: List,
    name: 'list',
  },
];

export const routeMethod = {
  getRoutes: () => routes,
};
