export interface State {
  token: string,
  config?: object,
  platForm?: string,
  numbers?: number[]
  /**
   * 0：表明首次访问，
   * 1：表明访问过但没有信息授权
   * 2：访问过信息授权过但未完成问卷信息采集
   * 3：访问过信息授权过问卷信息采集过
   */
  infoRank: number
  /** 会话ID，登录后保存，后面的接口需要传递给后端使用 */
  sessionId: string
}

export interface RequestOptions {
  /**
   * 资源url
   */
  url?: string
  /**
   * 请求的参数
   */
  data?: string | AnyObject | ArrayBuffer
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: any
  /**
   * 默认为 GET
   * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
   */
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  /**
   * 如果设为json，会尝试对返回的数据做一次 JSON.parse
   */
  dataType?: string
  /**
   * 设置响应的数据类型。合法值：text、arraybuffer
   */
  responseType?: string
  /**
   * 跨域请求时是否携带凭证
   */
  withCredentials?: boolean
  /**
   * 成功返回的回调函数
   */
  success?: (result: RequestSuccessCallbackResult) => void
  /**
   * 失败的回调函数
   */
  fail?: (result: GeneralCallbackResult) => void
  /**
   * 结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: GeneralCallbackResult) => void
}

interface RequestSuccessCallbackResult {
  /**
   * 开发者服务器返回的数据
   */
  data?: string | AnyObject | ArrayBuffer
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode?: number
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header?: any
}

interface GeneralCallbackResult {
  /**
   * 错误信息
   */
  errMsg?: string
}

interface GeneralCallbackResult {
  /**
   * 错误信息
   */
  errMsg?: string
}

/**
 * 接口响应数据格式
 */
export interface APIResponse {
  /** 返回码 */
  code: number
  /** 返回数据 */
  result: any
  /** 提示信息 */
  msg: string
}

export interface BaseConfig {
  url: string
  baseURL?: string
  method: string
  data?: string | object | ArrayBuffer
  header?: {
    'Content-Type': string
  }
  timeout?: number
  dataType?: string
  responseType?: string,
  enableHttp2?: boolean,
  cache?: string
}

