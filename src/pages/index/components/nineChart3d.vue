<template>
  <div :id="props.id" class="chart" :style="{ maxWidth: '100vw', height: props.height + 'px' }"></div>
</template>
<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core'
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import exporting from 'highcharts/modules/exporting'

highcharts3d(Highcharts)
exporting(Highcharts)

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
    default: 250
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
  let name: any[] = []
  let data: any[] = []
  props.data.forEach((item: any) => {
    name.push(item.key)
    data.push(item.value)
  })
  // configChart({ data, time })
  configChart({
    data,
    name
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
      type: 'column',
      margin: 40,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 30,
        depth: 70,
        viewDistance: 100, // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
        frame: {
          // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
          // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
          // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
          bottom: {
            size: 10
          },
          side: {
            size: 1,
            color: 'transparent'
          },
          back: {
            size: 1,
            color: 'transparent'
          }
        }
      }
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    xAxis: {
      // categories: (Highcharts as any).getOptions().lang.shortMonths
      categories: data.name
    },
    yAxis: {
      title: {
        text: null
      }
    },
    // colors: ['#69C3EE'],
    series: [
      {
        name: '得分',
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
