<template>
    <div>
        <div v-if="isLoading" id="weather" class="airtab-cont" @click="changeClass">
            <article class="weather-cont" :style="bgImage">
                <div class="weather-one">
                    <div class="weather-position">
                        <i class="new-icon-dingwei"></i>
                        <div class="weather-position-address" @click="switchCity">
                            <h2>{{city}}<span><img src="http://i.tq121.com.cn/i/wap2016/news/cityDown.png" style="width:15px;position:relative;top:2px;"></span>
                            </h2>
                        </div>
                    </div>
                    <time class="weather-data">{{lastUpdate}}<span>更新</span></time>
                </div>
                <div class="weather-two">
                    <div class="weather-wd">{{currentdata.now.temperature}}</div>
                    <div class="weather-wd-top">°C</div>
                    <div class="weather-tqqk" style="padding-top: 0.45rem;">
                    <p class="weather-tq">{{currentdata.now.text}}</p>
                    <p class="weather-gdw">
                        <span class="weather-gw" id="tempmax"><i class="new-icon-up"></i>{{currentdata.future[0].high}}°</span>
                        <span class="weather-dw" id="tempmin"><i class="new-icon-down"></i>{{currentdata.future[0].low}}°</span>
                    </p>
                    </div>
                    <li class="wea-three03" id="warnparent" style="display: none;">
                        <a href="#"><img src="http://i.tq121.com.cn/i/wap2016/news/icon-shandian.png"><span></span></a>
                    </li>
                </div>
                <div class="weather-three">
                    <ul>
                        <li class="wea-three01">
                            <div class="weather-meg"><a href="#"><img src="http://i.tq121.com.cn/i/wap2016/news/icon-feng.png"><span id="WD">{{currentdata.now.wind_direction}}风 {{currentdata.now.wind_scale}}级</span></a></div>
                        </li>
                        <li class="wea-three02">
                            <div class="weather-meg" id="wuran"><a href="#"><img src="http://i.tq121.com.cn/i/wap2016/news/icon-wuran.png"><span>空气 {{currentdata.now.air_quality.city.quality}}</span></a></div>
                        </li>
                    </ul>
                </div>
                <div class="weather-all">
                    <!-- tong 72hours -->
                    <div class="weather-title" style="display: block;">
                        <span class="title-name">逐小时预报</span>
                    </div>
                    <div class="hours72" id="hours72">
                        <ul>
                            <li v-for="hour in hoursData">
                                <time>{{hour.time}}时</time><i  :class="[hour.code.a,hour.code.b]"></i><p>{{hour.temperature}}°</p>
                            </li>
                        </ul>
                    </div>
                    <div class="tianqicont-div"> 
                        <ul>
                            <li class="activeLi"></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                            <li class=""></li>
                        </ul>
                        <article class="tianqicont">
                            <div class="weather-up">
                                <div v-for="day in daysData" :class="[weatherUp,{weatherday:day.index==0}]" v-show="day.index<6">
                                    <time id="fj0">{{day.day}}</time>
                                    <i id="fa0" :class="[day.code.a,day.code.b]"></i>
                                </div>
                            </div>
                            <div id="myChart" :style="{width:'375px',height:'240px'}"></div>

                            <div class="weather-down">
                                <div v-for="day in daysData" :class="[weatherUp,{weatherday:day.index==0}]" v-show="day.index<6">
                                    <i id="fa0" :class="[day.code.a,day.code.c]"></i>
                                    <p class="wefther-fx" id="fe0">{{day.wind}}</p>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>
            </article>
            <article class="today-life-index">
                <div class="btitle">今日生活指数<router-link :to="{ path: 'details', query: { city: city}}">详细指数</router-link></div>
                <dl v-html="todayLife" class="bmeta"></dl>
            </article>

            <article class="today-life-index">
                <div class="btitle">{{city}}周边地区天气预报</div>
                <ul v-html="arroundData" class="city-weather-list">
                </ul>
            </article>
        </div>
        <loading v-else></loading>
    </div>
</template>


<script>
import mixin from '../libs/mixin';
import loading from '../components/loading';

export default {
  data () {
    return {
      isLoading: false,
      city:'北京',
      cityCode:'',
      currentdata:{},
      lastUpdate:'',
      hoursData:{},
      daysData:{},
      weatherUp:'weather-up-li',
      bgImage:'background-image:url(http://i.tq121.com.cn/i/wap2016/news/d03.jpg)',
      todayLife:'',
      catchUrl1:'',
      catchCityName1:'',
      catchCityCode1:'',
      arroundData:'',
      catchUrl2:'',
      catchCityName2:'',
      catchCityCode2:'',
      option:{
            title : {
                text: '未来一周气温变化',
                subtext: '纯属虚构',
              show : false
            },
            tooltip : {
                trigger: 'item',
              show : false
            },
            legend: {
                data:['最高气温','最低气温'],
              show : false,
            },
            grid: {
                x:'7%',
                y:'10%',
                x2:'7%',
                y2:'10%',
                height:'90%'
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六'],
                    show : false
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show : false
                }
            ],
            series : [
                {
                    name:'最高气温',
                    type:'line',
                    smooth:'true',
                    data:[11, 11, 15, 13, 12, 13],
                    lineStyle: {
                        normal: {
                            opacity: "0.5"
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#f28f00",
                            label: {
                                color: "#f28f00",
                                show: !0,
                                position: "top",
                                textStyle: {
                                    fontFamily: "Helvetica",
                                    color: "#f28f00"
                                },
                                formatter: function(t) {
                                    var e = parseInt(t.value);
                                    return 0 == e ? "0°C": e + "°C"
                                }
                            }
                        }
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    smooth:'true',
                    data:[1, -2, 2, 5, 3, 2],
                    lineStyle: {
                        normal: {
                            opacity: "0.5"
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#4593e0",
                            label: {
                                color: "#4593e0",
                                show: !0,
                                position: "top",
                                textStyle: {
                                    fontFamily: "Helvetica",
                                    color: "#4593e0"
                                },
                                formatter: function(t) {
                                    var e = parseInt(t.value);
                                    return 0 == e ? "0°C": e + "°C"
                                }
                            }
                        }
                    }
                }
            ]
        }
    }
  },
  mixins:[mixin],
  props: ['childMsg'],
  components:{
      loading
  },
  methods:{

    changeClass(){
        
        !!this.childMsg && this.$emit('toggle-class',!this.childMsg);

    },
    switchCity(){
        
        this.$router.push('/chooseCity');
    }

  },
  created(){

    this.getCity(this.$route.query.city).then(()=>{
        //根据返回来的 promise实例状态，当为 resolve 状态时，改变isLoading值，显示数据
        this.isLoading=true;

    }).then(()=>{
        //画曲线图
        setTimeout(()=>{
            this.$echarts.init(document.getElementById('myChart')).setOption(this.option);
        },1000);
    });

  }

}
</script>

<style>
</style>