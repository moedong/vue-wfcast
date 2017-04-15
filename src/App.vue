<template>
    <div id="app" :class="{ 'with-panel-right-cover' : isActive}">

        <bar @toggle-class="toggle" :child-msg="isActive"></bar>

        <keep-alive>
            <transition>
                <router-view @toggle-class="toggle" :child-msg="isActive" ></router-view>
            </transition>
        </keep-alive>

        <pannel @toggle-class="toggle" :child-msg="isActive"></pannel>

    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import bar from './components/bar';
import pannel from './components/pannel';


export default {
  name: 'app',
  data(){
    return {
        isActive:false
    }
  },
  computed: {
        ...mapGetters([
          'fatherDire','curDire'
        ])
    },
  components: {
    bar,pannel
  },
  watch: {
    '$route': 'direPath'
  },
  methods:{
    ...mapMutations([
        'changeDire'
    ]),
    direPath(){
        let pathA=this.$route.path.split('/');
        pathA.pop();
        if(pathA.join()===''){
            this.changeDire({fpath:'/',cpath:this.$route.path});
        }else{
            this.changeDire({fpath:pathA.join(),cpath:this.$route.path});
        }
    },
    toggle(msg){
        this.isActive = msg;
    }

  }
}

</script>

<style>
    @import './assets/css/weather.css';
</style>

