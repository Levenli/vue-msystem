<template>
  <div class="header-box">
    <!-- 左边 -->
    <div class="l-content">
      <el-button size="mini" icon="el-icon-menu" @click="collapseMenu"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <!-- 右边 -->
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"><img :src="userAvatar"/></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userAvatar: require('../assets/images/user.jpg')
    }
  },
  methods: {
    collapseMenu() {
      this.$store.commit('menuCollapse')
    },
    logOut() {
      // 退出登录
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.l-content {
  display: flex;
  align-items: center;
  .el-breadcrumb {
    margin-left: 30px;
    font-size: 17px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__inner {
  color: #fff;
  cursor: pointer;
}
.el-breadcrumb__item:hover {
  cursor: pointer;
}
.el-breadcrumb__inner.is-link {
  color: #fff;
  cursor: pointer !important;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
  cursor: pointer;
}
</style>
