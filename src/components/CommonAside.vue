<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="isCollapse">SUN</h3>
    <h3 class="system-tit" v-show="!isCollapse">
      SunShine后台管理系统
      <p class="light"></p>
    </h3>
    <el-menu-item v-for="item in noChildren" @click="clickMenu(item)" :key="item.path" :index="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="(item, index) in hasChildren" :key="index" :index="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item v-for="(subItem, subIndex) in item.children" @click="clickMenu(subItem)" :key="subIndex" :index="subIndex.path">
          <!-- {{ subItem.label }} -->
          <i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
      // return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
      // return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menu() {
      return this.$store.state.tab.menu
    }
  },
  data() {
    return {
      asideMenu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home'
        },
        {
          path: '/video',
          name: 'video',
          label: '视频管理',
          icon: 'video-play'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        },
        {
          label: '其他',
          icon: 'guide',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right: 0;
  h3 {
    height: 70px;
    line-height: 70px;
    color: #0085d0;
    text-align: center;
    background-color: #111;
  }
  .system-tit {
    position: relative;
    overflow: hidden;
    .light {
      cursor: pointer;
      position: absolute;
      left: -145px;
      top: 0;
      width: 200px;
      height: 70px;
      background-image: -moz-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
      background-image: -webkit-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
      transform: skewx(-25deg);
      -o-transform: skewx(-25deg);
      -moz-transform: skewx(-25deg);
      -webkit-transform: skewx(-25deg);
    }
  }
  .system-tit:hover .light {
    left: 200px;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style lang="scss">
.el-menu-item,
.el-submenu__title {
  font-size: 17px;
}
</style>
