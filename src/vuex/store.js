import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'

// 使用 vuex
Vue.use(Vuex)


export const STORAGE_KEY = 'citys'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO 放置初始状态
    count: 0,
    citys:JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    fatherDire:'',
    curDire:'/'
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO 放置我们的状态变更函数
    addCity (state, datas) {
        state.citys.push(datas);
        window.localStorage.setItem(datas.city, JSON.stringify(datas));
        //console.log(state.citys);
    },
    deleteCity(state,{city}){
        state.citys.splice(state.citys.indexOf(city), 1);
        window.localStorage.removeItem(city.city);
    },
    refreshCity(state,curCitys){

        state.citys.forEach(function(value,index,array){
            array[index]=curCitys[index];
        });
    },
    changeDire(state,{fpath,cpath}){

        state.fatherDire=fpath;
        state.curDire=cpath;

    },
    initCity (state) {
        var storage = window.localStorage;
        state.citys=[];
        for (var i=2, len = storage.length; i < len; i++){
            var key = storage.key(i);
            state.citys.push(JSON.parse(storage.getItem(key)));
        }
    }

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以链接到我们的应用中
export default new Vuex.Store({
  getters,state, mutations
})