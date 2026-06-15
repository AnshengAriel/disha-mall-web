import { getToken } from "@/composables/auth";
import nProgress from "nprogress";
import { createRouter, createWebHashHistory } from "vue-router";

const loginName = 'login'
const loginPath = '/login'
const indexName = 'index'
const np = nProgress
const routes = [
  {
    path: "/",
    name: 'main',
    meta: {
      title: '后台首页'
    },
    component: () => import("@/layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: indexName,
        component: () => import("@/pages/Index.vue"),
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    meta: {
      title: '404页'
    },
    component: () => import("@/pages/404.vue"),
  },
  {
    path: loginPath,
    name: loginName,
    meta: {
      title: '登录页'
    },
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫', from.fullPath, to.fullPath)
  np.start()
  const token = getToken()
  document.title = to.meta.title + '-蒂莎编程后台'
  if (token) {
    next()
  }else if (to.fullPath == loginPath) {
    next()
  }else {
    // next递归需要出口条件
    next({
      name: loginName
    })
  }
})

// 后置守卫
router.afterEach((to, from, failure) => {
  np.done()
})

export default router;

export function toLogin() {
  return router.push({
    name: loginName
  })
}

export function toIndex() {
  return router.push({
    name: indexName
  })
}