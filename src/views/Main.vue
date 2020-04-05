<template>
  <el-container style="height:100%;">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container style="min-width:1245px;">
      <el-header style="height:70px;">
        <common-header></common-header>
      </el-header>
      <common-tabs style="margin:10px;"></common-tabs>
      <el-main style="height:100%;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import CommonAside from '../components/CommonAside'
import CommonTabs from '../components/CommonTabs'

export default {
  data() {
    return {}
  },
  components: {
    CommonHeader,
    CommonAside,
    CommonTabs
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background-color: black;
}
.el-main {
  padding: 10px 20px 20px;
}
</style>
