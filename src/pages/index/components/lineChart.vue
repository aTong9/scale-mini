<template>
  <div :id="props.id" class="chart" :style="{ maxWidth: '100vw', height: props.height + 'px' }"></div>
</template>
<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core'
import Highcharts from 'highcharts'

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
  console.log('props.data', props.data)
  const time: any[] = []
  const data: any[] = []
  const map: any = {}
  props.data.forEach((item: any) => {
    time.push(item.signTime)
    data.push(item.signValue)
  })
  // configChart({ data, time })
  configChart({
    data,
    time
  })
})
const configChart = (data: any) => {
  let chart: any = null
  chart = (Highcharts as any).chart(props.id, {
    credits: {
      enabled: false
    },
    chart: {
      zoomType: 'x', // 缩放
      panning: true,
      followTouchMove: false,
      resetZoomButton: {
        // 缩放
        theme: {
          display: 'none'
        }
      },
      plotBackgroundColor: 'rgba(255, 255, 255, 1)'
    },
    title: {
      text: ''
    },
    yAxis: {
      tickAmount: 6,
      title: {
        text: ''
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      },
      gridLineColor: '#e1e1e1',
      gridLineDashStyle: 'longdash'
    },
    xAxis: {
      gridLineWidth: 0,
      tickInterval: 1,
      categories: data.time,
      labels: {
        style: {
          fontSize: '10px'
        },
        formatter: function () {
          return (this as any).value.slice(5, 10)
        }
      }
    },
    legend: {
      enabled: false
    },
    colors: ['#69C3EE'],
    series: [
      {
        data: data.data
      }
    ],
    tooltip: {
      followTouchMove: false,
      formatter(): any {
        console.log('ths', this as any)
        return `${props.title}：${(this as any).y}`
      },
      crosshairs: {
        width: 1,
        color: 'gray',
        dashStyle: 'shortdot'
      }
    }
  })
  // 设置初始显示范围
  if (data.time.length > 5) {
    // chart.xAxis[0].setExtremes(5, 10)
    chart.xAxis[0].setExtremes(1, 6)
  }
}
</script>
<style lang="scss" scoped>
.chart {
  background: #fff;
}
</style>
