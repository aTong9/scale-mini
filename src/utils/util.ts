/**
 * @param str
 * 换成小写
 */
export const toLowerCase = (str: string): any => {
  if (str !== '') return str.toLocaleLowerCase()
}
/**
 *
 * @param str
 * 转成大写
 */
export const toUpperCase = (str: string): any => {
  if (str !== '') return str.toLocaleUpperCase()
}

/**
 * 获取某范围数字数组
 */
export const rangeNumbers = (start: any, end: any) => {
  return Array(end - start + 1)
    .fill(0)
    .map((v, i) => i + start)
}
/*
 * 保留两位小数
 * */
export const KeepTwoFloat = (num: number): any => {
  const _num = Math.round(num * 100) / 100
  const _arr = _num.toString().split('.')
  if (_arr.length === 1) {
    return _num.toString() + '.00'
  }
  if (_arr.length > 1) {
    if (_arr[1].length < 2) {
      return _num.toString() + '0'
    }
    return _num.toString()
  }
}
/*
 * 判断空值
 * */
export const isEmpty = (keys: any) => {
  if (typeof keys === 'string') {
    keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
    if (keys === '' || keys === null || keys === 'null' || keys === 'undefined') {
      return true
    } else {
      return false
    }
  } else if (typeof keys === 'undefined') {
    // 未定义
    return true
  } else if (typeof keys === 'number') {
    return false
  } else if (typeof keys === 'boolean') {
    return false
  } else if (typeof keys === 'object' && !Array.isArray(keys)) {
    if (JSON.stringify(keys) === '{}') {
      return true
    } else if (keys === null) {
      // null
      return true
    } else {
      return false
    }
  } else if (keys instanceof Array && keys.length === 0) {
    return true
  } else {
    return false
  }
}
/*
 * 返回两位小数
 * */
export const getTwoFixedNum = (num: number) => {
  return Number(num).toFixed(2)
}

// 获取网络图片宽高
export const getImgDesc = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      resolve(img)
    }
  })
}

export const dateFileName = (fileName: string) => {
  const date = new Date()
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  // 选择多图片时，有可能在一秒内上传2张文件，如果只精确到秒，则会出现重名，导致两张图片一样。加上毫秒。 2019.09.04 gehaiqing
  const ms = date.getMilliseconds()
  const fileUrl = fileName.split('.')
  return `${Y}${M}${D}/${Y}${M}${D}${h}${m}${s}${ms}.${fileUrl[fileUrl.length - 1]}`
}
export const parseParams = (ojson: any) => {
  let s: any = ''
  let name: any = ''
  let key: any = ''
  if (ojson) {
    for (const p of Object.keys(ojson)) {
      // if (!ojson[p]) { return null }
      if (ojson.hasOwnProperty(p)) {
        name = p
      }
      key = ojson[p]
      s += '&' + name + '=' + encodeURIComponent(key)
    }
  }
  return s.substring(1, s.length)
}

export const initCallBack = (init: any, callBack: (init: any) => any) => {
  if (typeof init !== null && typeof init !== 'undefined' && !!init) {
    callBack(init)
  }
}

export const isDef = (value: any): boolean => {
  return value !== undefined && value !== null && value !== ''
}
export const isObj = (x: any): boolean => {
  const type = typeof x
  return x !== null && type === 'object'
}
/**
 * 生成随机数
 * @param num
 */
export const randomStr = (num: number = 18): string => {
  const sourceStr =
    '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,' +
    'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'
  const sourceStrList = sourceStr.split(',')
  let str = ''
  let index = -1
  for (let i = 0; i < num; i++) {
    index = Math.floor(Math.random() * sourceStrList.length)
    str += sourceStrList[index]
  }
  return str
}

/*
 * 计算时间差(小时、分钟)
 * @param dateDiff:时间差的毫秒数
 * */
export const timeFn = (dateDiff: number) => {
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
  const leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)) // 计算出小时数
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  // console.log(' 相差 ' + dayDiff + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒')
  // console.log(dateDiff + '时间差的毫秒数', dayDiff + '计算出相差天数', leave1 + '计算天数后剩余的毫秒数'
  //   , hours + '计算出小时数', minutes + '计算相差分钟数', seconds + '计算相差秒数')
  if (dayDiff === 1) {
    return parseFloat((24 + hours + minutes / 60).toFixed(2))
  } else if (dayDiff === 2) {
    return 48
  } else {
    return parseFloat((hours + minutes / 60).toFixed(2))
  }
}
/*
 * 返回时间时分秒
 * @param duration:时间秒数
 * */
