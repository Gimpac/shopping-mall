import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入过滤器
import './filters/filter.js'



//懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  preLoad: 1.3,
  throttleWait:1000,
  error: require('./statics/site/images/alipay.png'),
  loading: require('./statics/site/images/01.gif')
})

Vue.use(ElementUI)

//导入数据管理仓库store
import store from './store'



new Vue({
  router,
  store,
  render:h => h(App),
  

}).$mount('#app')
