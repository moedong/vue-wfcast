# vue-wfcast

这是基于vue2 + vue-router2 + vuex + axios 仿(中国天气预报)的一个webapp项目！主要想借此项目来学习vue,觉得光是看理论和别人的文章总结对vue理解感觉是一知半解，不够深刻。所以找网上找了相关的资料，自己动手写了这个demo,
页面的数据是通过调用接口和页面爬取回来的，页面icon和数据保持和线上的一致，如有冒犯请告知，项目仅供参考学习。

### 参考资料列表

* [https://cn.vuejs.org/v2/api/](https://cn.vuejs.org/v2/api/)</br>
* [https://github.com/huang303513/Weather_Vue](https://github.com/huang303513/Weather_Vue)</br>
* [http://www.cnblogs.com/wisewrong/p/6558001.html](http://www.cnblogs.com/wisewrong/p/6558001.html)</br>
* [http://www.cnblogs.com/coco1s/p/4954063.html](http://www.cnblogs.com/coco1s/p/4954063.html)</br>
* [http://www.jianshu.com/p/dc9a79f6ceb7#](http://www.jianshu.com/p/dc9a79f6ceb7#)</br>
* [https://github.com/jokermonn/-Api/blob/master/CenterWeather.md](https://github.com/jokermonn/-Api/blob/master/CenterWeather.md)


### 部分截图

![主页](http://i1.piimg.com/591496/bdb92cd2db57c87b.png)
![主页](http://i1.piimg.com/591496/c2519c333c323dcf.png)
![主页](http://i1.piimg.com/591496/4d44f5e0cf31944b.png)
![我的关注](http://i1.piimg.com/591496/170539b0ea49bb32.png)
![我的关注](http://i1.piimg.com/591496/e62aa2499d39f94a.png)
![城市切换](http://i1.piimg.com/591496/654de14ec17109d0.png)
![详细空气指数](http://i1.piimg.com/591496/2c4744a95a4c7a74.png)

### 项目地址：（`git clone`）

```shell
git clone https://github.com/moedong/vue-wfcast.git
```

### 安装

```
npm install
```

### 运行

```
npm run dev
```

### 发布

```
npm run build
```

### 技术栈

在此DEMO中使用了一下技术
* vue2
* vue-router2
* vuex
* webpack2
* es6
* axios
* cheerio
* echarts


### 目录结构

<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── libs           // 组件的公用模块
│   ├── router         // 存放路由的文件夹
│   ├── vuex          // 状态管理文件夹
│   ├── App.Vue        // 模板文件入口
│   └── main.js        // Webpack 预编译入口
│   

</pre>

### 感谢

如果对于您有帮助 ，麻烦您使劲的给个Star吧 ！ ^_^ 




