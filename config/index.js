// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/iplookup': {
        target: 'http://int.dpool.sina.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/iplookup': '/iplookup'
        }
      },
      '/Heart': {
        target: 'http://tj.nineton.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/Heart': '/Heart'
        }
      },
      '/html': {
        target: 'http://waptianqi.2345.com',
        changeOrigin: true,
        pathRewrite: {
          '^/html': ''
        }
      },
      '/t': {
        target: 'http://tianqi.2345.com',
        changeOrigin: true,
        pathRewrite: {
          '^/t': '/t'
        }
      },
      '/weaoo': {
        target: 'http://www.weaoo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/weaoo': ''
        }
      }
      
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
