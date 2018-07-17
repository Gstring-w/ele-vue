import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)


let store = new vuex.Store({
  state: {
    foods: [1, 2, 3],
    show: false,
    show1: false,
    seller: [],
    shopcar: [],
    shopNum:0 // 控制购物车出现的列表
  },
  mutations: {
    changeVal(state, newVal) {
      state.foods = newVal;
      
    },
    removeShopNum(state,newVal){
      if(state.shopNum > 1){
        state.shopNum--;
      }else if(state.shopNum = 1){
        state.shopNum --;
        // state.show1 = false;
      }
      
    },
    toZeroshopNum(state,newVal){
      state.shopNum = newVal;
    },
    addShopNum(state,newVal){
      state.shopNum ++;
    },
    changeShow(state, newShow) {

      state.show = newShow;

    },
    changeShow1(state, newShow) {

      state.show1 = newShow;

    },
    changeSeller(state, newVal) {
      state.seller = newVal;
    },
    addShopCar(state, newVal) {
      if (state.shopcar.length !== 0){

      }else {
        state.shopcar = state.foods;
      }
    },
    add(state,index){
      
      state.shopcar[index].count ++
    },
    remove(state,index){
   
      state.shopcar[index].count -- 
    }
  }



})
export default store