export const durationFormat = (duration: number): string => {
  const H = Math.floor(duration / 3600)
  const M = Math.floor((duration % 3600) / 60)
  const S = Math.floor((duration % 3600) % 60)
  let h = H > 9 ? H.toString() : '0' + H.toString()
  let m = M > 9 ? M.toString() : '0' + M.toString()
  let s = S > 9 ? S.toString() : '0' + S.toString()
  return h + ':' + m + ':' + s
}
/*
 * 返回时间时分秒
 * @param duration:时间秒数
 * */
export const Weekday = (type: 'D' | 'W' | 'Y' | 'M' = 'M', isWork: boolean = false): any[] => {
  // D day, W week, Y year, M month // 默认一周 isWork 工作日
  enum DateType {
    D = 1,
    W = 7,
    M = 30,
    Y = 365
  }
  const now = new Date() // 时间
  let length = DateType[type]
  //获取系统当前时间
  const nowTime = now.getTime()
  const oneDayTime = 24 * 60 * 60 * 1000
  let Days = []

  for (let i = 0; i < length; i++) {
    //显示周一
    const ShowTime = nowTime + i * oneDayTime
    //初始化日期时间
    const myDate = new Date(ShowTime) //
    const year = myDate.getFullYear()
    const month = myDate.getMonth() + 1
    const date = myDate.getDate()
    const str = '周' + '日一二三四五六'.charAt(myDate.getDay())
    if (isWork && (myDate.getDay() === 6 || myDate.getDay() === 0)) {
      length++
    } else {
      Days.push({
        date: `${month > 9 ? month : '0' + month}.${date > 9 ? date : '0' + date}`,
        week: str,
        year: year,
        month: `${month > 9 ? month : '0' + month}`,
        day: `${date > 9 ? date : '0' + date}`
      })
    }
  }
  return Days
}
/*
 * 返回年月日
 * @param
 * */
export const Timedays = (year: number, month: any) => {
  year = year - 0
  month = month - 0
  // D day, Y year, M month //
  let dateObj: any = {
    year: [],
    month: [],
    day: []
  }
  const DateTime = new Date() // 获取当前时间
  const FullYear = DateTime.getFullYear()
  for (let i = 0; i < 100; i++) {
    const num = FullYear - i + ''
    dateObj.year.push(num)
  }
  for (let s = 1; s <= 12; s++) {
    const str = s < 10 ? '0' + s : s + ''
    dateObj.month.push(str)
  }
  //是否是闰年
  const isLeapYear = (year: number) => {
    if (year / 4 == 0 && year / 100 !== 0) {
      return true
    } else if (year / 400 === 0) {
      return true
    } else {
      return false
    }
  }
  let days = 30
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31
      break
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30
      break
    case 2:
      days = isLeapYear(year) ? 29 : 28
      break
  }
  for (let d = 1; d <= days; d++) {
    const dstr = d < 10 ? '0' + d : d + ''
    dateObj.day.push(dstr)
  }
  return dateObj
}
/**
 * 获取富文本中的文字
 * @param html 富文本
 * @since 2020.06.15
 */
export function getHtmlText (html: string) {
  if (html) {
    const el = document.createElement('div')
    el.innerHTML = html
    return el.textContent
  } else {
    return ''
  }
}

/**
 * 16进制转buffer
 * @param hex 16进制字符串
 * @returns 
 */
export function hexToBuffer (hex: string) {
  var typedArray = new Uint8Array((hex.match(/[\da-f]{2}/gi) || []).map(function (h) {
      return parseInt(h, 16);
  }))
  var buf = typedArray.buffer;
  return buf;
}

export function ab2hex(buffer: ArrayBuffer): string {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

export function num2hex(num: number) {
  return ('00' + num.toString(16)).slice(-2)
}

export function hex2Array(hex: string) {
  return hex.match(/[\da-f]{2}/gi) || []
}