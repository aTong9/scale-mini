module.exports = {
  env: {
    NODE_ENV: JSON.stringify('development'),
    // TARO_P_API: '"https://api.gehaiqing.com"'
    TARO_P_API: '"http://39.107.67.8:5050"'
  },
  defineConstants: {},
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {}
  },
  mini: {},
  h5: {}
}
