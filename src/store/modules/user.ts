import { MutationTree, GetterTree } from 'vuex'

interface UserState {
  /** 缓存选择的就诊人 */
  bloodPressurePatientId: string
  /** 缓存选择的就诊人 */
  bloodSugarPatientId: string
}
const UserState: UserState = {
  bloodPressurePatientId: '',
  bloodSugarPatientId: ''
}

const getters: GetterTree<UserState, any> = {
  bloodPressurePatientId: (state) => {
    return state.bloodPressurePatientId
  },
  bloodSugarPatientId: (state) => {
    return state.bloodSugarPatientId
  }
}
const mutations: MutationTree<UserState> = {
  setBloodPressurePatientId: (state, id) => {
    state.bloodPressurePatientId = id
  },
  setBloodSugarPatientId: (state, id) => {
    state.bloodSugarPatientId = id
  }
}

export const user = {
  namespaced: true,
  state: UserState,
  mutations,
  getters
}
