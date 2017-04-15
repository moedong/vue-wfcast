<template>
    <header class="bar bar-nav">
        <i class="arrow-left ion-ios-arrow-left" v-show="curDire!=='/'" @click="fallback">返回</i>
        <h1 class="title">{{title}}</h1>
        <span class="icon icon-menu" @click="changeClass"></span>
    </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            title:'天气预报v1.0'
        }
    },
    props: ['childMsg'],
    computed: {
        ...mapGetters([
          'fatherDire','curDire'
        ])
    },
    methods:{
        changeClass(){
            this.$emit('toggle-class',!this.childMsg);
        },
        fallback(){
            this.$router.push(this.fatherDire);
        }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

        this.title=this.$router.currentRoute.name;

      }
    }

}
</script>

<style>
    @import '../assets/css/bar.css';
</style>