<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in dataTop.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                          
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd >
                                                <a href="/goods/43.html" v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                             </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                                            
                                    <el-carousel indicator-position="outside" height="314px">
                                    <el-carousel-item v-for="item in dataTop.sliderlist" :key="item.id">                                   
                                    <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                    </el-carousel>                                
                              
                             
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(items,index) in dataTop.toplist" :key="items.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="items.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{items.title}}</a>
                                    
                                    <span>{{items.add_time | dateFmt}}</span>
                                </div>
                            </li>
                    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section" v-for="profood in prodataTop" :key="profood.level1cateid">
            <div class="main-tit">
                <h2>{{profood.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="prolevecate in profood.level2catelist" :key="prolevecate.suncateid">{{prolevecate.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="items in profood.datas" :key="items.artID">
                            <router-link :to="'/goodsinfo/'+items.artID" class="">
                                <div class="img-box">
                                    <img  v-lazy="items.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{items.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{items.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{items.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{items.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>                                        
                    </ul>
                </div>
            </div>
        </div>
       
       
    </div>
</template>

<style>
    .el-carousel__container img{
        width: 100%;
        height: 100%;
    }
</style>

<script>

export default {
  data() {
    return {
      dataTop: {},
      prodataTop:{}
    };
  },
  created() {
    this.getTopData()
    this.getproduct()
  },
  methods: {
    getTopData() {
      this.$axios.get('site/goods/gettopdata/goods').then(response => {        
        this.dataTop = response.data.message;
      });
    },
    getproduct(){
        this.$axios.get("site/goods/getgoodsgroup").then(response=>{          
            this.prodataTop = response.data.message           
        })
    }
  }
};
</script>
