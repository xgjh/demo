import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store=new Vuex.Store({
    state:{
        num:0,
        cartList:[]
    },
    getters:{
       allinfo:function(state){
        var Len=state.cartList.length;
        var all=0;
        var allPrice=0;
        var selectNum=0;
        var selectPrice=0;
            for(var i=0;i<Len;i++){
                all+=state.cartList[i].num;
                allPrice+=state.cartList[i].num*state.cartList[i].price;
                if(state.cartList[i].isSelect){
                    selectNum+=state.cartList[i].num;
                    selectPrice+=state.cartList[i].num*state.cartList[i].price;
                }
               
            }
            return {
                all,
                allPrice,
                selectNum,
                selectPrice
            }
       },
       isAllSelect:function(state){
            var Len=state.cartList.length; 
            var isAllSelect=true;
            for(var i=0;i<Len;i++){
                if(state.cartList[i].isSelect==false){
                    isAllSelect=false;
                }
            }
            return isAllSelect;
       }
    },
    mutations:{
        plus:function(state,obj){
            var id=obj.stock_id;
            var Len=state.cartList.length;
            for(var i=0;i<Len;i++){
                if(id==state.cartList[i].stock_id){
                    state.cartList[i].num++; 
                    return false;
                }
            }
            Vue.set(obj,'num',1);
            Vue.set(obj,'isSelect',true);

            state.cartList.push(obj);
        },
        delList:function(state,index){
            state.cartList.splice(index,1);
        },
        add:function(state,index){
            if(state.cartList[index].num<state.cartList[index].limit_num){
                state.cartList[index].num++
            }
            
        },
        thin:function(state,index){
            if(state.cartList[index].num>1){
                state.cartList[index].num--
            }
        },
        changeSelect:function(state,i){
            state.cartList[i].isSelect=!state.cartList[i].isSelect;
        },
        changeAll:function(state,sta){
            var Len=state.cartList.length; 
            var selectSta=!sta;
            for(var i=0;i<Len;i++){
                state.cartList[i].isSelect=selectSta;
            }
           
        }
    }
})

export default store;