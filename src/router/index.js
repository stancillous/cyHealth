import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "homepage" */ '../components/HomePage.vue')
  },
  {
    path: '/country/:country',
    name: 'country-statistics',
    component: () => import(/* webpackChunkName: "countrystats" */ '../components/CountryStat.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
