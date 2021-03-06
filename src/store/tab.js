import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    menu: [],
    currentMenu: null,
    tagsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
      Cookie.remove('tagList')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        {
          path: '',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(subItem => {
            subItem.component = () => import(`@/views/${subItem.url}`)
            return subItem
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        // 先判断tagsList数组中有没有，没有才添加进去
        let result = state.tagsList.findIndex(item => item.name === val.name)
        console.log(val, 'result11')
        result === -1 ? state.tagsList.push(val) : ''
        state.currentMenu = val
        Cookie.set('tagList', JSON.stringify(state.tagsList))
      } else {
        state.currentMenu = null
      }
      // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
    },
    getMenu(state) {
      if (Cookie.get('tagList')) {
        let tagList = JSON.parse(Cookie.get('tagList'))
        state.tagsList = tagList
      }
    },
    closeTags(state, val) {
      // findIndex()方法返回第一个匹配的'元素索引'
      let result = state.tagsList.findIndex(item => item.name === val.name)
      // 点击关闭标签时会执行两次(??)，须加个if判断
      if (result !== -1) {
        state.tagsList.splice(result, 1)
        console.log(state.tagsList, 'state.tagsList')
        Cookie.set('tagList', JSON.stringify(state.tagsList))
        return
      }
      // console.log(state.tagsList, '111')
    },
    menuCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
