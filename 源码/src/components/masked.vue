<template>
    <div class="masked" v-if='show' @click="changShow">
        <div class="master">
<div class="title">{{ $store.state.seller.name}}</div>
        <div class="starN">
            <star :data='$store.state.seller.foodScore'></star>
        </div>
        <div class="content">
            <span class="left-x"></span>
            <div class="content-title">优惠信息</div>
            <span class="right-x"></span>
            <div class="content-des">
                <div class="des-item" v-for="(item ,index) in $store.state.seller.supports" :key='index'>
                    <div class="icon bg-image" :class='classMap[item.type]'></div>
                    <div class="icon-des">{{item.description}}</div>
                </div>
            </div>
        </div>
        <div class="sellerInfo">
            <span class="left-x"></span>
            <div class="info-title">商家公告</div>
            <span class="right-x"></span>
            <div class="info-title1">{{$store.state.seller.bulletin}}</div>
        </div>
        </div>
        
    </div>
</template>
<script>
import star from './star'
export default {
  props: {
    show: Boolean,
    
  },

  methods: {
    changShow() {
      this.$store.commit("changeShow", false);

    }
  },
  
  name: "sellers",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      classMap : ["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  components:{
      star
  },
  
};
</script>

<style lang="stylus">
    @import '../assets/stylus/index.styl';
    @import '../../static/style.css';

        .masked 
            width: 200vw;
            height: 200vh;
            position: absolute;
            left: -50px;
            top: -50px;
            background-color: rgba(7, 17, 27, 0.6);
            z-index: 99;
            overflow: hidden;
            .master
                z-index 999
                overflow hidden
                position absolute
                width 100vw
                height 100vh
                left 50px
                top 50px
                color #fff
                display flex
                flex-direction column
                .title
                    text-align center
                    margin-top 64px
                    font-size 16px
                    font-weight 700
                    color rgb(255,255,255)
                    line-height 16px
                .starN
                    text-align center
                    margin-top 16px
                    height 24px
                    .masStar
                        width 24px
                        height 24px
                        margin 0 7px
                .content
                    margin 28px 36px
                    text-align center
                    .left-x,.right-x
                        position relative
                        top -4px
                        display inline-block
                        width 102px
                        height 1px
                        background-color rgba(255,255,255,.2)
                    .content-title
                        display inline-block
                        text-align center
                        font-size 16px
                        font-weight 700
                        color rgb(255,255,255)
                        line-height 16px
                        margin 0 12px
                    .content-des
                        margin-top 24px
                        text-align left
                        .des-item
                            display flex
                            align-items center
                            margin-bottom 12px
                            .icon-des
                                font-size 12px
                                font-weight 200
                                color rgb(255,255,255)
                                line-height 12px
                                padding-left 2px
                                display inline-block
                            .icon {
                                display: inline-block;
                                width: 12px;
                                height: 12px;
                                background-size: 12px 12px;
                                &.decrease {
                                    bg-image('decrease_1');
                                }

                                &.discount {
                                    bg-image('discount_1');
                                }

                                &.special {
                                    bg-image('special_1');
                                }

                                &.invoice {
                                    bg-image('invoice_1');
                                }

                                &.guarantee {
                                    bg-image('guarantee_1');
                                }
                            }
                .sellerInfo
                    margin 28px 36px
                    text-align center
                    .left-x,.right-x
                        position relative
                        top -4px
                        display inline-block
                        width 102px
                        height 1px
                        background-color rgba(255,255,255,.2) 
                    .info-title
                        display inline-block
                        text-align center
                        font-size 16px
                        font-weight 700
                        color rgb(255,255,255)
                        line-height 16px
                        margin 0 12px
                    .info-title1
                        text-align left 
                        margin-top 24px 
                        font-size 12px
                        font-weight 200
                        color rgba(255,255,255,.7)
                        line-height 24px   
</style>
