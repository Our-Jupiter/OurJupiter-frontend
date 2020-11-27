import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style-loader';
import { PluginInterface } from './plugins/types';
import Vuesax from 'vuesax4';
import { vsIcon } from 'vuesax3';
import 'vuesax3/dist/vuesax.css';
import 'vuesax4/dist/vuesax.min.css';
import 'material-icons/iconfont/material-icons.css';

class OurJupiter {
  public bootstrap() {
    this.registerVuesax();
    this.registerVuePlugins();
    this.registerBaseComponents();
    this.registerPluginComponents();
    this.registerInputComponents();
    this.mountVueApp();
  }

  private registerVuesax() {
    Vue.use(Vuesax);
    const vuesax3Comps = [vsIcon];
    vuesax3Comps.forEach(comp => {
      Vue.use(comp);
    });
  }

  private registerVuePlugins() {
    const requirePlugin = require.context('./plugins', true, /\.ts$/);
    requirePlugin.keys().forEach(fileName => {
      if (
        fileName.includes('types') ||
        fileName.includes('test') ||
        fileName.includes('index')
      ) {
        return;
      }

      const pluginObject = requirePlugin(fileName).default as PluginInterface;
      const { install, options } = pluginObject;
      if (options) {
        Vue.use({ install }, options);
      } else {
        Vue.use({ install });
      }
    });
  }

  private registerBaseComponents() {
    const requireComponent = require.context(
      './views/common/base-components',
      false,
      /\.vue$/
    );
    this.registerContext(requireComponent);
  }

  private registerPluginComponents() {
    const requireComponent = require.context(
      './views/common/plugin-components',
      false,
      /\.vue$/
    );
    this.registerContext(requireComponent);
  }

  private registerInputComponents() {
    const requireComponent = require.context(
      './views/common/input-components',
      false,
      /\.vue$/
    );
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
