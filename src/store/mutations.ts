import { MutationTree } from 'vuex'
import { State } from '@/interface'
import types from '@/store/types'
import Taro from '@tarojs/taro'
const mutations: MutationTree<State> = {
  /** 用户信息 */
  // [types.SET_USER_INFO]: (state, userInfo) => {
  //   setStore('userInfo', userInfo)
  //   state.userInfo = userInfo
  // },
  [types.ADD_NUMBER] (state, payload) {
    state.numbers?.push(payload)
  },
  [types.SET_USER_INFO] (state, payload) {
    if (payload) {
      if (payload.user_token) {
        state.token = payload.user_token
        Taro.setStorageSync('token', state.token)
      }
      if (payload.info_rank) {
        state.infoRank = payload.info_rank
        Taro.setStorageSync('infoRank', state.infoRank)
      }
      if(payload.sessionId) {
        state.sessionId = payload.sessionId
        Taro.setStorageSync('sessionId', state.sessionId)
      }
      
    }
  },
  [types.CLEAR_USER_INFO] (state) {
    state.token = ''
    Taro.removeStorageSync('token')
    state.infoRank = 0
    Taro.removeStorageSync('infoRank')
    state.sessionId = ''
    Taro.removeStorageSync('sessionId')
  },
}
export default mutations
