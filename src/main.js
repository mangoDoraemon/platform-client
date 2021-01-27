import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import Pagination from "@/components/Pagination";
import Radial from "@/components/Radial";
import {addDateRange,parseTime} from '@/utils/alarm';


// set ElementUI lang to EN
// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('Radial',Radial)
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.addDateRange = addDateRange
Vue.prototype.parseTime = parseTime
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
