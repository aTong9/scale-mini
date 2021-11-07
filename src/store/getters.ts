import { GetterTree } from 'vuex';
import { State } from '@/interface';

const getters: GetterTree<State, State> = {
  getNumbers (state) {
    return state.numbers
  },
  isLogin(state) {
    return !!state.token && state.infoRank > 1 && state.sessionId
  }
}

export default getters