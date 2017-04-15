import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import details from '@/components/details'
import myfocus from '@/components/myfocus'
import chooseCity from '@/components/chooseCity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: '天气预报v1.0',
      component: function (resolve) {
        require(['../components/Home'], resolve)
        } 
    },
    {
      path: '/myfocus',
      name: '我的关注',
      component: myfocus
    },
    {
      path: '/chooseCity',
      name: '城市切换',
      component: chooseCity
    },
    {
      path: '/details',
      name: '详细指数',
      component: details
    }
  ]
})
