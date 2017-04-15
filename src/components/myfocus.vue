<template>
<div class="wrapper" @click="changeClass">
    <div class="search" id="searchBox">
        <div class="box">
            <input id="inputSearchCity" name="" placeholder="输入城市" type="text" v-model="city">
            <div class="btn" id="wapSearchBtn" v-on:click="toAddCity()">添加</div>
        </div>
    </div>

    <section class="city-list">
        <h3 class="btitle">城市天气</h3>
        <card :citys="citys"></card>
    </section>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import mixin from '../libs/mixin2';
import card from './card.vue';

export default {
    data () {
        return {
          city:'',
          currentdata:{},
          datas:{},
          wicon:'',
          curCitys:[]
        }
    },
    props: ['childMsg'],
    computed: {
        ...mapGetters([
          'citys'
        ])
    },
    mixins:[mixin],
    components: { card },
    methods: {
        toAddCity(){
            new Promise((resolve, reject)=> {

                resolve(this.getWeather());

            }).then(()=>{

                let datas={};
                datas.city=this.city;
                datas.temperature=this.currentdata.future[0].high+'° ~ '+this.currentdata.future[0].high+'°';
                datas.wicon=this.wicon;
                datas.autoRefresh=true;
                var time=new Date(this.currentdata.last_update);
                datas.lastUpdate=time.getHours()+':'+time.getMinutes();

                this.addCity(datas);

                this.$watch('citys', ()=>{


                    new Promise((resolve, reject)=> {

                        resolve(this.autoRefresh());

                    }).then(()=>{

                        !!this.curCitys.length && this.refreshCity(this.curCitys);


                    }).catch(function(error) {
                        console.log(error) 
                    });


                }, {immediate: true});

            }).catch(function(error) {
                console.log(error) 
            });

        },
        ...mapMutations([
          'addCity','refreshCity','initCity'
        ]),
        changeClass(){
            this.childMsg && this.$emit('toggle-class',!this.childMsg);
        }

    },
    created(){
        this.initCity();
    },
    watch: {
      '$route' (to,from){
            console.log("init again");
            this.initCity();
      }
    }
}

</script>

<style>
@import '../assets/css/weather.css';
</style>