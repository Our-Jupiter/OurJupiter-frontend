import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

class OurJupiter {
  public bootstrap() {
    this.registerVuesax();
    this.registerBaseComponents();
    this.mountVueApp();
  }

  private registerVuesax() {
    Vue.use(Vuesax);
  }

  private registerBaseComponents() {
    const requireComponent = require.context('./views/common/base-components', false, /\.vue$/);
    this.registerContext(requireComponent);
  }

  private registerContext(context: __WebpackModuleApi.RequireContext) {
    context.keys().forEach(fileName => {
      const componentConfig = context(fileName);
      const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
      Vue.component(componentName, componentConfig.default || componentConfig);
    });
  }

  private mountVueApp() {
    Vue.config.productionTip = false;

    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }

}

new OurJupiter().bootstrap();