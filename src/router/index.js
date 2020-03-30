import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: () => import('../views/Main.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'home',
  //       component: () => import('../views/Home/Home')
  //     },
  //     {
  //       path: '/user',
  //       name: 'user',
  //       component: () => import('../views/UserManage/UserManage')
  //     },
  //     {
  //       path: '/video',
  //       name: 'video',
  //       component: () => import('../views/VideoManage/VideoManage')
  //     },
  //     {
  //       path: '/page1',
  //       name: 'page1',
  //       component: () => import('../views/Other/PageOne')
  //     },
  //     {
  //       path: '/page2',
  //       name: 'page2',
  //       component: () => import('../views/Other/PageTwo')
  //     }
  //   ]
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  }
]

const router = new VueRouter({
  base: '/msystem/',
  routes
})

export default router
