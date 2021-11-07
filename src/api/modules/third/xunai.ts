import Http from "@/api/http"
import md5 from 'js-md5'

// export const getResultData_servers = (postData) => {
//   return HTTPREQUEST.post('/api/white-screen/search', postData)
// }
const commonHeader: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=utf-8',
  SecretId: '103959597',
  // SecretKey: 'd019d0fea8a848ea8e49dffc0d999ce3',
  timestamp: new Date().getTime(),
  sign: md5('103959597' + new Date().getTime() + 'd019d0fea8a848ea8e49dffc0d999ce3')
}
export const XunAiApi = {

  /**
   * 智能体质识别
   * @param params 
   * @returns  
   */
  //  {
  //     code: "0000"
  //     data: { recordNo: "20210923890592109308350464" }
  //     recordNo: "20210923890592109308350464"
  //     msg: "成功"
  //   }
  Physique (params: { sex: string }) {
    console.log('xunai---params', params)
    return Http.request({
      url: 'https://xapi.xunai-tech.com/xunai-saas/saasApi/v1/corporeityDiagnose/start',
      method: 'post',
      header: commonHeader,
      data: {
        sex: params.sex
      }
    })
  },
  /**
   * 舌诊影像API
   * @param params 
   */
  Shadow (params: { tongueFrontImgPath: string, tongueBottomImgPath: string, notifyUrl: string }) {
    return Http.request({
      url: 'https://xapi.xunai-tech.com/xunai-saas/saasApi/v1/corporeityDiagnose/start',
      method: 'post',
      header: commonHeader,
      data: {
        tongueFrontImgPath: params.tongueFrontImgPath,
        tongueBottomImgPath: params.tongueBottomImgPath,
        notifyUrl: params.notifyUrl
      }
    })
  }
}