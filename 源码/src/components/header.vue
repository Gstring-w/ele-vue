<template>
  <div class="header">
    <div class="content">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="des">
        <div class="des-title">
          <span class="icon bg-image"></span>
          <span class="title">{{seller.name}}</span>
        </div>
        <div class="des-des">
          
          <span>{{seller.description}}/{{seller.deliveryTime}}分送达</span>
        </div>
        <div class="des-discount" v-if='seller.supports'>
          <span class="icon bg-image" :class="classMap[seller.supports[0].type]"></span>
          <span class="discount-content">{{seller.supports[0].description}}</span>
        </div>
        <div class="num" v-if='seller.supports' @click="changeShow1">
          <span>{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right more"></span>
        </div>
      </div>
    </div>
    <div class="content-bottom" @click="changeShow1">
      <span class="board bg-image"></span>
      <span class="board-des">
        <span class="move-des">
            {{seller.bulletin}}
        </span>
     
        </span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
   
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },

  methods: {

      changeShow1() {
        this.$store.commit("changeShow", true);
        
      }

  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // console.log(this.seller)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl';
@import '../../static/style.css';

.header {
  position: relative;
  perspective: 500px;
  background: rgba(7, 17, 27, 0.5);
  blur: 10px;

  .content {
    padding: 24px 24px 18px 24px;
    display: flex;

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .des {
      margin-left: 16px;

      .des-title {
        font-size: 16px;
        height: 18px;
        font-weight: blod;
        line-height: 18px;

        .icon {
          display: inline-block;
          width: 36px;
          height: 18px;
          bg-image('brand');
          background-size: 36px 18px;
          vertical-align: top;
        }

        .title {
          display: inline-block;
          font-size: 16px;
          font-weight: blod;
          line-height: 18px;
          margin-left: 6px;
          color: rgb(255, 255, 255);
        }
      }

      .des-des {
        margin-top: 6px;
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 100;
      }

      .des-discount {
        margin-top: 10px;
        // display flex
        // align-items center
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

        .discount-content {
          vertical-align: middle;
          font-size: 10px;
          color: rgb(255, 255, 255);
          font-weight: 100;
          line-height: 12px;
        }
      }

      .num {
        display: inline-block;
        position: absolute;
        right: 12px;
        bottom: 42px;
        font-size: 10px;
        color: rgb(255, 255, 255);
        font-weight: 100;
        padding: 7px 8px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 12px;

        .more {
          width: 2px;
          vertical-align: middle;
        }
      }
    }
  }

  .content-bottom {
    padding: 0 12px 0 16px;
    line-height: 28px;
    background-color: rgba(7, 17, 21, 0.2);
    color: rgb(255, 255, 255);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 10px;

    .board {
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      vertical-align: middle;
    }

    .board-des {
      display inline-block
      
      
      vertical-align: middle;
      margin-right: 4px;
      width 90%
      overflow hidden
      
    }
    .move-des{
      position relative;
      animation move 30s linear infinite
    }
@keyframes move {
  0%{
    left 0
  }
  100%{
     left -100%
  }
}
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      bottom: 8px;
    }
  }

  .background {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
    width: 100%;
    height: 134px;
    filter: blur(10px);

    img {
      background-size: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
