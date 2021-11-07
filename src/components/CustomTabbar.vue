<template>
  <div class="tab-bar">
    <div class="tab-bar-border"></div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      :data-path="item.pagePath"
      :data-index="index"
      @tap="switchTab"
    >
      <!-- <image v-show="selected === index" class="img-active" src="../assets/imgs/tabBar/active.png" alt="" /> -->

      <div class="tab-bar-item-select">
        <image :src="selected === index ? item.selectIcon : item.icon" alt="" class="img" />
        <div :class="{ selected: selected === index }" class="title f12">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { Tabbar, TabbarItem } from '@nutui/nutui-taro'
import { reactive, toRefs } from 'vue'

export default {
  name: 'CustomTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    selected: {
      type: Number,
      default: -1
    }
  },
  setup(props: any) {
    const state = reactive({
      color: '#868686',
      selectedColor: '#181818',
      list: [
        {
          title: '首页',
          icon: require('@/assets/imgs/tabBar/d1.png'),
          selectIcon: require('@/assets/imgs/tabBar/s1.png'),
          pagePath: '/pages/index/index'
        },
        {
          title: '我的',
          icon: require('@/assets/imgs/tabBar/d3.png'),
          selectIcon: require('@/assets/imgs/tabBar/s3.png'),
          pagePath: '/pages/user/Index'
        }
      ]
    })

    const switchTab = (e: any) => {
      const data = e.currentTarget.dataset
      const url = data.path
      // eslint-disable-next-line vue/no-mutating-props
      // props.selected = data.index
      Taro.switchTab({
        url
      })
    }

    return {
      ...toRefs(state),
      switchTab
    }
  }
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 58px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  // background: url('~@/assets/imgs/tabBar/active.png') no-repeat center;
  // background-size: 80px 80px;
  // background-position: -40px 0 0 0;
}
.tab-bar-item-select {
  position: absolute;
  .img {
    width: 23px;
    height: 23px;
  }
}
.img-active {
  position: absolute;
  top: -10px;
  height: 80px;
  width: 80px;
}
.title {
  color: #868686;
}
.selected {
  font-weight: 600;
  color: #181818;
}
</style>
