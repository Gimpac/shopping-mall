import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 按需导入
import {addLocalGoods,getTotalCount,updateLocalGoods,delectLocalGoods} from '../common/localStorage.js'
//创建空白仓库,并且导出
const store = new Vuex.Store({
    state:{
        buyCount:0
    },
    getters:{
        getBuycount:state=>{
            // return state.buyCount
            return state.buyCount > 0 ? state.buyCount : getTotalCount()
        }
    },
    mutations:{
        //载荷goods === {goodsId:100,count:3}
        addGoods(state,goods){
            // state.buyCount += goods.count
            state.buyCount = addLocalGoods(goods)
        },
        updateGoods(state,goods){
            state.buyCount = updateLocalGoods(goods)
        },
        delectgoodsId(state,goodsId){
            state.buyCount = delectLocalGoods(goodsId)
        }
    }
})

export default store