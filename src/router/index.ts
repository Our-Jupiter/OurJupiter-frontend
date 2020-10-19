import Vue from 'vue';
import VueRouter from 'vue-router';
import { routeMethod } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routeMethod.getRoutes(),
});

export default router;
