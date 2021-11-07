import { State } from '@/interface';
import Taro from '@tarojs/taro'
let token = Taro.getStorageSync('token')
let infoRank = Taro.getStorageSync('infoRank')
let sessionId = Taro.getStorageSync('sessionId')

const state: State = {
  numbers: [1, 2, 3],
  token: token || '',
  infoRank: infoRank || 0,
  sessionId: sessionId || ''
}

export default state