<template>
  <div class="page">
    <div>
      <!-- <div class="section">
      </div> -->
      <p class="title color-primary f15">月川手环</p>
      <nut-collapse v-model:active="activeName" class="collapse" :accordion="true" icon="down-arrow">
        <nut-collapse-item v-for="(item, idx) in problem.bracelet" :key="idx" :title="item.q" :name="idx"
        >{{ item.a }}
        </nut-collapse-item>
      </nut-collapse>
      <p class="title color-primary f15">月宇宙小程序</p>
      <nut-collapse v-model:active="activeName" class="collapse" :accordion="true" icon="down-arrow">
        <nut-collapse-item v-for="(item, idx) in problem.wechat" :key="idx" :title="item.q" :name="idx"
        >{{ item.a }}
        </nut-collapse-item>
      </nut-collapse>
      <p class="title color-primary f15">其他</p>
      <nut-collapse v-model:active="activeName" class="collapse" :accordion="true" icon="down-arrow">
        <nut-collapse-item v-for="(item, idx) in problem.bracelet" :key="idx" :title="item.q" :name="idx"
          >{{ item.a }}
        </nut-collapse-item>
      </nut-collapse>
    </div>
  </div>
</template>

<script lang="ts">
// import Taro from '@tarojs/taro'
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Button } from '@nutui/nutui-taro'
import { UserApi } from '@/api/modules'

export default defineComponent({
  name: 'Qs',
  components: {
    [Button.name]: Button
  },
  setup() {
    const activeName = ref([1])
    const state = reactive({
      problem: {}
    })
    onMounted(() => {
      getData()
    })
    const getData = () => {
      UserApi.problemQuery().then((res) => {
        state.problem = res
      })
    }
    return {
      activeName,
      ...toRefs(state)
    }
  },
  methods: {}
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
}
.title {
  color: $color-primary;
  font-weight: bold;
}
.collapse {
  overflow: hidden;
  margin: 10px 0 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
}
</style>
