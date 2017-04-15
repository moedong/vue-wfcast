<template>
    <div class="panel panel-right" @click="changeClass">
        <div class="content-block">
            <router-link :to="'myfocus'" tag="p" class="icon ion-heart">我的关注</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['childMsg'],
    methods:{
        changeClass(){
            //console.log(this.childMsg);
            this.$emit('toggle-class',!this.childMsg);
            
        }
    }
    
}
</script>

<style scoped>
@import '../assets/css/ionicons.css';

.panel.panel-right{
    z-index: 6000;
    right: -4rem;
}
.panel{
    z-index: 1000;
    background:rgba(0,0,0,0.7);
    color: white;
    box-sizing: border-box;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    width:4rem;
    top: 0;
    height: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: all 400ms;
    transition: all 400ms;
}
.with-panel-right-cover .panel-right {
    -webkit-transform: translate3d(-4rem, 0, 0);
    transform: translate3d(-4rem, 0, 0);
}
.content-block {
    margin: 1.75rem 0;
    padding: 0 0.75rem;
}
.content-block .icon{
    margin:0.5rem 0;
    line-height:0.5rem;
    display:block;
    color:#fff;
}
.icon:before{margin-right:0.05rem}
</style>
