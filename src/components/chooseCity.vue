<template>
<div class="wrapper" @click="changeClass">
    <div class="search" id="searchBox">
        <div class="box">
            <input id="inputSearchCity" name="" placeholder="输入城市" type="text" v-model="city">
            <div class="btn" id="wapSearchBtn" v-on:click="loadCity(city)">搜索</div>
        </div>
    </div>

    <section class="city-list">
        <h3 class="btitle">最常访问的城市</h3>
        <ul class="listContent">
           <li v-for="item in curCitys" v-text="item"  v-on:click="loadCity(item)"></li>
        </ul>
    </section>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    data () {
        return {
          city:'',
          curCitys:['湛江','甘南','增城','北京','上海','杭州','广州','深圳','肇庆','清远','青岛','杭州','温州','香港','苏州'],
          allCitys:[]
        }
    },
    props: ['childMsg'],
    computed: { 
        ...mapGetters([
          'citys'
        ])
    },
    methods: {
        loadCity(item){
            this.$router.push({ path: '/', query: {city: item}})
        },
        changeClass(){
            !!this.childMsg && this.$emit('toggle-class',!this.childMsg);
        }
    }
}

</script>

<style>
.wrapper{padding-top:0.8rem;}
.header {
    background-color: #157bd2;
    color: #fff;
}
.header .btitle {
    position: relative;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.42rem
}
.header .btitle .back{
    float:left;
    color:#fff;
    width:1rem;
    font-size:0.36rem;
    padding-left:0.1rem;
    -webkit-box-align:center;
    display:-webkit-box;
}
.header .btitle .back::before{
    content: "";
   width:0.18rem;
   height:0.18rem;
   border:1px solid #fff;
   border-color:transparent transparent #fff #fff;
   transform:rotate(45deg);
   display: inline-block;
}
.search {
    background-color: #f1f1f1;
    padding: 0.3rem;
    position: relative;
}
.search .box {
    position: relative;
    background-color: #FFF;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    border:1px solid #ededed;
    box-sizing:content-box;
    overflow: hidden;
    font-size: 0.32rem;
}
.search .box input{
    width: 70%;
    height: 0.8rem;
    line-height: 0.8rem;
    border:none;
    vertical-align: top;
    font-size: 0.32rem;
    padding-left:0.2rem;
}
.search .box .btn{
    float: right;
    border-left: 1px solid #ededed;
    height:0.65rem;
    line-height: 0.65rem;
    padding:0 0.2rem;
    margin-top:0.07rem;
}
.city-list .btitle {
    color: #50a2f4;
    text-align: center;
    font-size: 0.32rem;
    height:0.8rem;
    line-height: 0.8rem;
}
.card {
    background: rgba(249, 249, 249, 0.5);
    box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
    margin: 0.3rem;
    position: relative;
    border-radius: 0.1rem;
    font-size: 0.32rem;
}
.card-content-inner {
    padding: 0.25rem 0.35rem;
    position: relative;
}
.card-header {
    border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.35rem;
    
}
.card .svnicon01{margin:0;display:inline-block;vertical-align:middle;}
.card-header, .card-footer {
    min-height:0.32rem;
    padding: 0.25rem 0.35rem;
    position: relative;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
}
.card-footer {
    border-radius: 0 0 0.1rem 0.1rem;
    color: #5f646e;
    border-top: 1px solid #e1e1e1;
}
.card-footer .on{color:#f80;}

.city-list .listContent{
    display:block;
    overflow: hidden;
}
.city-list .listContent li{
    display: block;
    width: 23%;
    float: left;
    color: #666;
    background-color: #eaf4ff;
    -moz-box-shadow: 1px 1px 1px #bedcfb;
    -webkit-box-shadow: 1px 1px 1px #bedcfb;
    box-shadow: 1px 1px 1px #bedcfb;
    height:0.8rem;
    line-height:0.8rem;
    overflow: hidden;
    border-radius: 0.1rem;
    margin:1%;
    box-sizing:border-box;
    text-align:center;
}

</style>