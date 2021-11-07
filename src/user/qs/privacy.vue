<template>
  <div class="page">
    <div>
      <div v-if="privacy" class="section">
        <h3 class="f17 mb16">隐私政策条款</h3>
        <p>最近更新日期：{{ privacy.update_date }}</p>
        <p class="">本政策适用于：</p>
        <p v-for="(item, idx) in privacy.target_condition" :key="idx">{{ item }}</p>
        <p class="privacy-content">本政策帮助你了解一下内容：</p>
        <p v-for="(item, idx) in privacy.privacy_content" :key="idx">{{ idx + 1 }}、{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Taro from '@tarojs/taro'
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Button, Icon } from '@nutui/nutui-taro'
import { UserApi } from '@/api/modules'

export default defineComponent({
  name: 'Privacy',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  setup() {
    const activeName = ref(1)
    const state = reactive({
      privacy: {}
    })
    onMounted(() => {
      getData()
    })
    const getData = () => {
      UserApi.privacyQuery().then((res) => {
        state.privacy = res
      })
    }
    return {
      activeName,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss">
$bgcolor: #f2efeb;
$color-primary: #3f5660;
.page {
  height: 100vh;
  padding: 15px;
  background: #f9f9f9;
  box-sizing: border-box;
  overflow-y: auto;
}
.no-login {
  text-align: center;
  padding: 0 23px;
  height: 100%;
  display: flex;
  align-items: center;
  .empty {
    width: 136px;
    height: 119px;
    margin-top: 60px;
  }
  .nut-button {
    margin-top: 66px;
  }
}
.section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  h3 {
    color: #d79347;
    padding-bottom: 16px;
    border-bottom: 1px solid #dcdcdc;
  }
  p {
    line-height: 1.5;
    font-size: 15px;
    color: #666;
    padding: 0 15px 15px;
    // margin-bottom: 15px;
  }
  .privacy-content {
    border-top: 1px dashed #dcdcdc;
    padding-top: 15px;
  }
}
</style>
