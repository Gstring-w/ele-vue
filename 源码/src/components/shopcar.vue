<template>
  <div class="shopcar">
    <div class="wrapper" v-show="details"  @click="close" v-if='$store.state.shopNum > 0'></div>
    <div class="details" v-show="details" v-if='$store.state.shopNum > 0' >
      
      <div class="title">
        <div class="title-shop">购物车</div>
        <div class="title-close" @click="closeShop">清空</div>
      </div>
      <div class="content" >
        <div class="item" v-for="(ele,index) in foodsArr" :key="index" v-if='ele.count !== 0'>
          <div class="item-title">{{ele.name}}</div>
          <div class="item-contr">
            <carconstrol :foods='foods[index]'></carconstrol>
          </div>
          
        </div>
        <div class="item-w"></div>
      </div>
    </div>
   <div class="car-wrapper" @click="showDetails">
       <div class="icon icon-shopping_cart" :class="{haveFood : foodPrice != 0}"></div>
       <span class="number" v-if='totalList != 0'>{{totalList}}</span>
   </div>
   <div class="car-content" @click="showDetails">
     <div class="totalPrice border-1px-right" :class="{noTotal: totalList != 0}">￥{{calculatePrice}}</div>
     <div class="distribution-fee">另需配送费￥4</div>
   </div>
   <div class="car-btn" :class="{ok: calculatePrice >= 20}">{{isok}}</div>
  </div>
</template>

<script>
import carconstrol from './carcontrol'
export default {
  name: 'shopcar',
  props:{
    foods:{
      type:Array
    }
  },
  components:{
    carconstrol
  },
 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      num:0,
      food:[], // 筛选数量为1的数组
      details:false,
      foodsArr:[]
    }
  },
  
  methods:{
    closeShop(){
      this.details = false;
      this.$store.commit("changeShow1", false);
      this.foodsArr.forEach((ele,index)=>{
        if(ele.count !== 0){
          ele.count = 0;
        }
      })
      this.$store.commit("toZeroshopNum", 0);
  
    },
    close(){
      this.details = false;
      this.$store.commit("changeShow1", false);
    },
    showDetails(){
      console.log(this.$store.state.shopNum)
      if(this.$store.state.shopNum <= 0){
        return
      }
      if(!this.details){
        this.details = true;
        this.$store.commit("changeShow1", true);
        this.foodsArr = [];
        this.$store.state.shopcar.forEach((ele,index) =>{
        this.foodsArr.push(ele)
        
      })
      }else {
        this.details = false;
        this.$store.commit("changeShow1", false);
      }
    },
    filterFoods(){
      for(let i = 0, len = this.foods.length; i < len;i ++ ){
        if(this.foods[i].count !== 0){
          this.food.push(this.foods[i]);
        }
      }
    }
  },
  created(){
    this.filterFoods();

  },
  computed:{
     
      foodPrice(){
        let res = 0;
        for(let i = 0,len = this.foods.length;i < len;i++){
          if(this.foods[i].count !== 0){
            res += this.foods[i].price * this.foods[i].count;
          }
           
        }
        return res
      },
      totalList(){
        let res = 0;
       for(let i = 0;i<this.foods.length;i++){
            res += this.foods[i].count;
        }
          return res
      },
      calculatePrice(){
        if(this.totalList === 0){
          this.num = 0;
          return `${0}`
        }else{
          this.num = this.foodPrice
          return `${this.foodPrice}`
        }
      },
      isok(){
        if(this.calculatePrice === 0){
          return `￥20起送`
        }else if(this.calculatePrice < 20 && this.calculatePrice > 0){

          let res = '20' - this.num;
          
          return `￥${res}`;
         
        }else if(this.calculatePrice >= 20 ){
          return '去结算'
        }
        return `￥20起送`
      }
  }
}
</script>


<style lang='stylus' ref='stylesheet/stylus'>
    @import '../assets/stylus/index.styl'
    .shopcar
        z-index 999
        position fixed
        display flex 
        bottom 0px
        left 0
        width 100%
        height 48px
        background-color #141d27
        
        .car-wrapper
          flex 0 0 80px
          position relative
          .icon
            position relative
            width 44px
            height 44px
            border-radius 44px
            border 6px solid #141d27
            background-color #2b332b
            margin-left 18px
            margin-top -10px
            font-size 24px
            line-height 44px
            color rgba(255,255,255,.4)
            text-align center
            &.haveFood
              color rgb(255,255,255)
              background-color rgb(0,160,250)
          .number
            position absolute
            left 44px
            top -12px
            width 24px
            height 16px
            border-radius 16px
            line-height 16px
            background-color rgb(240,20,20)
            box-shadow 0 2px 4px 0 rgb(0,0,0,.4)
            font-size 9px
            font-weight 700
            text-align center
            color rgb(255,255,255)
        .car-content
          margin-left 18px
          display flex
          align-items center 
          .totalPrice
            padding 4px 12px 4px 0 
            display inline-block
            font-size 16px
            line-height 20px
            color rgba(255,255,255,.4)
            font-weight 700
            border-1px-right(rgba(255,255,255,.1))
            &.noTotal
              color rgb(255,255,255)
          .distribution-fee
            padding 4px 0 4px 12px 
            display inline-block
            font-size 16px
            line-height 20px
            color rgba(255,255,255,.4)
        .car-btn
          position absolute
          right 0px
          bottom 0px
          width 105px
          height 100%
          text-align center
          font-size 16px
          font-weight 700
          line-height 48px
          color rgba(255,255,255,.4)
          background-color rgba(255,255,255,.4)
          &.ok
            background-color rgb(0,160,250)
            color rgb(255,255,255)
        .wrapper
          width 100vw
          height 100vh
          background-color rgba(7,17,27,0.6)
          position absolute
          bottom 48px
        .details
          width 100vw
          // z-index 999
          position absolute
          background-color #fff
          bottom 48px
          
          .title
            background-color #f3f5f7
            height 40px
            position relative
            padding 0 18px
            border-bottom 1px solid rgba(7,17,27,.1)
            .title-shop
              font-size 14px
              font-weight 200
              color rgb(7,17,27)
              line-height 40px
              display inline-block
            .title-close 
              font-size 12px
              color rgb(0,160,220)
              line-height 40px
              display inline-block
              position absolute
              right 18px
          .content
            
            padding 0 18px
            .item
              position relative
              height 48px
              border-bottom 1px solid rgba(7,17,27,.1)
              .item-title
                font-size 14px
                color rgb(7,17,27)
                line-height 48px
              .item-contr
                position absolute
                top 10px
                right 18px
            .item-w
              height 24px
</style>
