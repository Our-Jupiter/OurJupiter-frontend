import _Vue from 'vue';

export interface PluginInterface {
  install(Vue: typeof _Vue, options?: any): void;
  options?: any;
}
