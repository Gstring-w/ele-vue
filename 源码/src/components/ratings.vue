<template>
  <div class="ratings" ref="ratings1">
    <div >


   <div class="score">
     <div class="score-left">
       <div class="score-num">{{seller.score}}</div>
       <div class="score-des">综合评分</div>
       <div class="score-compare">高于周边商家{{seller.rankRate}}%</div>
     </div>
     <div class="score-right">
       <div class="service-score">
         <span class="des">服务态度</span>
         <star :data='seller.serviceScore'></star>
         <span class="num">{{seller.serviceScore}}</span>
       </div>
       <div class="service-score">
         <span class="des">服务态度</span>
         <star :data='seller.serviceScore'></star>
         <span class="num">{{seller.serviceScore}}</span>
       </div>
       <div class="delivery-time">送达时间
         <div class="time">{{seller.deliveryTime}}分钟</div>
         </div>
     </div>
   </div>
   <div class="comment">
     <div class="btn">
       <div class="all-btn"  @click="_filter('all')">
         <span class="all-des" :class="{active:all}">全部</span>
         <span class="btn-num" :class="{active:all}">{{ratings.length}}</span>
       </div>
       <div class="good-btn" @click="_filter('good')">
         <span class="all-des"  :class="{active:good}">满意</span>
         <span class="btn-num" :class="{active:good}">{{goodArr.length}}</span>
       </div>
       <div class="bad-btn" @click="_filter('bad')" >
         <span class="all-des" :class="{active:bad}">不满意</span>
         <span class="btn-num" :class="{active:bad}">{{badArr.length}}</span>
       </div>
     </div>

   </div>
   <div class="people">
     <div class="discuss" v-for="(item,index) in discussArr" :key="index">
       <div class="head">
         <img :src="item.avatar" alt="">
       </div>
       <div class="content">
         <div class="title">
           <div class="title-l">{{item.username}}</div>
           <div class="title-r">{{item.rateTime}}</div>
         </div>
         <div class="star1">
           <star :data='item.score ? item.score : "3"'></star>
           <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
         </div>
         <div class="text">
           {{item.text}}
         </div>
         <div class="recommend">
           <span class="icon" :class=" item.rateType == 0 ? 'icon-thumb_up' : 'icon-thumb_down'  "></span>
           <span class="rec" v-for="(item1,index ) in item.recommend" :key="index">{{item1}}</span>
         </div>
       </div>
     </div>
   </div>
  
       </div>
        <div class="shopcar">
     <shopcar :foods='$store.state.shopcar'></shopcar>
   </div>
  </div>
</template>

<script>
import axios from "axios";
import star from './star'
import shopcar from './shopcar'
import Vue from 'vue'
import BScroll from 'better-scroll'

