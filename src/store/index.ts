import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import * as modules from './modules'
export { types } from './types'

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    ...modules
  },
  // strict: process.env.FE_ENV !== 'production'
})

export default store