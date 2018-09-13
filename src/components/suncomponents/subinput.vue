<template>
    <div>
        <div @click="substring" class="left">-</div>
        <div class="middle">{{count}}</div>
<div @click="add" class="right">+</div>
    </div>
</template>


<style scoped>
.left,
.middle,
.right {
  display: inline-block;
  border: 1px solid rgba(92, 92, 92, 0.3);
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
</style>


<script>
export default {
  props: {
    initCount: Number,
    goodsId: Number
  },
  created() {
    this.count = this.initCount
  },
  data() {
    return {
      count: 1
    }
  },
  methods: {
    substring() {
      if (this.count <= 1) return
      this.count--
      this.notify()
    },
    add() {
      this.count++
      this.notify()
    },
    //将子组件更新之后的值传递给父子件
    notify() {
      const updateGoods = {
        goodsId: this.goodsId,
        count: this.count
      }

      // console.log(updateGoods);

      this.$emit('goodsCountChange', updateGoods)
    }
  }
}
</script>



