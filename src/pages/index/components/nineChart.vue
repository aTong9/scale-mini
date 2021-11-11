<template>
  <div :id="props.id" class="chart" :style="{ maxWidth: '100vw', height: props.height + 'px' }"></div>
</template>
<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core'
import Highcharts from 'highcharts'
import exporting from 'highcharts/modules/exporting'
import variablePie from 'highcharts/modules/variable-pie'
exporting(Highcharts)
variablePie(Highcharts)

const props = defineProps({
  // 图表类型
  type: {
    type: String,
    default: 'line'
  },
  title: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: 'myChart'
  },
  width: {
    type: Number,
    default: 315
  },
  height: {
    type: Number,
    default: 140
  },
  data: {
    type: [] as any,
    required: false
  },
  tooltip: {
    type: Object,
    required: false
  }
})
onMounted(() => {
  const x: any[] = []
  // const data: any[] = []
  // props.data.forEach((item: any) => {
  //   x.push(item.key)
  //   data.push(item.value)
  // })
  const data = props.data.map((item: any) => {
    // console.log('item', item)
    return {
      name: item.key,
      y: item.value
    }
    // x.push(item.key)
    // data.push(item.value)
  })
  // configChart({ data, time })
  configChart({
    data,
    x
  })
})
const configChart = (data: any) => {
  console.log('data', data)
  // console.log('props.data', data, props.data)
  let chart: any = null
  chart = (Highcharts as any).chart(props.id, {
    credits: {
      enabled: false
    },
    chart: {
      type: 'variablepie'
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    // colors: ['#69C3EE'],
    series: [
      {
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        data: data.data
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.chart {
  background: #fff;
}
</style>
