import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03d89c10 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _7acd9745 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _41c4cc7a = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _67450583 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _129bbb89 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _0fec7b5a = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _4e0f48d0 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _03d89c10,
    children: [{
      path: "",
      component: _7acd9745,
      name: "home"
    }, {
      path: "/login",
      component: _41c4cc7a,
      name: "login"
    }, {
      path: "/register",
      component: _41c4cc7a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _67450583,
      name: "profile"
    }, {
      path: "/settings",
      component: _129bbb89,
      name: "settings"
    }, {
      path: "/editor",
      component: _0fec7b5a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _4e0f48d0,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
