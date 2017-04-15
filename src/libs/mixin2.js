
import cityCode from '../libs/cityCode.json';
import cheerio from 'cheerio';


export default {
    methods: {
        getWeather(){
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

            var code=cityCode.find((n) => n.cityName==_this.city);

            return  new Promise(function (resolve, reject) {

                _this.axios.get('/Heart/index/all?city='+code.townID+'&language=&unit=&aqi=&alarm=&key=')
                .then(function (response) {

                    //当天
                    _this.currentdata=response.data.weather[0];
                    Object.keys(weathername).forEach(function(key,index){
                        if(weathername[key]==_this.currentdata.now.text){
                            _this.wicon="weather-"+key;
                        }
                    });
                    resolve();

                })
                .catch(function (error) {
                    console.log(error);
                });

            });

        },
        autoRefresh(){
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

            return  new Promise(function (resolve, reject) {


                if(_this.citys.length!=0) {

                    setInterval(()=>{ //半个小时更新一次
                        
                        var array=[].concat(_this.citys);

                        array.forEach(function(value,index,arr){

                            var code=cityCode.find((n) => n.cityName==value.city);

                            !!value.autoRefresh && _this.axios.get('/Heart/index/all?city='+code.townID+'&language=&unit=&aqi=&alarm=&key=')
                            .then(function (response) {

                                //当天
                                var currentdata=response.data.weather[0];
                                value.temperature=currentdata.future[0].high+'° ~ '+currentdata.future[0].high+'°';
                                Object.keys(weathername).forEach(function(key,index){
                                    if(weathername[key]==currentdata.now.text){
                                        value.wicon="weather-"+key;
                                    }
                                });
                                var time=new Date(currentdata.last_update);
                                value.lastUpdate=time.getHours()+':'+time.getMinutes();

                                _this.curCitys.push(value);
                                console.log(index,value.city,'更新成功');
                                if(index==arr.length-1){resolve()}

                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                        });
                        
                    },1800000);
                }

            });
            
        }
    }
}
