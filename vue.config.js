module.exports = {
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
  }
}
