import Vue from 'vue';
import VueRouter from 'vue-router';
import { routeMethod } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routeMethod.getRoutes(),
});

router.beforeEach((to, from, next) => {
  const noAuthPaths = ['/login', '/join'];
  const path = to.matched[to.matched.length - 1].path;

  if (localStorage.getItem('token') === null && !noAuthPaths.includes(path)) {
    if (to.path !== '/login') {
      next('/login');
    }
  } else if (localStorage.getItem('token') !== null && noAuthPaths.includes(path)) {
    if (to.path !== '/group') {
      next('/group');
    }
  } else {
    next();
  }
});


export default router;
