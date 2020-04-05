<template>
  <div style="height:100%;" ref="echartbox" class="echarts-box">暂无数据...</div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    option() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse() {
      // 左侧导航菜单“展开&收起”的标识
      return this.$store.state.tab.isCollapse
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    isCollapse() {
      // 左侧导航菜单“展开&收起”时，重新渲染图表
      setTimeout(() => {
        this.resizeChart()
      }, 300)
      // 注意：这里setTimeout不能用ES5的写法！！
      // setTimeout(function() {
      //   this.resizeChart()
      // }, 300)
    }
  },
  data() {
    return {
      myEchart: null,
      axisOption: {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '10%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          }
        },
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.myEchart) {
        this.myEchart.setOption(this.option)
      } else {
        this.myEchart = echarts.init(this.$refs.echartbox)
        this.myEchart.setOption(this.option)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        // console.log('坐标轴图表')
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        // console.log('非坐标轴图表')
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart() {
      this.myEchart ? this.myEchart.resize() : ''
    }
  },
  mounted() {
    // 浏览器宽度改变时，自适应图表
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    // 组件销毁时将事件销毁，避免内存泄漏
    window.removeEventListener('resize', this.resizeChart)
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  font-size: 14px;
  color: #999;
}
</style>