export default {
  name: 'ratings',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      seller:[],
      ratings:[],
      starArr:[2,2,2,1,0],
      all:true,
      good:false,
      bad:false,
      discussArr:[],
      goodArr:[],
      badArr:[],
      foods:[]
    }
  },
  computed:{
    star(){
      let num = Math.round(this.seller.serviceScore);
      return 'star'+num
    },
    
  },
  methods:{
    Sscroll(){
       new BScroll(this.$refs.ratings1,{
          click: true
        });
    },
    starCalution(data){
      let arr = new Array(5);
      let integer = Math.floor(data);
      let num = Math.round(data);
      var index = num -1;
  
      if(num - integer > 0.5){
        
        arr[index] = 1;
        for(var i = 0;i< index; i++){
          arr[i] = 2;
        }
        for(var i = index + 1;i< 5; i++){
          arr[i] = 0;
        }
      }else{
       
        for(var i = 0;i < index; i++){
          arr[i] = 2;
          
        }
        for(var i = index ;i < 5; i++){
          arr[i] = 0;
      
        }
      }
      this.starArr = arr;

   
    },
    btnFun(){
      this.discussArr.forEach((item,index) =>{
          if(item.rateType == 0){
            this.goodArr.push(item)
          }else {
            this.badArr.push(item)
          }
        })
    },
    _filter(tar){
      if(tar === 'all'){
        this.all = true;
        this.good = false;
        this.bad = false;
        this.discussArr = this.ratings;
      }else if(tar == 'good'){
        this.all = false;
        this.good = true;
        this.bad = false;
        this.discussArr = this.goodArr

      }else{
        this.all = false;
        this.good = false;
        this.bad = true;
        this.discussArr = this.badArr
      }
    }
  },
  components:{
    star,
    shopcar
  },
  watch:{
    $store(){
        this.foods = $store.state.foods;
    }
  },
  created(){
   
    axios.get("/good/seller").then(res => {
      if(res.data.code === 0){
        this.seller = res.data.data;
    
        //  this.starCalution(this.seller.serviceScore);
      }
    })
    axios.get("/good/ratings").then(res => {
      if(res.data.code === 0){
        this.ratings = res.data.data;
        this.discussArr = this.ratings;
        this.btnFun();
       
      }
    })
    Vue.nextTick(()=>{
             this.Sscroll();
        })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
  @import '../assets/stylus/index.styl'
  @import '../../static/style.css'
      .ratings
        width 100%
        position: absolute;
        left: 0;
        top: 176px;
        bottom: 48px;
        right: 0px;
        overflow: hidden
        background-color rgba(7,17,27,.1)
        .score
          background-color #fff;
          padding 0 18px
          display flex
          height 106px
          border-bottom 0.5px solid rgba(7,17,27,.3)
          .score-left
            flex 3
            .score-num
              font-size 24px
              color rgb(255,153,0)
              height 28px
              line-height 28px
              text-align center
              padding 18px 0 6px
            .score-des 
              font-size 12px
              color rgb(7,17,27)
              line-height 12px
              text-align center
              padding-bottom 8px
              font-weight 400
            .score-compare
              text-align center
              font-size 10px
              line-height 10px
              color rgba(7,17,27,.3)
              padding-bottom 18px
          .score-right
            border-left 0.5px solid rgba(7,17,27,.3)
            flex 5
            display flex
            flex-direction column
            margin 18px 0
            .service-score
              padding 0 24px
              .des
                padding 4px 0
                display inline-block
                font-size 12px
                color rgb(7,17,27)
                line-height 18px
                height 18px
                padding-right 12px
              .num
                font-size 12px
                color rgb(255,153,0)
                line-height 18px
                height 18px
                padding-left 12px
              
                
            .delivery-time
              padding-top 4px
              display inline-block
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
              height 18px
              padding 0 24px
              .time
                display inline-block
                font-size 12px
                color rgb(147,153,159)
                line-height 18px
                padding-left 12px
        .comment
          margin-top 18px
          background-color #fff
          padding 18px
          border-bottom 1px solid rgba(7,17,27,.1)
          border-top 1px solid rgba(7,17,27,.2)
          .btn
            display flex
            .all-btn,.good-btn,.bad-btn
              text-align center
              display inline-block
              width 70px
              height 35px
              border-radius 2px
              background-color rgb(0,160,220)
              margin-right 12px
              .all-des
                line-height 35px
                color rgba(7,17,27,.6)
                font-size 12px
                &.active
                  color #fff
              .btn-num
                display inline-block
                font-size 8px
                color rgba(7,17,27,.6)
                &.active
                  color #fff
            .good-btn
              background-color rgba(0,160,220,.4)
            .bad-btn
              background-color rgba(0,160,220,.2)
        .people
          background-color #fff
          .discuss
            padding 18px
            display flex
            border-bottom  1px solid rgba(7,17,27,.1)
            .head
              width 28px
              height 28px
              margin-right 12px
              img 
                border-radius 100%
                width 28px
                height 28px
            .content
              display flex
              flex-direction column
              .title
                width 100%
                .title-l
                  float left
                  font-size 10px 
                  color rgb(7,17,27)
                  line-height 12px
                .title-r
                  float right
                  font-size 10px 
                  font-weight 200
                  color rgb(147,153,159)
                  line-height 12px                
              .star1
                margin-top 4px
                .deliveryTime
                  font-size 10px
                  font-weight 200
                  color rgb(147,153,159)
                  line-height 12px
                  margin-left 6px
                
              .text
                font-size 12px 
                color rgb(7,17,27)
                line-height 18px
                margin-top 6px
              .recommend
                margin-top 8px
                display flex
                align-items center
                align-content space-around
                flex-wrap wrap
                .icon
                  margin-top 1px
                  display inline-block
                  width 12px
                  height 12px
                  font-size 12px 
                  color rgb(0,160,200)
                  line-height 14px
                  &.icon-thumb_down
                    color rgba(7,17,27,.2)
                .rec
                  margin-top 1px
                  line-height 16px
                  // vertical-align top
                  padding-left 6px
                  padding-right 6px
                  margin-left 8px
                  font-size 9px
                  color rgb(147,153,158)
                  display inline-block
                  height 16px
                  width 75px
                  text-align center
                  white-space nowrap
                  text-overflow ellipsis
                  overflow hidden
                  border 1px solid rgba(7,17,27,.1)
                  border-radius 2px
                  background-color #fff
          .shopcar
            position fixed
            bottom 0px
            z-index 990
</style>
