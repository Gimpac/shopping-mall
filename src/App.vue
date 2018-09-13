<template>

  <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span style="fontSize:16px">电商项目</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <span v-show="isLogin">
                        <router-link to="/login" class="">登录</router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-show="!isLogin">
                        <a href="" class="">会员中心</a>
                        <strong>|</strong>
                        <a @click="checkout">退出</a>
                        <strong>|</strong>
                    </span>
                    <router-link to="/shopcar" class="">
                        <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
                        <span >
                            <span>{{$store.getters.getBuycount}}</span>
                        </span>)</router-link>
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">首页</span>
                            </a>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">饿了吗超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <!-- <a href="" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a> -->
                            <router-link to="/goodslist" class="router-link-exact-active ">
                            <span class="out" style="top: 0px;">购物商城</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>

        <!-- 中间部分 -->
        <router-view></router-view>
        

        <!-- 页面底部 -->
         <div class="footer">
                <div class="section">
                    <div class="foot-nav">
                        <a href="">关于我们</a>
                        <strong>|</strong>
                        <a href="">联系我们</a>
                        <strong>|</strong>
                        <a href="">联系客服</a>
                        <strong>|</strong>
                        <a href="">合作招商</a>
                        <strong>|</strong>
                        <a href="">商家帮助</a>
                        <strong>|</strong>
                        <a href="">营销中心</a>
                        <strong>|</strong>
                        <a href="">隐私政策</a>
                    </div>
                    <div class="foot-box">
                        <div class="copyright">
                            <p>版权所有 黑马买买买 </p>
                            <p>公司地址： 联系电话：</p>
                            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                        </div>
                        <div class="service">
                            <p>周一至周日 9:00-24:00</p>
                            <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                        </div>
                    </div>
                </div>
            </div>

    </div>

</template>

<script>
//导入jquery
import $ from "jquery"
//把导入的jquery挂在window
window.$ = $
window.jQuery = $

import {bus} from './common/commonBus.js'

export default {
    data(){
        return {
            isLogin:true
        }
    },
    created(){
        bus.$on('loginSuccess',()=>{           
            this.isLogin = false
        })
       
    },
    methods:{
         //退出
      checkout(){
        this.$confirm('确定要退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$axios.get('site/account/logout').then(response=>{
            if(response.data.status === 0){
              // 通过编程式导航，跳转到首页
              this.$router.push({path:'/goodslist'})

              // 更改isLogin为true
              this.isLogin = true
            }
            })
        }).catch(() => {
          
        });
      
      }
    },
    mounted() {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });

    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "48px" }, 300); // move down - hide
        $(".over", this)
          .stop()
          .animate({ top: "0px" }, 300); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "0px" }, 300); // move up - show
        $(".over", this)
          .stop()
          .animate({ top: "-48px" }, 300); // move up - hide
      },

     
    );
  }
}
</script>

<style>
/*
    导入jquery插件的样式
*/
@import "./statics/site/jquery_plugins/hoverNav/css/style.css";

@import "./statics/site/css/style.css";
</style>
