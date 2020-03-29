<template>
  <el-row class="home" :gutter="20">
    <!-- 左边 -->
    <el-col :span="8">
      <el-card shadow="hover" style="height: 290px;">
        <div class="user">
          <img :src="userImg" alt="用户头像" />
          <div class="userinfo">
            <p class="name">Leven</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-11-19</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px;margin-top: 20px;">
        <el-table :data="tableData" stripe style="width: 100%;">
          <el-table-column v-for="item in tableTitle" :key="item.prop" :prop="item.prop" :label="item.label" align="center"></el-table-column>
          <!-- <el-table-column prop="name" label="课程名称" align="center"> </el-table-column>
          <el-table-column prop="todayBuy" label="日购买量(份)" align="center"> </el-table-column>
          <el-table-column prop="monthBuy" label="月购买量(份)" align="center"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买量(份)" align="center"> </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>
    <!-- 右边 -->
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num-price">${{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height: 300px;" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height: 260px;" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height: 260px;" :chartData="echartData.video" :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/Echarts'
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require('../../assets/images/user.png'),
      countData: [
        {
          name: '今日订单',
          value: 1612,
          icon: 'success',
          color: '#0085d0'
        },
        {
          name: '收藏订单',
          value: 120,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '已支付订单',
          value: 554,
          icon: 'success',
          color: '#118408'
        },
        {
          name: '未支付订单',
          value: 320,
          icon: 'success',
          color: '#A074C4'
        },
        {
          name: '本月订单',
          value: 8765,
          icon: 'success',
          color: '#EE7005'
        },
        {
          name: '上月订单',
          value: 3215,
          icon: 'success',
          color: '#8DD35F'
        }
      ],
      tableData: [],
      tableTitle: [
        {
          prop: 'name',
          label: '课程名称'
        },
        {
          prop: 'todayBuy',
          label: '日购买量(份)'
        },
        {
          prop: 'monthBuy',
          label: '月购买量(份)'
        },
        {
          prop: 'totalBuy',
          label: '总购买量(份)'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getData() {
      this.$http.get('/home/getData').then(res => {
        console.log(res.data)
        res = res.data
        // 1.表格数据
        this.tableData = res.data.tableData
        // 2.订单-图表数据(折线图)
        this.echartData.order.xData = res.data.orderData.date
        const order = res.data.orderData
        let keyArray = Object.keys(order.data[0])
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line',
            smooth: true
          })
        })
        // 3.用户-图表数据(柱状图)
        const user = res.data.userData
        let userKeyArray = ['new', 'active']
        user.forEach(item => this.echartData.user.xData.push(item.date))
        userKeyArray.forEach(key => {
          this.echartData.user.series.push({
            name: key,
            data: user.map(item => item[key]),
            type: 'bar'
          })
        })
        // 4.视频-图表数据(饼图)
        const video = res.data.videoData
        this.echartData.video.series.push({
          name: '课程：',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: video,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
.el-table thead {
  font-weight: 600;
}
</style>
<style lang="scss">
.el-table thead {
  font-weight: 600;
}
</style>
