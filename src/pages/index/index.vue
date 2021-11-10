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
    <view ref="container" class="container">
      <view>
        <view
          v-for="(item, idx) in state.messageList"
          :key="idx"
          :class="{ 'message-right': item.type === 'right' }"
          class="message"
        >
          <view class="message-con">
            <!-- {{ item.msg }} -->
            <span v-html="item.msg"></span>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="answer-group">
        <view v-if="state.classifyVisible" class="classify-group">
          <p class="title">小测的技能分类</p>
          <view class="classify">
            <view v-for="(item, idx) in state.classify" :key="idx" class="classify-item" @click="classifyClick(item)">
              <nut-icon :name="item.icon" color="#1890ff" size="30px" />
              <view>{{ item.title }}</view>
            </view>
          </view>
        </view>
        <view v-if="state.scaleListVisible" class="scaleList-group">
          <p class="title" @click="scaleListBack"><nut-icon name="left" /> <span>你可以这么测</span></p>
          <view class="scaleList">
            <view v-if="state.classifyList">
              <view
                v-for="(item, idx) in state.classifyList[0]"
                :key="idx"
                class="answer-item"
                @click="scaleListClick(item)"
              >{{ item }}</view
              >
            </view>
          </view>
        </view>
        <view v-if="state.answerItemVisible" class="answer-item-group">
          <view v-if="state.answerItemList">
            <view
              v-for="(item, idx) in state.answerItemList"
              :key="idx"
              class="answer-item"
              @click="answerItemClick(item, idx)"
            >{{ item }}</view
            >
          </view>
        </view>
      </view>
      <view class="send-group">
        <input type="text" class="send-msg" />
        <span><nut-icon name="category" color="#1890ff" /></span>
      </view>
    </view>
    <!-- <CustomTabbar :selected="0" /> -->
  </view>
</template>

