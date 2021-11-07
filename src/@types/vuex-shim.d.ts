import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
