import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import store from '@/store'
import Country from '../components/Country.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  
  {
    path: '/country/:queryName',
    name: 'Country',
    component: Country,
    props: true,
    beforeEnter(to, from, next){
      let queryName = to.params.queryName
      store.dispatch('newCountryName', queryName)
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  store
})

export default router
