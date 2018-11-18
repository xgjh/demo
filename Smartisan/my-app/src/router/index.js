import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import goodsList from '@/components/goodsList'
import item from '@/components/item'
import cartList from '@/components/cartList'
import checkout from '@/components/checkout'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      components:{ 
        header,
        default:goodsList
      }
    },
    {
      path: '/detail/:goodIndex',
      components:{ 
        header,
        default:item
      }
    },
    {
      path: '/count',
      components:{ 
        header,
        default:cartList
      }
    },
    {
      path: '/checkout',
      components:{ 
        header,
        default:checkout
      }
    }
  ]
})
