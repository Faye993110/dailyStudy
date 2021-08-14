import { createRouter, createWebHistory } from "vue-router"
import Cookies from "js-cookie"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
  },
  {
    path: "/goFindPwd",
    name: "goFindPwd",
    component: () => import(/* webpackChunkName: "goFindPwd" */ "../views/goFindPwd"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import(/* webpackChunkName: "not-found" */ "../views/NotFound"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  let isAuthenticated = Cookies.get("isAuthenticated") || "false"
  if (to.name === "goFindPwd") {
    next({ path: "/goFindPwd" })
  } else if (to.name !== "login" && !JSON.parse(isAuthenticated)) {
    next({ name: "login" })
  } else {
    next()
  }
  // if ((to.name !== "login" || to.name !== "goFindPwd") && !JSON.parse(isAuthenticated))
  //   next({ name: "login" })
  // else next()
})

export default router
