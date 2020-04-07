const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  publicPath: '',
  devServer: {
    host: '0.0.0.0',
    port: 8901
    // proxy: {
    //   '/api': {
    //     target: 'http://120.77.25.155/',
    //     changeOrigin: true
    //   }
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  },
  // configureWebpack: {
  //   plugins:[]
  // },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.css$|\.ttf$|\.html$|\.svg$|\.json$|\.js$/, // 匹配文件名
            threshold: 0, // 对超过0kb的数据压缩
            deleteOriginalAssets: true // 是否删除源文件? true是||false否
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('image')
      .test(/\.(png|jpg|gif|svg)$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
  }
}
