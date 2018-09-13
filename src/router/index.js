import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//网络请求相关
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios

//导入组件
import goodslist from '../components/goods/goodslist.vue'
import goodsinfo from '../components/goods/goodsinfo.vue'
import shopcar from '../components/shopcar/shopcar.vue'
import login from '../components/account/login'
import order from '../components/order/order'

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {name:'goodslist',path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:id',component:goodsinfo },
        {name:'shopcar',path:'/shopcar',component:shopcar },
        {path:'/login',component:login },
        {name:'order',path:'/order', meta: { checkLogin: true },component:order}
        
    ],

   
})
router.beforeEach((to,from,next) => {
    //保存你从任何页面登录跳转会当前页面
    if(to.fullPath != '/login') {
        
        localStorage.setItem('lastVisitPath',to.fullPath)
        
    }
   if(to.meta.checkLogin){
       //检测是否登录
       const url = 'site/account/islogin'
       axios.get(url).then(res=>{
           if(res.data.code === 'logined'){
               next()
           }else{
               // 使用编程式导航，跳转到登录页面
               //为什么登录成功了,还是没有跳转到登录页面,因为没有记录session,axios不带session
               router.push({path:'/login'})
               
           }
       })
       
       
   }else{
       next()
   }
    
    
})

export default router