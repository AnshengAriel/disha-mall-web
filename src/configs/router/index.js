import { useAppCookies } from "@/main/composables/AppCookiesUse";
import nProgress from "nprogress";
import { createRouter, createWebHashHistory } from "vue-router";

const {
  getToken
} = useAppCookies()

const routeNames = {
  main:'', login:'', statsManage:'', goodesManage:'', categoryManage:'', specsManage:'',
  couponsManage:'', useryManage:'', orderManage:'', systemSettings:'',
  commentManage:'', picutureManage:'', noticeManage:'',
  adminManage:'', ruleManage:'', roleManage:''
}

Object.keys(routeNames)
  .filter(k => routeNames[k] == '')
  .forEach(k => routeNames[k] = k)

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    meta: {
      title: '404页'
    },
    component: () => import("@/configs/pages/404.vue"),
  },
  {
    path: '/login',
    name: routeNames.login,
    meta: {title: '登录页'},
    component: () => import("@/configs/pages/Login.vue"),
  },
  {
    path: "/",
    name: routeNames.main,
    meta: {title: '首页'},
    component: () => import("@/main/Main.vue"),
    children: [
      {
        path: "/index",
        name: routeNames.statsManage,
        meta: {title: '首页'},
        component: () => import("@/main/views/StatsManage.vue"),
      },
      {
        path: "/goodes",
        name: routeNames.goodesManage,
        meta: {title: '商品管理'},
        component: () => import("@/main/views/GoodsManage.vue"),
      },
      {
        path: "/category",
        name: routeNames.categoryManage,
        meta: {title: '分类管理'},
        component: () => import("@/main/views/CategoryManage.vue"),
      },
      {
        path: "/specs",
        name: routeNames.specsManage,
        meta: {title: '规格管理'},
        component: () => import("@/main/views/SpecsManage.vue"),
      },
      {
        path: "/coupons",
        name: routeNames.couponsManage,
        meta: {title: '优惠卷管理'},
        component: () => import("@/main/views/CouponsManage.vue"),
      },
      {
        path: "/user",
        name: routeNames.useryManage,
        meta: {title: '用户管理'},
        component: () => import("@/main/views/UserManage.vue"),
      },
      {
        path: "/order",
        name: routeNames.orderManage,
        meta: {title: '订单管理'},
        component: () => import("@/main/views/OrderManage.vue"),
      },
      {
        path: "/system",
        name: routeNames.systemSettings,
        meta: {title: '系统管理'},
        component: () => import("@/main/views/SystemSettings.vue"),
      },
      {
        path: "/comment",
        name: routeNames.commentManage,
        meta: {title: '评论管理'},
        component: () => import("@/main/views/CommentManage.vue"),
      },
      {
        path: "/picture",
        name: routeNames.picutureManage,
        meta: {title: '图库管理'},
        component: () => import("@/main/views/PictureManage.vue"),
      },
      {
        path: "/notification",
        name: routeNames.noticeManage,
        meta: {title: '公告管理'},
        component: () => import("@/main/views/NoticeManage.vue"),
      },
      {
        path: "/admin",
        name: routeNames.adminManage,
        meta: {title: '管理员管理'},
        component: () => import("@/main/views/ManagerManage.vue"),
      },
      {
        path: "/role",
        name: routeNames.roleManage,
        meta: {title: '角色管理'},
        component: () => import("@/main/views/RoleManage.vue"),
      },
      {
        path: "/rule",
        name: routeNames.ruleManage,
        meta: {title: '权限管理'},
        component: () => import("@/main/views/RuleManage.vue"),
      },
    ]
  },
  
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫', from.fullPath, to.fullPath)
  nProgress.start()
  const token = getToken()
  document.title = to.meta.title + '-蒂莎编程后台'
  if (token) {
    next()
  }else if (to.name == routeNames.login) {
    // next递归需要出口条件
    next()
  }else {
    next({
      name: routeNames.login
    })
  }
})

// 后置守卫
router.afterEach((to, from, failure) => {
  nProgress.done()
})

export default router;

export function useAppRouter() {

  function getRouteNames() {
    return routeNames
  }
  function pushByName(name) {
    router.push({name})
  }
  function getRouteName() {
    return router.currentRoute.value.name
  }
  function toLogin() {
    router.push({
      name: routeNames.login
    }).finally(() => location.reload())
  }
  function toIndex() {
    router.push({
      name: routeNames.statsManage
    }).finally(() => location.reload())
  }
  function hasMatched(route, routeName) {
    return route.matched.findIndex(r => r.name == routeName) != -1
  }
  function setRoutes(rules) {
    const menuTitles = rules.map(r => r.name)
    const mainRoute = routes.find(r => r.name == routeNames.main)
    mainRoute.children
      .filter(r => !menuTitles.includes(r.meta.title))
      .forEach(r => {
        router.removeRoute(r.name)
      })
  }
  function getRouteNameByTitle(title) {
    return routes.find(r => r.name == routeNames.main)
      .children.find(r => r.meta.title == title)?.name
  }

  return {
    getRouteNames: getRouteNames,
    pushByName: pushByName,
    getRouteName: getRouteName,
    toLogin: toLogin,
    toIndex: toIndex,
    hasMatched: hasMatched,
    setRoutes: setRoutes,
    getRouteNameByTitle: getRouteNameByTitle,
  }
}
