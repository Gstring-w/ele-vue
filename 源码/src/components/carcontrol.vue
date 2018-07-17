<template>
    <div class="carconstrol">
        <transition name="move">
            <span class="decrease icon-remove_circle_outline" v-show="this.$store.state.shopcar[this.findIndex()].count !== 0" @click="remove"></span>
        </transition>
       
        <span class="count" v-show="this.$store.state.shopcar[this.findIndex()].count !== 0">{{this.$store.state.shopcar[this.findIndex()].count}}</span>
    
        <div class="add icon-add_circle" @click="add($event)" >
                <div class="parabola"  ref="parabola">
                    <transition name='add'>
                        <div class="addAnimate"></div>
                    </transition>
                 </div>
                 <div class="animate" ref="animate"></div>
        </div>
            

        <!-- 抛物线动画 -->
        
       
    </div>
</template>


<script>
    import Vue from 'vue';
export default {
    props:{
        foods:{
            type : Object
        }
    },
    data(){
        return {
            opt:[]
        }
    },
   
    created(){
        this.$store.commit('addShopCar',this.foods)
        // this.count = this.$store.state.foods[this.findIndex()].count;
        
    },
    methods:{
        findIndex(){
            var da = this.$store.state.shopcar;
           
            for(var i = 0,len = da.length; i < len; i++ ){
            
                if(this.foods.name && da[i].name == this.foods.name){
                    return i
                }
            }
            
        },
        remove(price,which,event){
            if(this.$store.state.shopNum == 1){
                this.$store.commit("changeShow1", false);
            }
            this.$store.commit('remove',this.findIndex())
            this.$store.commit("removeShopNum");
        },
        add(event){
     
            this.$store.commit('add',this.findIndex());
            this.$store.commit("addShopNum");
            console.log(this.$store.state.shopNum);
            this.dealAnimate(this.$refs.animate,event.clientY,event.clientX);
            
            
        },
        dealAnimate(dom,h,w){
            
            //显示出来
            dom.style.opacity = 1; 
            dom.style.top = '-60px';
            dom.style.left = 50-w + 'px';
            let _H = window.innerHeight - h;
            dom.style.transform = 'translateY('+ _H +'px)';
            // 隐藏起来 回归原位
            
            setTimeout(function(){
                dom.style.opacity = 0;
                dom.style.top = "-11px";
                dom.style.left = "7px";
                dom.style.transform = 'translateY(0px)';
            },300)
           
        },
        addAnimate(ele,x,y){
            clearInterval(ele.timer)
            ele.style.opacity = 1;
            let iSpeedX = 0,iSpeedY = 0, _top = 0
            ele.timer = setInterval(function(){
                
                ele.style.top = _top - iSpeedX + 'px';
                ele.style.left = -iSpeedX + 'px';
                _top = parseInt(ele.style.top);
                iSpeedY = ( _top - y -200) / 7
                
                iSpeedX += x * 0.1
            },300)
        }
    }
}
</script>
<style lang="stylus">
    .carconstrol
        display flex
        align-items center
        .decrease,.add
            padding 4px
            font-size 24px
            color rgb(0,160,250)
            transition: all 0.4s linear
            transform: rotate(0)
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: translate3d(24px, 0, 0)
                .decrease
                    transform: rotate(180deg)
        .count
            width 16px
            font-size 10px
            color rgb(147,153,159)
            line-height 25px
            height 25px
            text-align center
            vertical-align top
        // .parabola,.animate
        //     position absolute
        //     top -20px
        //     left 2px
        //     width 18px
        //     height 18px
        //     border-radius 50%
        //     opacity 0
        //     background-color rgb(0,160,250)
        //     z-index 900
        .animate
            border-radius 50%
            position absolute
            left 7px
            top -11px
            z-index 800
            width 18px
            height 18px
            opacity 0
            background-color rgb(0,160,250)
            transform translateZ(-1px)
            transition top 85ms ease-out, left 200ms linear,transform 115ms ease-in 85ms
</style>
