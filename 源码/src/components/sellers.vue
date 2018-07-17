<template>
  <div class="sellers" ref="sellers1">
    <div >
<div class="sellers-title-box">
     <div class="sellers-title">{{ $store.state.seller.name}}</div>
     <div class="sellers-details">
       <div class="star">
         <star :data='$store.state.seller.foodScore'></star>
       </div>
       <div class="rating-count">({{ $store.state.seller.ratingCount}})</div>
       <div class="sell-count">月售{{ $store.state.seller.sellCount}}单</div>
     </div>
     
   
   </div>
   <div class="delivery">
     <div class="min-price">
       <span class="text">起送价
           
       </span>
       <div class="price-box">
<span class="price">{{ $store.state.seller.minPrice}}</span>
 <span class="text">元</span>
       </div>
     
     </div>
     <div class="de-price">
       <span class="text">商家配送
         
       </span>
        <div class="price-box">
<span class="price">{{ $store.state.seller.deliveryPrice}}</span>
 <span class="text">元</span>
       </div>
     </div>
     <div class="min-time">
       <span class="text">平均配送时间
      
       </span>
      <div class="price-box">
<span class="price">{{ $store.state.seller.deliveryTime}}</span>
 <span class="text">元</span>
       </div>
     </div>
   </div>
   <div class="xian"></div>
   <div class="notice">
     <div class="notice-title">公告与活动</div>
     <div class="notice-content">{{ $store.state.seller.bulletin}}</div>
     <div class="notice-supports" v-for="(item,index) in $store.state.seller.supports" :key='index' >
       <span class="icon bg-image" :class='classMap[item.type]'></span>
       <span class="icon-des">{{item.description}}</span>
     </div>
   </div>
   <ul class="scene">
    
     <div class="scene-title">商家实景</div>
     <div class="scene-box" ref="scene1">
       <div>
     <li class="scene-item" v-for="(item,index) in  $store.state.seller.pics" :key='index'>
       <img :src="item" alt="">
     </li>
     </div>
       </div>
      
   </ul>
   <div class="info">
     <div class="info-title">商家信息</div>
     <div class="info-des" v-for="(item,index) in $store.state.seller.infos" :key="index">
       <div class="info-item">{{item}}</div>
     </div>
   </div>
    </div>
    <div class="shopcar">
     <!-- <shopcar :foods='$store.state.shopcar'></shopcar> -->
   </div>
  </div>
</template>

<script>
import star from './star'
import Vue from 'vue'
import BScroll from 'better-scroll'
import shopcar from './shopcar'
export default {
  name: 'sellers',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      classMap : ["decrease", "discount", "special", "invoice", "guarantee"]
    }
  },
  created(){
   
     Vue.nextTick(()=>{
             this.Sscroll();
        })
     
 
  },
  methods:{
    Sscroll(){
     new BScroll(this.$refs.sellers1,{
          click: true
        });
      // new BScroll(this.$refs.scene1,{
      //     click: true
      //   });
    }
  },
  components:{
    star,
    shopcar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
    @import '../assets/stylus/index.styl';
    @import '../../static/style.css'; 
      .sellers
        position: absolute;
        left: 0;
        top: 176px;
        bottom: 0px;
        right: 0px;
        overflow: hidden
        background-color rgba(7,17,27,.1)
        div
          .sellers-title-box
            padding  18px 18px 0px
            background-color #fff
            display flex
            flex-direction column
            .sellers-title
              font-size 14px
              color rgb(7,17,27)
              line-height 14px
            .sellers-details
              display flex
              margin-top 4px
              padding-bottom 18px
              border-bottom 1px solid rgba(7,17,27,.1) 
              .star 
                line-height 18px
              .rating-count,.sell-count
                font-size 10px
                color rgb(77,85,93)
                line-height 18px
              .rating-count
                margin-left 8px
              .sell-count 
                margin-left 12px
          .delivery
            background-color #fff
            padding-top 18px
            display flex
            justify-content space-around
            padding-bottom 18px
            
            .min-price,.de-price,.min-time
              width 30%
              display flex
              flex-direction column
              text-align center
              align-items center
              .text
                font-size 10px
                color rgb(147,153,159)
                line-height 20px
              .price-box
                font-size 0px
                color rgb(7,17,27)
                line-height 24px
                font-weight 200
                .price
                  font-size 24px
            .min-price,.de-price
              border-right 1px solid rgba(7,17,27,.1) 
          .xian
            width 100vw
            border-bottom 1px solid rgba(7,17,27,.1) 
          .notice
            margin-top 16px
            border-top 1px solid rgba(7,17,27,.2)
            background-color #fff
            padding 0 18px
            border-bottom 1px solid rgba(7,17,27,.2)
            .notice-title
              margin-top 18px
              font-size 14px 
              color rgb(7,17,27)
              line-height 14px
            .notice-content
              font-size 12px
              font-weight 200
              color rgb(240,20,20)
              line-height 24px
              padding 8px
            .notice-supports
              border-top 0.5px solid rgba(7,17,27,.1)
              height 48px
              display flex
              align-items center
              .icon 
                display: inline-block
                width: 16px
                height: 16px
                vertical-align middle
                background-size: 16px 16px
                &.decrease 
                  bg-image('decrease_1')
                &.discount 
                  bg-image('discount_1')
                &.special 
                  bg-image('special_1')
                &.invoice 
                  bg-image('invoice_1')
                &.guarantee 
                  bg-image('guarantee_1')
              .icon-des
                vertical-align middle
                font-size 12px
                font-weight 200
                color rgb(7,17,27)
                line-height 16px
                margin-left 6px    
          .scene
            margin-top 16px 
            border-top 1px solid rgba(7,17,27,.2)
            background-color #fff
            padding 0 0 18px 20px
            border-bottom 1px solid rgba(7,17,27,.2)
            .scene-title
              margin-top 18px
              font-size 14px 
              color rgb(7,17,27)
              line-height 14px
            .scene-box
              display block
              height 90px
          
              div
                width 1000px

                .scene-item
                  margin-top 12px
                  height 90px
                  display inline-block
                  margin-right 6px
                  img 
                    float left
                    height 100%
                    width 120px   
          .info
            margin-top 16px
            border-top 1px solid rgba(7,17,27,.2)
            background-color #fff
            padding 0 18px
            .info-title
              margin-top 18px
              margin-bottom 12px
              font-size 14px 
              color rgb(7,17,27)
              line-height 14px
            .info-des
              border-top 0.5px solid rgba(7,17,27,.1)
              padding 18px 12px
              .info-item
                font-size 12px
                font-weight 200
                color rgb(7,17,27)
                line-height 12px
          .shopcar
            position fixed
            bottom 0px
            z-index 990
</style>
