import Http from "@/api/http"

// export const getResultData_servers = (postData) => {
//   return HTTPREQUEST.post('/api/white-screen/search', postData)
// }
export const OrderApi = {
  /** 我的订单列表 */
  getResultData_servers (params: object) {
    return Http.post('/api/white-screen/search', params)
  }
}