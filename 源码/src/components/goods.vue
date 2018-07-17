<template>
  <div class="goods">
   <div class="lists" ref="menuScroll">
     <div class="menu">
 <div class="lists-item border-1px" v-for="(item,index) in goods" :key="index" :class="{current:currentIndex === index}" @click="selectIndex(index,$event)">
       <div class="item-wrap">
          <span v-if='item.type >= 0' :class="classMap[item.type]" class="icon bg-image">
          </span>
          <span class="lists-des">{{item.name}}
          </span>
       </div>
       
     </div>
     </div>
    
   </div>
   <div class="foods" ref="foodScroll">
     <div class="foods-wrap">
<div class="foods-item" v-for='(item,index) in goods' :key='index'>
       <span class="foods-item-title">{{item.name}}</span>
       <div class="foods-item-des" v-for='(item1,index1) in item.foods' :key='index1'>
         <img :src="item1.image" :alt="item1.name">
         <div class="des-wrapp">
          <div class="des-title">{{item1.name}}</div>
          <div class="des-content">{{item1.description}}</div>
          <div class="des-evaluate">
           <span>月售{{item1.sellCount}}份</span>
           <span style="margin-left:12px">好评率{{item1.rating}}%</span>
         </div>
         <div class="price">
           <span class="newPrice">￥{{item1.price}}</span>
           <span class="oldPrice" v-if="item1.oldPrice">￥{{item1.oldPrice}}</span>
         </div>
         <div class="car-constrol-wrap" ref="addBtn">
           <carconstrol :foods="foods[foodIndex(index1,item1.name)]" ></carconstrol>
         </div>
         </div>
         
       </div>
     </div>
     </div>
     
   </div>
   <!-- <shopcar :foods="$store.state.shopcar"></shopcar>   -->
  </div>
  
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import BScroll from 'better-scroll';
import carconstrol from './carcontrol'
import shopcar from "./shopcar";

export default {
  name: "goods",
  data() {
    return {
      goods: [],
      foods:[
       
      ],
      classMap: [
        "decrease", 
        "discount", 
        "special", 
        "invoice",
        "guarantee"
        ],
      heightList:[],
      scrollY:0
    };
  },
  computed:{
    currentIndex(){
      for(let i =0; i< this.heightList.length;i++){
        let height1 = this.heightList[i];
        let height2 = this.heightList[i+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i;
        }
      }
      return 0
    }
  },
 components: {
    carconstrol : carconstrol,
    shopcar:shopcar
  },
  created() {
    axios.get("/good/goods").then(res => {
      if (res.data.code === 0) {
         this.goods =  res.data.data;
          // 遍历一遍数组
        this.caculateList(this.goods);
        this.getAddBtnH();
        Vue.nextTick(()=>{
          this._initscorll()
          this._caculateHeight()
        })
      }
    });
   
  },
  watch:{
    foods(){
       this.$store.commit('changeVal',this.foods)
    }
  },
  methods:{
    
    foodIndex(index1,itme){
       var da = this.$store.state.shopcar;
            for(var i = 0,len = da.length; i < len; i++ ){
                if(da[i].name == itme){
                    return i
                }
            }
    },
    selectIndex($index,$event) {
        if(!$event._constructed){
          return
        }
        let foodList = this.$refs.foodScroll.getElementsByClassName('foods-item');
        this.foodScroll.scrollToElement(foodList[$index],300);
    },
    _initscorll(){
        this.menuScroll = new BScroll(this.$refs.menuScroll,{
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodScroll,{
          probeType : 3,
          click:true
        });
        this.foodScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y))
        })
    },
    _caculateHeight(){
      let foodList = this.$refs.foodScroll.getElementsByClassName('foods-item');
      let height = 0;
      this.heightList.push(height)
      for(let i =0; i<foodList.length;i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.heightList.push(height);
      }
    },
    caculateList(goods){
      for(let i = 0;i < goods.length; i++){
        for(let j = 0; j< goods[i].foods.length; j++){
          let obj = {
            price:goods[i].foods[j].price,
            name:goods[i].foods[j].name,
            count:0
          }
          this.foods.push(obj)
        }
      }
    },
  getAddBtnH(){
      let addElements = this.$refs.foodScroll.getElementsByClassName('car-constrol-wrap');
      
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';
@import '../../static/style.css';

.goods {
  display: flex;
  position: absolute;
  left: 0;
  top: 175px;
  bottom: 48px;
  right: 0;
  width: 100%;
  overflow: hidden;

  .lists {
    width: 80px;
    height: 100%;
    background-color: #f3f5f7;

    .lists-item {
      width: 100%;
      height: 54px;
      font-size: 12px;
      font-weight: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      
      &:after {
        position: absolute;
        top: 54px;
        right: 12px;
        display: inline-block;
        content: '';
        width: 56px;
        height: 0.5px;
        background-color: rgba(7, 17, 27, 0.1);
      }
    
      .item-wrap {
        display: inline-block;
        padding: 0 12px;

        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 16px 16px;
          vertical-align: top;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.special {
            bg-image('special_1');
          }

          &.invoice_1 {
            bg-image('invoice_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }
        }

        .lists-des {
          display: inline;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
    .current{
      border-top 0.5px solid rgba(7, 17, 27,.1) !important
      background-color #fff !important
      font-weight bold !important
    }
  .foods {
    flex: 1;
    .foods-item-title {
      display: block;
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
      padding-left: 14px;
      height: 26px;
      font-size: 12px;
      line-height: 26px;
      color: rgb(147, 153, 149);
    }

    .foods-item-des {
      position relative
      margin: 18px;
      background-color: #fff;
      display: flex;
      border-bottom 0.5px solid rgba(7,17,27,.1)
      padding-bottom 18px
      img {
        width: 57px;
        height: 57px;
        border-radius 4px
      }
      .des-wrapp {

        margin-top 2px
        margin-left 10px
        .des-title{
          font-size 16px
          color rgb(7,17,27)
          line-height 16px
        }
        .des-content,.des-evaluate{
          font-size 10px
          color rgb(147,153,159)
          line-height 20px
          margin 8px 0px
        }
        .price{
          .newPrice{
            font-size 14px
            color rgb(240,20,20)
            font-weight 700
            line-height 14px
          }
          .oldPrice{
            font-size 10px
            color rgb(147,153,159)
            font-size 700
            text-decoration line-through
            vertical-align top
            line-height 14px
            margin-left 8px
          }
        }
        .car-constrol-wrap{
          position absolute
          right 10px
          bottom 8px
        }
      }
    }
  }
}
</style>
