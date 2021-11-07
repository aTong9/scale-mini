import Taro from '@tarojs/taro'
// import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import { BaseConfig } from '@/interface'
import { toUpperCase } from '@/utils/util'
import md5 from 'js-md5'
import store from '@/store'
import dayjs from 'dayjs'
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))
const API_CODE = 'B759F724AA7A840F878CD16C3861AC89'
class Http {
  protected baseConfig: BaseConfig = {
    url: '',
    method: 'post',
    baseURL: `${process.env.TARO_P_API}`,
    header: {
      'Content-Type': 'application/json'
    },
    data: {},
    timeout: 15000, // 超时时间，5s更改为15s。后台的接口有时候会超出5s响应时间
    responseType: 'text'
  }
  // public request (option: BaseConfig): Promise<APIResponse> {
  public request (option: BaseConfig): Promise<any> {
    const config = {
      ...this.baseConfig,
      ...option,
      url: option.url.indexOf('http') === 0 ? option.url : (option.baseURL || this.baseConfig.baseURL) + option.url,
      method: toUpperCase(option.method),
      header: {
        ...this.baseConfig.header,
        cookie: store.state.sessionId
      }
    }
    
    // 签名使用原始接口地址，请求使用域名地址
    config.data = {
      ...config.data as any,
      user_token: store.state.token,
      api_token: store.state.token ? md5(`${store.state.token}${config.url.replace(process.env.TARO_P_API,'http://39.107.67.8:5050')}${dayjs().format('YYYY-MM-DD')}${API_CODE}`) : ''
    }

    // 去除空的参数
    const params: any = {}
    Object.keys(config).forEach((key) => {
      if (config[key] !== '' && config[key] !== undefined && config[key] !== null) {
        params[key] = config[key]
      }
    })
    console.log('params', params)
    return Taro.request(params);
  }

  public get (url: string, data?: object) {
    return this.request({
      method: 'get',
      url,
      data
    })
  }

  public post (url: string, data?: any) {
    return this.request({
      method: "POST",
      url,
      data
    });
  }
}

export default new Http()