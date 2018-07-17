<template>
    <div class="star">
        <div class="star-box">
            <span v-for="(item,index) in starArr" :key="index" :class="starnum(item)" class="masStar"></span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
      data:Number,
      default:3
  },
  data(){
      return {
          starArr:[]
      }
  },
  methods: {
    starnum(item) {
      return "star" + item;
    },
    starCalution(data) {
      let arr = new Array(5);
      let integer = Math.floor(data);
      let num = Math.round(data);
      var index = num - 1;
   
      if (num - integer > 0.5) {
        arr[index] = 1;
        for (var i = 0; i < index; i++) {
          arr[i] = 2;
        }
        for (var i = index + 1; i < 5; i++) {
          arr[i] = 0;
        }
      } else {
        for (var i = 0; i < index; i++) {
          arr[i] = 2;
        }
        for (var i = index; i < 5; i++) {
          arr[i] = 0;
        }
      }
      this.starArr = arr;
    }
  },
  watch:{
      data(){
          this.starCalution(this.data);
      }
  },
  created(){
      this.starCalution(this.data);
  }
 
};
</script>

<style lang="stylus">
@import '../assets/stylus/index.styl';
@import '../../static/style.css';

.star {
    display: inline-block;

    .star-box {
        .star2 {
            display: inline-block;
            width: 12px;
            height: 12px;
            bg-image(star36_on);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
        }

        .star1 {
            display: inline-block;
            width: 12px;
            height: 12px;
            bg-image(star36_half);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
        }

        .star0 {
            display: inline-block;
            width: 12px;
            height: 12px;
            bg-image(star36_off);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}
</style>
