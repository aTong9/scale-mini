module.exports = {
  env: {
    NODE_ENV: JSON.stringify('production'),
    // TARO_P_API: '"https://api.gehaiqing.com"'
    TARO_P_API: '"http://39.107.67.8:5050"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    publicPath: './'
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