<script lang="ts" setup>
// http://www.360doc.com/content/13/0120/09/7223599_261313418.shtml
// https://m.haodf.com/neirong/wenzhang/5271440951.html
import Taro from '@tarojs/taro'
import { reactive, computed, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import LoginModal from '../../components/LoginModal.vue'
import classifyJson from './classify.json'
import scaleJson from './index.json'

const store = useStore()
const container: any = ref(null)
const Nine = reactive({
  ping: 0,
  qixu: 0,
  yang: 0,
  yin: 0,
  tan: 0,
  shi: 0,
  pi: 0,
  qiyu: 0,
  te: 0
})
const state = reactive({
  msg: '首页',
  fileUrl: 'http://39.107.67.8:5050/static/img/',
  scaleList: null,
  classifyList: null,
  answerGroupVisible: false,
  classifyVisible: true,
  scaleListVisible: false,
  answerItemVisible: false,
  answerItemList: null,
  answerIndex: -1,
  isQuestion: false,
  isAnswer: false,
  resultNumArr: [] as any,
  classify: [
    {
      icon: 'message',
      title: '情感'
    },
    {
      icon: 'joy-smile',
      title: '性格'
    },
    {
      icon: 'people',
      title: '职场'
    },
    {
      icon: 'addfollow',
      title: '健康'
    },
    {
      icon: 'link',
      title: '人际'
    },
    {
      icon: 'footprint',
      title: '亲子'
    },
    {
      icon: 'fabulous',
      title: '能力'
    }
  ],
  messageList: [
    {
      type: 'left',
      msg: '嗨，我是小测，您身边的智能测试管家'
    },
    {
      type: 'left',
      msg: `我学习收集了上万本书籍、上万篇医学量表、千万份临床量表和学术论文，掌握了很多专业的量表。<br/>我已经掌握了以下技能，请问有什么可以帮助您？`
    }
  ]
})
// const getNumbers = computed(() => store.getters.getNumbers)
const classifyClick = (item: any) => {
  state.classifyVisible = false
  state.scaleListVisible = true
}
const scaleListBack = (item: any) => {
  state.classifyVisible = true
  state.scaleListVisible = false
}
const scaleListClick = (item: any) => {
  console.log('scaleListClick', item)
  state.classifyVisible = false
  state.scaleListVisible = false
  state.answerItemVisible = true
  state.isQuestion = true
  state.answerIndex++
  // state.isAnswer = false
  // state.messageList.push({
  //   type: 'left',
  //   msg: state.scaleList[state.answerIndex].q
  // })
  // state.answerItemList = state.scaleList[state.answerIndex].a
}
watch(
  () => state.answerIndex,
  (index: number) => {
    console.log('watch==index', index, container.value)
    // if (state.isQuestion) {
    state.messageList.push({
      type: 'left',
      msg: state.scaleList.nine[index]
    })
    // }
    // 没有=1分; 很少= 2分; 有时=3分; 经常=4分; 总是=5分
    state.answerItemList = ['没有', '很少', '有时', '经常', '总是']
    // scrollToBottom()
  }
)
const answerItemClick = (item: any, index: number) => {
  state.resultNumArr.push(index + 1)
  console.log('answerItemClick', item, index, state.scaleList.nine.length, state.resultNumArr)
  state.isQuestion = false
  state.messageList.push({
    type: 'right',
    msg: item
  })
  if (state.resultNumArr.length === state.scaleList.nine.length) {
    // 最后一道题
    state.classifyVisible = false
    state.scaleListVisible = false
    state.answerItemVisible = false
    const result: any = state.resultNumArr
    Nine.ping = handleResultNum('1+2*+7*+8*+22*+53+54*')
    Nine.qixu = handleResultNum('2+3+4+5+6+7+23+27')
    Nine.yang = handleResultNum('18+19+20+22+23+52+55')
    Nine.yin = handleResultNum('17+21+29+35+38+44+46+57')
    Nine.tan = handleResultNum('14+16+28+42+49+50+51+58')
    Nine.shi = handleResultNum('39+41+48+56+57+59+60')
    Nine.pi = handleResultNum('33+36+37+40+43+44+45')
    Nine.qiyu = handleResultNum('9+10+11+12+13+15+47')
    Nine.te = handleResultNum('24+25+26+30+31+32+34')
    console.log('Nine=====', Nine)
    // Nine.ping =
    //   result[0] +
    //   handleReverse(result[0]) +
    //   handleReverse(result[6]) +
    //   handleReverse(result[7]) +
    //   handleReverse(result[21]) +
    //   result[52] +
    //   handleReverse(result[53])
    return
  }
  state.answerIndex++
}
const handleReverse = (num: number) => {
  // 处理逆向分 2\7\8\22\54
  let resultNum = 0
  switch (num) {
    case 1:
      resultNum = 5
      break
    case 2:
      resultNum = 4
      break
    case 3:
      resultNum = 3
      break
    case 4:
      resultNum = 2
      break
    case 5:
      resultNum = 1
      break
  }
  return resultNum
}
const handleResultNum = (result: string) => {
  const resultArr = result.split('+')
  let resultNum1 = 0
  let resultNum2 = 0
  for (let i = 0; i < resultArr.length; i++) {
    if (resultArr[i].indexOf('*') > 0) {
      const curQ = +resultArr[i].slice(0, -1)
      resultNum1 += handleReverse(state.resultNumArr[curQ - 1])
      console.log('resultNum1', resultNum1)
    } else {
      resultNum2 += state.resultNumArr[+resultArr[i] - 1]
      console.log('resultNum2', resultNum2)
    }
    // return resultNum
  }
  console.log('resultNum=====', resultNum1 + resultNum2)
  return resultNum1 + resultNum2
}
onMounted(() => {
  state.scaleList = scaleJson
  state.classifyList = classifyJson
  console.log('scaleJson', state.scaleList, state.classifyList)
  // Taro.setNavigationBarColor({
  //   frontColor: '#ffffff',
  //   backgroundColor: '#333131'
  // })
})
// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    container.value.scrollTop = 99999
  }, 10)
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
    .classify-group {
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .classify {
        display: flex;
        flex-flow: wrap;
        margin-bottom: 15px;
        &-item {
          text-align: center;
          width: 25%;
          font-size: 16px;
          display: inline-block;
          margin-top: 15px;
        }
      }
    }
    .scaleList-group {
      .title {
        display: flex;
        align-items: center;
      }
    }

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
