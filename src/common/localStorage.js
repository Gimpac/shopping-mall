//goods等于goodsinfo传递过来的参数
const KEY = 'goods'

const getLocalGoods = () =>{
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

// 统计本地最新的商品的总数
const getTotalCount = () => {
    // {87:3,88:2}
    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }

    return totalCount
}


const addLocalGoods = goods => {
    const localGoods = getLocalGoods()

    //传递过来的goodsId已经在本地有了
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId] += goods.count
    }else{
        localGoods[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 存储完毕之后，统计最新的数量，返回给Vuex
    return getTotalCount()
}

    //更新本地
    const updateLocalGoods = goods =>{

        const localGoods = getLocalGoods()

        localGoods[goods.goodsId] = goods.count

        localStorage.setItem(KEY,JSON.stringify(localGoods))

        return getTotalCount()

    }

    //更新删除数据
    const delectLocalGoods = goodsId =>{

        const localGoods = getLocalGoods()

        delete localGoods[goodsId]

        localStorage.setItem(KEY,JSON.stringify(localGoods))

        return getTotalCount()

    }
export {addLocalGoods,getTotalCount,getLocalGoods,updateLocalGoods,delectLocalGoods}