import { createRouter, createWebHashHistory } from "vue-router";

const loginName = 'login'
const indexName = 'index'
const routes = [
  {
    path: "/",
    name: indexName,
    component: () => import("@/pages/Index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/pages/404.vue"),
  },
  {
    path: "/login",
    name: loginName,
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

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