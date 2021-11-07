<template>
  <div class="page">
    <view>
      <nut-overlay v-model:visible="overlayVisible" :z-index="2000">
        <view class="no-login">
          <div class="empty">
            <image class="empty-img" src="@/assets/imgs/no-logo.png" />
            <!-- <p class="color999 f20 mt20">暂无内容</p> -->
            <LoginModal />
          </div>
        </view>
      </nut-overlay>
      <view class="userinfo-group">
        <view class="user" @click="goPage('/user/userInfo/index')">
          <view class="flex-h-c">
            <view class="user-avatar">
              <image v-if="userInfo && userInfo.avatar_url" class="avatar" :src="userInfo.avatar_url" />
              <image v-else class="avatar" src="@/assets/imgs/user/avatar.png" />
              <image class="edit" src="@/assets/imgs/user/edit.png" />
            </view>
            <view v-if="userInfo" class="user-info">
              <p class="f17 colorfff bold">{{ userInfo.nick_name }}</p>
              <p v-if="userInfo.user_birthday" class="f15 colorfff">{{ userInfo.user_birthday }}</p>
            </view>
          </view>
          <image src="@/assets/imgs/right.png" class="right" />
        </view>
      </view>

      <view class="nav-list-group">
        <view v-for="(item, idx) in list" :key="idx" class="nav-list flex-h-c" @click="goPage(item.url)">
          <view class="flex-h-c">
            <image class="icon" :src="item.icon" />
            <span class="f15 color-primary title">{{ item.title }}</span>
          </view>
          <image src="@/assets/imgs/right.png" class="right" />
        </view>
      </view>
    </view>
    <CustomTabbar :selected="2" />
  </div>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { Button, Cell, Icon } from '@nutui/nutui-taro'
import CustomTabbar from '../../components/CustomTabbar.vue'
import { UserApi } from '@/api/modules'
import { useStore } from 'vuex'
import LoginModal from '../../components/LoginModal.vue'
import store from '@/store'

export default defineComponent({
  name: 'User',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    CustomTabbar,
    LoginModal
  },
  setup() {
    const store = useStore()
    let isLogin = ref(true)
    let state = reactive({
      userInfo: null,
      overlayVisible: false,
      list: [
        {
          title: '常见问题',
          icon: require('@/assets/imgs/user/qs.png'),
          url: '/user/qs/index'
        },
        {
          title: '隐私协议',
          icon: require('@/assets/imgs/user/ys.png'),
          url: '/user/qs/privacy'
        }
      ]
    })
    onMounted(() => {
      // getData()
      Taro.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#333131'
      })
    })
    watch(
      () => store.getters.isLogin,
      (val: any) => {
        console.log('store.getters.isLogin===', val)
        if (val) {
          state.overlayVisible = false
          setTimeout(() => {
            getData()
          }, 0)
        } else {
          state.overlayVisible = true
        }
      },
      { immediate: true }
    )
    const getData = () => {
      UserApi.userQuery().then((res) => {
        state.userInfo = res
      })
    }
    const goPage = (url: string) => {
      if (store.getters.isLogin) {
        Taro.navigateTo({
          url
        })
      } else {
        state.overlayVisible = true
      }
    }
    return {
      isLogin,
      ...toRefs(state),
      getData,
      goPage
    }
  },
  methods: {
    noLoginStart() {
      // TODO: 登陆弹窗
    }
  },
  onShow() {
    if (store.getters.isLogin) {
      this.getData()
    }
  }
})
</script>

<style lang="scss">
$bgcolor: #dcdcdc;
.login-modal-page {
  // display: flex;
  // align-items: center;
  text-align: center;
  line-height: 88vh;
}
.page {
  background: #f9f9f9;
  height: 100vh;
  // background: linear-gradient(155deg, #b8e4f8, #fdf1b3);
  box-sizing: border-box;
  overflow-y: auto;
}

.no-login {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  margin: auto;
  width: 340px;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  .empty {
    background-color: #fff;
    border-radius: 12px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .empty-img {
    width: 81px;
    height: 135px;
    margin-top: 45px;
  }
  .nut-button {
    margin-top: 45px;
  }
}

section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
}
.right {
  height: 38px;
  width: 32px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  &-avatar {
    position: relative;
    color: #fff;
    .avatar {
      width: 72px;
      height: 72px;
      border-radius: 100%;
      border: 2px solid #c8d3d8;
      margin-right: 19px;
    }
    .edit {
      position: absolute;
      right: 7px;
      bottom: -10px;
      height: 44px;
      width: 44px;
    }
  }
}
.nav-list-group {
  margin: -45px 15px 0;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  .nav-list {
    justify-content: space-between;
    border-bottom: 1px solid #f2efeb;
    padding: 15px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    .icon {
      height: 16px;
      width: 16px;
    }
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-left: 8px;
    }
  }
}

.userinfo-group {
  padding-bottom: 60px;
  background: #333131;
}
</style>
