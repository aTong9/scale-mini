import { createApp } from 'vue'
import store from './store'
import '@/utils/vue-ext'
import './app.scss'

import {
  Icon,
  Collapse,
  CollapseItem,
  Picker,
  Popup,
  Uploader,
  Button,
  OverLay,
  Toast,
  Progress
} from '@nutui/nutui-taro'

// import '@nutui/nutui-taro/dist/style.css';
import '@nutui/nutui-taro/dist/styles/themes/default.scss'

const App: any = createApp({
  onShow(options) {
    console.log(options)
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
  .use(Uploader)
  .use(Button)
  .use(Icon)
  .use(Collapse)
  .use(CollapseItem)
  .use(Picker)
  .use(Popup)
  .use(OverLay)
  .use(Toast)
  .use(Progress)

App.use(store)
export default App
