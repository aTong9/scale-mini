import Taro from "@tarojs/taro"
import { pageToLogin } from "./utils"
import { HTTP_STATUS } from './config'
import store, { types } from '@/store'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在")

    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题")

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");

    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      return Promise.reject("需要鉴权")

    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      if (res.data.code === 1000000) {
        // 后端使用的session存储token，登录后需要把sessionId在本地存储起来，每次请求放到请求头中。
        if(!store.state.sessionId) {
          store.commit(types.SET_USER_INFO, {sessionId:res.cookies?res.cookies.join(';').split(';')[0]:''})
        }
        return res.data.result
      } else if (res.data.code === 1010102) {
        // 令牌失效，重新登录
        store.commit(types.CLEAR_USER_INFO)
        return Promise.reject({
          errMsg: '请重新登录'
        })
      } else {
        // 处理临时获取测量结果的接口
        if(res.data.C0) {
          return res.data
        }
        Taro.showToast({ title: res.data.message, icon: 'none' })
        return Promise.reject({
          errMsg: res.data.message
        })
      }
    }
  }).catch((err) => {
    Taro.showToast({ title: `${ typeof err === 'string' ? err: err.errMsg}`, icon: 'error' as any })
    return Promise.reject(err)
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors