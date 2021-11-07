<template>
  <div>
    <nut-button type="primary" @click="login" :loading="loading">立即登录</nut-button>
    <div v-if="loginModalVisible">
      <div class="bg"></div>
      <div class="login-modal">
        <div class="title">
          <!-- 提示 -->
          <nut-icon name="close" @click="loginModalVisible = false"></nut-icon>
        </div>
        <div class="logo logo-svg"></div>
        <div class="center">
          <nut-button type="primary" @click="register" :loading="loading">一键登录</nut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang=ts>
import { defineComponent, ref } from 'vue'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api/modules'
import { useStore } from 'vuex'
import { types } from '@/store'
export default defineComponent({
  setup(_props, { emit }) {
    const store = useStore()
    const loginModalVisible = ref(false)
    const loading = ref(false)

    const login = () => {
      // 已获取登陆信息
      if (store.state.sessionId && store.state.token && store.state.infoRank < 2) {
        loginModalVisible.value = true
        return
      }
      loading.value = true
      Taro.login()
        .then((res) => {
          UserApi.login({ wechat_code: res.code })
            .then((res) => {
              store.commit(types.SET_USER_INFO, res)
              if (res.info_rank < 2) {
                loginModalVisible.value = true
              }
            })
            .finally(() => {
              loading.value = false
            })
        })
        .catch(() => {
          loading.value = false
        })
    }

    const register = () => {
      loading.value = true
      Taro.getUserProfile({ desc: '注册使用' })
        .then(async ({ userInfo }) => {
          await UserApi.register({
            nick_name: userInfo.nickName,
            avatar_url: userInfo.avatarUrl,
            user_gender: userInfo.gender,
            user_country: userInfo.country,
            user_province: userInfo.province,
            user_city: userInfo.city
          })
          store.commit(types.SET_USER_INFO, { info_rank: 2 })
          emit('update:visible', false)
          loginModalVisible.value = true
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    }
    return {
      login,
      register,
      loginModalVisible,
      loading
    }
  }
})
</script>

<style lang=scss>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  left: 0;
  top: 0;
  z-index: 10;
}
.login-modal {
  position: fixed;
  top: 45%;
  left: 23px;
  right: 23px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  /* box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.12);  */
  padding: 20px;
  z-index: 100;
  transform: translate(0, -50%);
  .title {
    position: relative;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    .nut-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }
  }
  .logo {
    height: 164px;
    margin-top: 56px;
    background-size: auto 100%;
    background-position: center 0;
  }
  .fun {
    width: 210px;
    height: 90px;
    margin: 16px 0 25px;
  }
}
</style>