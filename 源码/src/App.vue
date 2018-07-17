<template>
<div id="app"  >
  <div :class="{blur:$store.state.show,blur1:$store.state.show1}" class="show">
  <v-header :seller='seller'></v-header>
  <div class="tap border-1px">
    <div class="tap-item">
      <router-link to='goods'>商品</router-link>
    </div>
   
    <div class="tap-item">
       <router-link to="ratings">评价</router-link>
       </div>
  
    <div class="tap-item"> 
       <router-link to="sellers">商家</router-link>
    </div>
    
  </div>
 
    <div class="content">
      <router-view></router-view>
    </div>


  
  
  
  </div> 
  <div class="mas">
     <masked :show='$store.state.show' :data='this.seller'></masked>
   </div>
  <div class="shopcar">
    <shopcar :foods="$store.state.shopcar"></shopcar>
  </div>
</div>
 
</template>

<script>
import header from "./components/header";
import goods from "./components/goods";
import masked from './components/masked';
import shopcar from './components/shopcar';
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      seller:{},
      dir:'left',
      show:this.$store.state.show
    };
  },
  components: {
    "v-header": header,
    goods: goods,
    masked:masked,
    shopcar
  },
  
  created(){
    
    axios.get('/good/seller').then(res =>{
      if(res.data.code === 0){
         this.seller = res.data.data;
         this.$store.commit('changeSeller',this.seller)
      }
    })
   
  }
  
};
</script>

<style lang='stylus' ref='stylesheet/stylus'>
  @import './assets/stylus/index.styl';
  
  #app
    .show 
      .tap 
        display flex
        height 40px
        border-1px(rgba(7,17,27,.1))
        .tap-item
          flex 1
          height 40px
          text-align center
          line-height 40px
          a
            width 100%
            height 100%
            font-size 14px
            color rgb(77,85,93)
          .active
            color rgb(240,20,20)
    .blur
      width 100%
      height 100%  
      filter blur(10px)
    .blur1
      width 100%
      height 100%
      filter blur(10px)
</style>
