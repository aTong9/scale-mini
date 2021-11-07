<template>
  <view>
    <view>
      <nut-button type="primary" @click="handleClick()">订单列表</nut-button>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent } from 'vue';
import { Button } from '@nutui/nutui-taro';

export default defineComponent({
  name: 'Order',
  components: {
    [Button.name]: Button
  },
  setup () {
    const handleClick = () => {
      console.log('Order', Taro, process.env)
    };
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss">
</style>
