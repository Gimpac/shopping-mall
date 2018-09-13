<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="datainfo.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                             <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container" style="width: 368px; height: 368px;">
                                        <div class="images-cover" v-for="item in datainfo.imglist" :key="item.id">
                                            <img :src="item.thumb_path" style="width: 368px; height: 368px;">
                                        </div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in datainfo.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                             <div class="goods-spec">
                                <h1>{{datainfo.goodsinfo.title}}</h1>
                                <p class="subtitle">{{datainfo.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{datainfo.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{datainfo.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{datainfo.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="goodsCount" :min="1" :max="datainfo.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{datainfo.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToShopCart" ref="addToShopCartRef" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                         
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px; ">
                                <ul>                                   
                                    <li  @click="isShowIntroduction = true">
                                        <a href="javascript:;" :class="{selected:isShowIntroduction}">商品介绍</a>
                                    </li>
                                    <li  @click="isShowIntroduction = false">
                                        <a href="javascript:;" :class="{selected:!isShowIntroduction}">商品评论</a>
                                    </li>                                  
                                </ul>
                                 
                            </div>
                            </Affix>
                            <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                                 <p style="padding:5px;" v-html="datainfo.goodsinfo.content"></p>
                            </div>
                            <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="txtContentRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="postComment" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p  v-if="datacomment.totalcount === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="comment in datacomment.message" :key="comment.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{comment.user_name}}</span>
                                                    <span>{{comment.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{comment.content}}</p>
                                            </div>
                                        </li>
                                      
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                            background
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 10, 20, 30]"
                                            :pager-count="7"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="datacomment.totalcount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in datainfo.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                 <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>                                                                                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- 3.0 被动画元素 -->
        <transition
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter">
            <div ref="animateDivRef" v-show="isShow" v-if="datainfo.imglist" class="animateDiv">
                <img :src="datainfo.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped lang="less">
.animateDiv {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 50px;
    img{
        width: 100%;
        height: 100%;
    }
}


#tabHead {
  background-color: skyblue;
}
@import "../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css";
</style>

<script>
import "../../statics/site/jquery_plugins/jqimgzoom/js/magnifier"
//按需导入
import { Affix } from "iview"
export default {
  components: { Affix },
  data() {
    return {
      datainfo: {},
      datacomment: {},
      goodsCount: 1,
      isShowIntroduction: true,
      pageIndex: 1,
      pageSize: 10,
      isShow: false,
      addToShopCartOffset: null,
      shoppingCartCountOffset: null
    };
  },
  created() {
    this.getdatainfo();
    this.getcomment();
  },
  watch: {
    $route(newValue, oldValue) {
      this.getdatainfo();
      this.getcomment();
    }
  },
  updated() {
    // data发生了变化并且，视图已经渲染完毕了
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
  },
  methods: {
    getdatainfo() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.id}`;
      this.$axios.get(url).then(res => {
        this.datainfo = res.data.message;

        // 获取被动画元素动画开始和结束时候的偏移量
        setTimeout(() => {
          this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset();

          // 获取动画开始时候的偏移量
          $(this.$refs.animateDivRef).offset(this.addToShopCartOffset);

          this.shoppingCartCountOffset = $("#shoppingCartCount").offset();
          console.log(this.addToShopCartOffset);
          console.log(this.shoppingCartCountOffset);
        }, 200);
      });
    },
    getcomment() {
      const url = `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(res => {
        this.datacomment = res.data;
      });
    },
    //分页相关
    //页容量改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1

      this.getcomment()
    },
    //当前页码改变
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex

      this.getcomment();
    },
    //提交评论
    postComment() {
      const textContent = this.$refs.txtContentRef;
      //拿到文本框的值
      // console.log(textContent.value);
      if (textContent.value.trim().length === 0) {
        //提示不能为空
        this.$message({
          message: "评论不能为空",
          type: "warning"
        });
        return;
      }

      const url = `site/validate/comment/post/goods/${this.$route.params.id}`;

      this.$axios.post(url, { commenttxt: textContent.value }).then(res => {
        if (res.data.status === 0) {
          textContent.value = "";

          //提示成功
          this.$message({
            message: "评论成功",
            type: "success"
          });

          //重新加载第一页
          this.pageIndex = 1;
          this.getcomment();
        }
      });
    },
    //加入购物车
    addToShopCart() {
      this.isShow = true

      //调用store.commit去触发mutations方法
      const goods = {
          goodsId:this.$route.params.id,
          count:this.goodsCount
      }

      this.$store.commit('addGoods',goods)
    },

    //购物车飞入动画
    beforeEnter: function(el) {
      el.style.left = `${this.addToShopCartOffset.left}px`
      el.style.top = `${this.addToShopCartOffset.top}px`
      el.style.transform = `scale(1)`;
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function(el, done) {
      el.style.transition = "all 1s"

      //刷新动画帧
      el.offsetWidth
      el.style.left = `${this.shoppingCartCountOffset.left}px`
      el.style.top = `${this.shoppingCartCountOffset.top}px`
      el.style.transform = `scale(0.6)`;
      done();
    },
    afterEnter: function(el) {
      this.isShow = false
    }
  }
}
</script>

