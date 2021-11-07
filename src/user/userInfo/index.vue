<template>
  <div class="page">
    <div v-if="state.userInfo">
      <div class="avatar">
        <image class="avatar-img" :src="state.avatarImg" @tap="uploaderImg" />
        <p class="f15 color-primary mb20">点击头像更换照片</p>
      </div>
      <div class="section">
        <div class="info-item flex-h-c">
          <span class="title">昵称</span>
          <div class="flex-h-c">
            <input
              type="text"
              :value="formItem.nick_name"
              @blur="
                (e) => {
                  userUpdate(e, 'user_nickname')
                }
              "
            />
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
        <div class="info-item flex-h-c" @click="change('user_gender')">
          <span class="title">性别</span>
          <div class="flex-h-c">
            <span class="input-color">{{ getSexStr(formItem.user_gender) }}</span>
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
        <div class="info-item flex-h-c" @click="change('user_birthday')">
          <span class="title">生日</span>
          <div class="flex-h-c">
            <span class="input-color">{{ `${years[birthday[0]]}-${months[birthday[1]]}-${days[birthday[2]]}` }}</span>
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
        <div class="info-item flex-h-c">
          <span class="title">手机号</span>
          <div class="flex-h-c">
            <input
              type="text"
              :value="formItem.user_phone"
              @blur="
                (e) => {
                  userUpdate(e, 'user_phone')
                }
              "
            />
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
        <div class="info-item flex-h-c" @click="change('user_height')">
          <span class="title">身高</span>
          <div class="flex-h-c">
            <span class="input-color">{{ heights[height] }}</span>
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
        <div class="info-item flex-h-c" @click="change('user_weight')">
          <span class="title">体重</span>
          <div class="flex-h-c">
            <span class="input-color">{{ weights[weight] }}</span>
            <image class="right-icon" src="@/assets/imgs/right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <nut-popup v-model:visible="popupVisible" position="bottom" round :style="{ height: '35%' }">
      <div class="popup-title">
        <span @click="popupVisible = false">取消</span>
        <span @click="pickConfirm">确定</span>
      </div>
      <picker-view
        :value="pickerType === 'user_birthday' ? birthday : state.pickerValue"
        indicator-class="picker-item"
        class="date-picker-view"
        @change="onPickChange"
      >
        <template v-if="pickerType === 'user_birthday'">
          <picker-view-column>
            <view v-for="(item, index) in years" :key="index" class="picker-item">{{ item }}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item, index) in months" :key="index" class="picker-item">{{ item }}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item, index) in days" :key="index" class="picker-item">{{ item }}</view>
          </picker-view-column>
        </template>
        <template v-else>
          <picker-view-column>
            <view v-for="(item, index) in state.pickerList" :key="index" class="picker-item">{{ item }}</view>
          </picker-view-column>
        </template>
      </picker-view>
    </nut-popup>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { UserApi } from '@/api/modules'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import md5 from 'js-md5'
import dayjs from 'dayjs'
import Http from '@/api/http'

const store = useStore()
const apiAction = UserApi.userAvatar
const API_CODE = 'B759F724AA7A840F878CD16C3861AC89'
// const updateAvatar = process.env.TARO_P_API + '/api/user/user/user_avatar'
// config.url.replace(process.env.TARO_P_API,'http://39.107.67.8:5050')
const updateAvatar = 'http://39.107.67.8:5050/api/user/user/user_avatar'

const headers = {
  cookie: store.state.sessionId,
  user_token: store.state.token,
  api_token: store.state.token
    ? md5(`${store.state.token}${updateAvatar}${dayjs().format('YYYY-MM-DD')}${API_CODE}`)
    : ''
}

const formItem = reactive({
  nick_name: '',
  // "user_gender": 性别：0未知，1男性，2女性,
  user_gender: 2,
  user_birthday: '',
  user_phone: '',
  user_height: 0,
  user_weight: 0
})
const popupVisible = ref(false)
const pickerType = ref('')
const date = new Date()
const years: number[] = []
const months: number[] = []
const days = ref<number[]>([])
const startYearIndex = 50
const birthday = ref([startYearIndex, 0, 0])

