import { ActionTree } from 'vuex';
import { State } from '@/interface';

const action: ActionTree<State, State> ={
  addNumber(context, number) {
    context.commit('ADD_NUMBER', number)
  }
}

export default action