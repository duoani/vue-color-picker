import Main from './Main'
import ColorCtor from './Color'

const plugin = Vue => {
  Vue.component('VueColorPicker', Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export const Color = ColorCtor

export const component = Main

export default plugin
