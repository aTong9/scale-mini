const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// https://github.com/NervJS/taro/issues/6479

// https://github.com/c690554125/taro-mobx-ts-demo

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  projectName: 'moon_universe_mini',
  date: '2021-9-16',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  alias: {
    // '@/': path.resolve(__dirname, '..', 'src/')
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/interface': path.resolve(__dirname, '..', 'src/interface'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils')
  },
  sass: {
    resource: ['src/assets/styles/custom_theme.scss'],
    projectDirectory: path.resolve(__dirname, '..')
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue3',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    imageUrlLoaderOption: {
      limit: 10000,
      mimetype: 'image/png',
      encodeing: 'base64'
    },
    webpackChain(chain, webpack) {
      // chain.plugin('analyzer'
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      // chain.mode("production");
      // chain.optimization.minimize(true);
      // chain.plugin("terser").use(TerserPlugin, [
      //   {
      //     cache: true,
      //     extractComments: false,
      //     terserOptions: {
      //       output: {
      //         comments: false
      //       }
      //     }
      //   }
      // ]);
      // 给resolve.plugins添加ts paths 插件。自动插入alias依赖
      // chain.resolve.plugin('ts-config-paths').use(new TsConfigPathsPlugin());
      // 查看webpack配置
      // console.log(chain.toString());
    },
    optimizeMainPackage: {
      enable: true
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false
            },
            compress: {
              drop_debugger: true
            }
          }
        }),
        new CssMinimizerPlugin()
      ],
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        maxAsyncRequests: 5, // 由3改为5。个数少了，部分重复包会被打到每个chunk中，导致总大小有42M多。 2021.02.08
        maxInitialRequests: 5,
        minSize: 30000,
        cacheGroups: {
          vendors: {
            test(module) {
              return /[\\/]node_modules[\\/]/.test(module.resource) && module.miniType !== PARSE_AST_TYPE.COMPONENT
            }
          },
          // alioss: {
          //   // alioss单独打包，在使用的文件引入，不要在入口文件中引入。
          //   test: module => {
          //     return /ali-oss/.test(module.context);
          //   },
          //   name: "aliyun-oss",
          //   chunks: "all",
          //   priority: 18,
          //   minChunks: 1
          // },
          nut: {
            // 超过3个模块使用的nut单独打包
            test: (module) => {
              return /nut/.test(module.context)
            },
            name: 'nut',
            chunks: 'all',
            priority: 18,
            minChunks: 3
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
