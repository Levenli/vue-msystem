import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局
import '@/assets/scss/reset.scss'

// 第三方
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './api/config-axios.js'
import './mock'

Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')

  // 过滤登录页，防止死循环
  let token = store.state.user.token
  if (!token && to.name !== 'login') {
    // 当 “token不存在” && “要去的不是login页” 时
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
