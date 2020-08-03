import Main from './Main'

const plugin = Vue => {
  Vue.component('VueColorPicker', Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export const component = Main

export default plugin
