<template>
    <div v-if="isLoading" class="details">
        <section v-html="aqiHtml" class="aqi-detail"></section>
        <section v-html="fomityHtml" class="mainFomites"></section>
        <section v-html="realHtml" class="module Realtime_data"></section>
    </div>
    <loading v-else></loading>
</template>

<script>
import loading from "../components/loading.vue"
import cheerio from 'cheerio';

export default{
    data(){
        return {
            isLoading: false,
            aqiHtml:'',
            fomityHtml:'',
            realHtml:'',
            city:'',
            catchUrl1:'',
            catchCityCode1:''
        }
    },
    components:{
        loading
    },
    created(){

        var _this=this;
        _this.city=this.$route.query.city;

        new Promise((resolve,reject)=>{

            _this.axios.get('/t/searchCity.php?q='+_this.city)
            .then(function (response) {
                _this.catchUrl1=response.data.res[0].href; // dongguan/59289.htm
                _this.catchCityCode1=response.data.res[0].href.replace(/\S*\/(\d+).htm/,"$1");
                //console.log(_this.catchCode);
            })
            .then(function () {

                _this.axios.get("/html/air-"+_this.catchCityCode1+'.htm')
                .then(function (response) {
                    var $ = cheerio.load(response.data);

                    _this.aqiHtml=$('.aqi-detail').html();
                    _this.fomityHtml=$('.mainFomites').html();
                    _this.realHtml=$('.Realtime_data').html();


                    resolve();

                })
                .catch(function (error) {
                    console.log('网络出错5');
                });
            })
            .catch(function (error) {
                console.log('网络出错4');
            });


        }).then(()=>{

            this.isLoading=true

        });
    }
}
</script>

<style>
@import '../assets/css/details.css';
</style>