for (let i = 1940; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
const daysCount = new Date(years[startYearIndex], 0, 0).getDate()
for (let i = 1; i <= daysCount; i++) {
  days.value.push(i)
}
const heights: string[] = []
let height = ref([-1])
for (let i = 40; i <= 249; i++) {
  heights.push(`${i}cm`)
}

const weights: string[] = []
let weight = ref([-1])
for (let i = 30; i <= 249; i++) {
  weights.push(`${i}kg`)
}
const state = reactive({
  userInfo: null,
  avatarImg: [] as any,
  pickerValue: [1],
  pickerList: [] as any
})
const getSexStr = (sex: number) => {
  const sexStr = {
    0: '未知',
    1: '男',
    2: '女'
  }
  return sexStr[sex]
}
onMounted(() => {
  getData()
})
const getData = () => {
  UserApi.userQuery().then((res: any) => {
    state.userInfo = res
    Object.assign(formItem, {
      ...res
    })
    const userBirthday: any = formItem.user_birthday.split('-')
    years.map((i: any, idx: number) => {
      if (i === parseInt(userBirthday[0])) {
        birthday.value[0] = idx
      }
    })
    months.map((i: any, idx: number) => {
      if (i === parseInt(userBirthday[1])) {
        birthday.value[1] = idx
      }
    })
    days.value.map((i: any, idx: number) => {
      if (i === parseInt(userBirthday[2])) {
        birthday.value[2] = idx
      }
    })
    heights.map((i: any, idx: number) => {
      if (parseInt(i.slice(0, -2)) === res.user_height) {
        height.value = [idx]
      }
    })
    weights.map((i: any, idx: number) => {
      if (parseInt(i.slice(0, -2)) === res.user_weight) {
        weight.value = [idx]
      }
    })
    state.avatarImg = res.avatar_url
  })
}
// 初始化picklist
const change = (type: string) => {
  let setPickerValue: any = null
  pickerType.value = type
  popupVisible.value = true
  // state.pickerValue = []
  // state.pickerList = []
  switch (type) {
    case 'user_gender':
      state.pickerList = ['未知', '男', '女']
      setPickerValue = [formItem.user_gender]
      break
    case 'user_birthday':
      birthday.value = [...birthday.value]
      // setPickerValue = [...birthday.value]
      break
    case 'user_height':
      state.pickerList = heights
      setPickerValue = height.value || [120]
      break
    case 'user_weight':
      state.pickerList = weights
      setPickerValue = weight.value || [20]
      break
  }
  setTimeout(() => {
    // if (type !== 'user_birthday') {
    //   state.pickerValue = setPickerValue
    // }
    state.pickerValue = setPickerValue
  }, 50)
  console.log('change====birthday', birthday.value)
  console.log('pickerValue', state.pickerValue)
}
const selectvalue: any = ref([])
const onPickChange = (e: any) => {
  if (pickerType.value === 'user_birthday') {
    birthday.value = e.detail.value
  } else {
    selectvalue.value = e.detail.value
  }
  // selectvalue.value = e.detail.value
  console.log('pickConfirm===onPickChange', e)
}
let submitVal: any = ref(null)
const pickConfirm = () => {
  state.pickerValue = selectvalue.value
  console.log('pickConfirm1', birthday.value, selectvalue.value)
  if (pickerType.value === 'user_gender') {
    formItem.user_gender = state.pickerValue[0]
    submitVal = formItem.user_gender
  } else if (pickerType.value === 'user_birthday') {
    // birthday.value = state.pickerValue
    submitVal = `${years[birthday.value[0]]}-${months[birthday.value[1]]}-${days.value[birthday.value[2]]}`
  } else if (pickerType.value === 'user_height') {
    height.value = state.pickerValue
    submitVal = state.pickerList[height.value[0] || 120]?.slice(0, -2)
  } else if (pickerType.value === 'user_weight') {
    weight.value = state.pickerValue
    submitVal = state.pickerList[weight.value[0] || 20]?.slice(0, -2)
  }
  console.log('pickConfirm2', state.pickerValue, submitVal)
  userUpdate(submitVal, pickerType.value)
  popupVisible.value = false
}
const uploaderImg = () => {
  Taro.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      uploadFile(res.tempFilePaths)
    }
  })
}
const uploadFile = (tempFilePaths: any) => {
  Taro.uploadFile({
    url: updateAvatar, //仅为示例，非真实的接口地址
    filePath: tempFilePaths[0],
    name: 'file',
    header: headers,
    formData: {
      ...headers,
      ...formItem
    },
    success(res) {
      // const data = res.data
      console.log(res.data)
      getData()
      //do something
    }
  })
}
const userUpdate = (e: any, type: string) => {
  let params: any = {}
  switch (type) {
    case 'user_nickname':
    case 'user_phone':
      params[type] = e.detail.value
      break
    case 'user_birthday':
    case 'user_gender':
    case 'user_height':
    case 'user_weight':
      params[type] = e
      break
  }
  console.log('params=======', params)
  Http.get(`/api/user/user/${type}`, params).then(() => {
    getData()
  })
}
</script>

<style lang="scss">
$bgcolor: #f2efeb;
$input-color: #8ba6b1;
.input-color {
  color: $input-color;
  font-size: 15px;
}
.page {
  background: #f9f9f9;
  height: 100vh;
  padding: 0 15px 15px;
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
.avatar {
  text-align: center;
  .avatar-img {
    margin: 36px auto 10px;
    border-radius: 100%;
    border: 4px solid #fff;
    height: 82px;
    width: 82px;
  }
}
.section {
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  h3 {
    color: #d79347;
    padding-bottom: 16px;
    border-bottom: 1px solid $bgcolor;
  }
  p {
    line-height: 1.5;
  }
}
.info-item {
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid $bgcolor;
  .title {
    font-weight: 600;
    font-size: 15px;
    color: #3f5660;
  }
  &:last-child {
    border-bottom: none;
  }
  input {
    width: 200px;
    text-align: right;
    color: $input-color;
    font-size: 15px;
  }
  .right-icon {
    height: 38px;
    width: 32px;
  }
}
.picker-item {
  display: flex;
  height: 40px;
  color: #333333;
  // font-weight: 500;
  font-size: 15px;
  align-items: center;
  justify-content: center;
}
.date-picker-view {
  margin-top: 40px;
  width: 100%;
  height: 140px;
  z-index: 10;
}
.popup-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 14px;
  color: #3f5660;
}
</style>
