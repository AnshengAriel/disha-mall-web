import { useAppRouter } from '@/configs/router'
import { createStore } from 'vuex'

const { statsManage } = useAppRouter().getRouteNames()
const { getRouteName, pushByName } = useAppRouter()
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: {},
      menu: {
        isCollapse: false,
        width: '250px',
      },
      menus: [],
      rules: [],
      tabList: [
        {
          title: '首页 ',
          name: statsManage,
          closable: false,
        }
      ],
    }
  },
  mutations: {
    setCached(state, cached) {
      state.cached = cached
    },
    setUser(state, user) {
      state.user = user
    },
    setMenuCollapse(state, isCollapse) {
      state.menu.isCollapse = isCollapse
    },
    setMenuWidth(state, width) {
      state.menu.width = width
    },
    setMenus(state, menus) {
      state.menus = menus
    },
    setRules(state, rules) {
      state.rules = rules
    },
    addTab(state, tab) {
      // 不存在则添加
      if (state.tabList.findIndex(i => i.name == tab.name) == -1) {
        state.tabList.push(tab)
      }
    },
    removeTab(state, tabName) {
      const index = state.tabList.findIndex(i => i.name == tabName)
      if (index != -1) {
        state.tabList.splice(index, 1)
      }
    },
    removeOtherTab(state, excludeTabName) {
      state.tabList = state.tabList.filter(tab => tab.name == statsManage || tab.name == excludeTabName)
    },
    removeAllTab(state) {
      state.tabList = [findIndexTab()]
    },
  }
})

function findIndexTab() {
  return store.state.tabList.find(tab => tab.name == statsManage)
}

export default store

export function useAppStore() {

  function setCached(cached = true) {
    store.commit('setCached', cached)
  }
  function getCached() {
    return store.state.cached
  }
  function setUser(user = {}) {
    store.commit('setUser', user)
  }
  function setMenuCollapse(isCollapse) {
    store.commit('setMenuCollapse', isCollapse)
    store.commit('setMenuWidth', isCollapse ? '64px' : '250px')
  }
  function getMenus() {
    return store.state.menus
  }
  function setMenus(menus) {
    store.commit('setMenus', menus)
  }
  function getRules() {
    return store.state.rules
  }
  function setRules(rules) {
    store.commit('setRules', rules)
  }
  function addTab(tab) {
    store.commit('addTab', tab)
  }
  function removeTab(tabName) {
    let index = store.state.tabList.findIndex(i => i.name == tabName)
    // 当前页被移除后, 导航到上一页
    if (index > 0 && tabName == getRouteName()) {
      pushByName(store.state.tabList[index-1].name)
    }
    store.commit('removeTab', tabName)
  }
  function removeOtherTab() {
    store.commit('removeOtherTab', router.currentRoute.value.name)
  }
  function removeAllTab() {
    pushByName(findIndexTab().name)
    store.commit('removeAllTab')
  }
  
  return {
    setCached: setCached,
    getCached: getCached,
    setUser: setUser,
    setMenuCollapse: setMenuCollapse,
    getMenus: getMenus,
    setMenus: setMenus,
    getRules: getRules,
    setRules: setRules,
    addTab: addTab,
    removeTab: removeTab,
    removeOtherTab: removeOtherTab,
    removeAllTab: removeAllTab,
  }
}