import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入过滤器
import './filters/filter.js'

//网络请求相关
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
Vue.prototype.$axios = axios

//懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  preLoad: 1.3,
  throttleWait:1000,
  error: require('./statics/site/images/alipay.png'),
  loading: require('./statics/site/images/01.gif')
})

Vue.use(ElementUI)

new Vue({
  router,
  render:h => h(App),
  

}).$mount('#app')
