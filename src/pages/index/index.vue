<template>
  <view class="page">
    <!-- <view class="moon" /> -->
    <!-- <view v-if="!$store.getters.isLogin" class="no-login">
      <div class="empty">
        <image class="empty-img" src="@/assets/imgs/no-logo.png" />
        <LoginModal />
      </div>
    </view> -->
    <view class="header">
      <view class="header-right">
        <image class="headeimg" src="@/assets/imgs/no-logo.png" />
        <view class="name">bin></view>
      </view>
    </view>
    <view class="container">
      <view>
        <view
          v-for="(item, idx) in messageList"
          :key="idx"
          :class="{ 'message-right': item.type === 'right' }"
          class="message"
        >
          <view class="message-con">
            {{ item.msg }}
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view v-if="scaleList" class="answer-group">
        <view v-for="(item, idx) in scaleList.a" :key="idx" class="answer-item">{{ item }}</view>
      </view>
      <view class="send-group">
        <input type="text" class="send-msg" />
        <span><nut-icon name="category" color="#1890ff" /></span>
      </view>
    </view>
    <!-- <CustomTabbar :selected="0" /> -->
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { reactive, toRefs, computed, onMounted } from 'vue'
import { Button, Toast, Icon } from '@nutui/nutui-taro'
import { useStore } from 'vuex'
import LoginModal from '../../components/LoginModal.vue'
import scaleJson from './index.json'

export default {
  name: 'Index',
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    LoginModal
  },
  setup() {
    const store = useStore()
    const state: any = reactive({
      msg: '首页',
      fileUrl: 'http://39.107.67.8:5050/static/img/',
      scaleList: null,
      messageList: [
        {
          type: 'left',
          msg: '嗨，我是小测，您身边的智能测试管家'
        },
        {
          type: 'left',
          msg: '您手脚发凉吗？'
        },
        {
          type: 'right',
          msg: '没有'
        }
      ]
    })
    const getNumbers = computed(() => store.getters.getNumbers)

    const answerClick = (item: any) => {
      console.log(item)
    }
    onMounted(() => {
      state.scaleList = scaleJson
      console.log('scaleJson', scaleJson)
      Taro.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#333131'
      })
    })
    return {
      ...toRefs(state),
      getNumbers,
      answerClick
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 2px 8px rgba(165, 120, 120, 0.1);
  padding: 5px 15px;
  &-right {
    display: flex;
    align-items: center;
    background: $primary-color;
    color: #fff;
    padding: 1px 6px;
    border-radius: 30px;
    .headeimg {
      height: 30px;
      width: 30px;
      border-radius: 100%;
    }
    .name {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
.container {
  height: 100%;
  flex: 1;
  overflow-y: auto;
  .message {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
    margin: 15px;
    width: auto;
    .message-con {
      border-radius: 0 15px 15px 15px;
      color: #333;
      padding: 10px 15px;
      background: #eee;
    }
    &-right {
      justify-content: flex-end;
      .message-con {
        background: $primary-color;
        color: #fff;
        border-radius: 15px 0 15px 15px;
      }
    }
  }
}
.footer {
  box-shadow: 0 2px 8px rgba(165, 120, 120, 0.1);
  padding: 5px 15px;
  width: calc(100% - 30px);
  background: #fff;
  .answer-group {
    .answer-item {
      display: inline-block;
      border: 1px solid #d9d9d9;
      padding: 3px 10px;
      border-radius: 15px;
      margin: 10px 10px 10px 0;
      font-size: 16px;
    }
  }
  .send-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .send-msg {
      width: 70%;
      border: 1px solid rgba($color: $primary-color, $alpha: 0.1);
      border-radius: 20px;
      font-size: 14px;
      padding: 5px 10px;
      color: #333;
      background: rgba($color: $primary-color, $alpha: 0.1);
    }
  }
}
</style>
