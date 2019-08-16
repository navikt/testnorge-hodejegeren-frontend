import Vue from 'vue'
import Router from 'vue-router'
import Result from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/result',
      name: 'result',
      component: Result,
      props: true
    },
    {
      path: '/',
      name: 'search',
      component: () => import('./views/AdvancedSearch.vue')
    }
  ]
})
