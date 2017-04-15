import cityCode from '../libs/cityCode.json';
import cheerio from 'cheerio';


export default {
    methods: {
        getCity(city){
            var weathername = {
                "00": "晴",
                "01": "多云",
                "02": "阴",
                "03": "阵雨",
                "04": "雷阵雨",
                "05": "雷阵雨伴有冰雹",
                "06": "雨夹雪",
                "07": "小雨",
                "08": "中雨",
                "09": "大雨",
                10 : "暴雨",
                11 : "大暴雨",
                12 : "特大暴雨",
                13 : "阵雪",
                14 : "小雪",
                15 : "中雪",
                16 : "大雪",
                17 : "暴雪",
                18 : "雾",
                19 : "冻雨",
                20 : "沙尘暴",
                21 : "小到中雨",
                22 : "中到大雨",
                23 : "大到暴雨",
                24 : "暴雨到大暴雨",
                25 : "大暴雨到特大暴雨",
                26 : "小到中雪",
                27 : "中到大雪",
                28 : "大到暴雪",
                29 : "浮尘",
                30 : "扬沙",
                31 : "强沙尘暴",
                53 : "霾",
                99 : "无",
                32 : "浓雾",
                49 : "强浓雾",
                54 : "中度霾",
                55 : "重度霾",
                56 : "严重霾",
                57 : "大雾",
                58 : "特强浓雾",
                301 : "雨",
                302 : "雪"
            };
            var _this=this;
            _this.city=city;

         return new Promise(function(resolve, reject) {

                !city && _this.axios.get('/iplookup/iplookup.php?format=json')
                .then(function (response) {
                    //console.log(response.data.city);
                    _this.city=response.data.city;

                    resolve();

                }).catch(function (error) {
                    console.log('网络出错1');
                });

                !!city &&  resolve();

            }).then(function() {
                
                return new Promise(function(resolve, reject) {

                    var code=cityCode.find((n) => n.cityName==_this.city);
                    //console.log(_this.city);

                    //几天的天气
                    _this.axios.get('/Heart/index/all?city='+code.townID+'&language=&unit=&aqi=&alarm=&key=')
                    .then(function (response) {

                        //当天
                        _this.currentdata=response.data.weather[0];
                        var time=new Date(_this.currentdata.last_update);
                        _this.lastUpdate=time.getHours()+':'+time.getMinutes();

                        Object.keys(weathername).forEach(function(key,index){
                            if(weathername[key]==_this.currentdata.now.text){
                                _this.bgImage='background-image:url(http://i.tq121.com.cn/i/wap2016/news/d'+key+'.jpg)'
                            }
                        });

                        //未来6天
                        _this.daysData=_this.currentdata.future.map(function(x,index){
                            var _x=x;
                            _x.index=index;
                            if(new Date(_x.date).getDay()==new Date().getDay()){
                                _x.day='今天';

                            }

                            _x.code={'a':'svnicon01'};
                            Object.keys(weathername).forEach(function(key,index){
                                if(weathername[key]==_x.text.split('/')[0]){
                                    _x.code.b="weather-"+key;
                                }
                                if(weathername[key]==_x.text.split('/')[1]){
                                    _x.code.c="weather-n"+key;
                                }
                            });
                            return _x;
                        });

                        _this.option.series[0].data=[],_this.option.series[1].data=[];
                        _this.currentdata.future.forEach(function(val,index,arr){
                            _this.option.series[0].data.push(val.high);
                            _this.option.series[1].data.push(val.low);
                        });

                        resolve();

                    })
                    .catch(function (error) {
                        console.log('网络出错2');
                    });
                });

            }).then(function(){

                return new Promise(function(resolve, reject) {

                    var code=cityCode.find((n) => n.cityName==_this.city);

                    //未来24小时天气
                    _this.axios.get('/Heart/index/future24h?city='+code.townID)
                    .then(function (response) {
                        var hour24Data=response.data;
                        _this.hoursData=hour24Data.hourly.map(function(x){
                            var _x=x;
                            _x.time=new Date(_x.time).getHours();
                            Object.keys(weathername).forEach(function(key,index){
                                if(weathername[key]==_x.text && _x.time>=19 && _x.time<=24){
                                    _x.code={'a':'svnicon01','b':"weather-n"+key};
                                }else if(weathername[key]==_x.text && _x.time>=0 && _x.time<=6){
                                    _x.code={'a':'svnicon01','b':"weather-n"+key};
                                }else if(weathername[key]==_x.text){
                                    _x.code={'a':'svnicon01','b':"weather-"+key};
                                }
                            });
                            return _x;
                        });
                        resolve();
                    })
                    .catch(function (error) {
                        console.log('网络出错3');
                    });

                });

            }).then(function(){

                return new Promise(function(resolve, reject) {

                    //爬取页面 2345天气王
                    _this.axios.get('/t/searchCity.php?q='+_this.city)
                    .then(function (response) {
                        _this.catchUrl1=response.data.res[0].href; // dongguan/59289.htm
                        _this.catchCityName1=_this.catchUrl1.split("/")[1];
                        _this.catchCityCode1=response.data.res[0].href.replace(/\S*\/(\d+).htm/,"$1");
                        //console.log(_this.catchCode);
                    })
                    .then(function () {

                        _this.axios.get("/html/"+_this.catchCityName1+"-"+_this.catchCityCode1+'.htm')
                        .then(function (response) {
                            var $ = cheerio.load(response.data);
                            _this.todayLife=$('.today-life-index .bmeta').html();
                            //console.log($('.today-life-index').html());

                            resolve();

                        })
                        .catch(function (error) {
                            console.log('网络出错5');
                        });
                    })
                    .catch(function (error) {
                        console.log('网络出错4');
                    });

                });

            }).then(function(){

                return new Promise(function(resolve, reject) {

                    //爬取页面 围观天气
                    _this.axios.get('/weaoo/weaoo.php?a=searchAreas&'+'v='+_this.city)
                    .then(function (response) {
                        _this.catchUrl2=response.data[0].link; // dongguan/59289.htm
                        _this.catchCityName2=_this.catchUrl2.split("-")[0];
                        _this.catchCityCode2=response.data[0].link.replace(/\S*-(\d+).html/,"$1");
                        //console.log(_this.catchCode);
                    })
                    .then(function () {

                        _this.axios.get("/weaoo/"+_this.catchUrl2)
                        .then(function (response) {
                            var $ = cheerio.load(response.data);
                            _this.arroundData=$('.city-weather-list').html();
                            //console.log($('.today-life-index').html());

                            resolve();
                        })
                        .catch(function (error) {
                            console.log('网络出错7');
                        });
                    })
                    .catch(function (error) {
                        console.log('网络出错6');
                    });
                });

            }).catch(function(error) {
                console.log(error) 
            });
        },
        get15days(){
            
        }
    }
}
