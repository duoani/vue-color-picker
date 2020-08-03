import Vue from "vue";
import Dev from "./Dev.vue";
import VueColorPicker from '../src/index'

Vue.use(VueColorPicker)

new Vue({
  render: h => h(Dev)
}).$mount("#app");
