import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import Details from '../views/Details.vue'
import Orders from '../views/Orders.vue'
//firebase
import { firebase } from '@firebase/app'
import '@firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Register',
    name: 'Register',
    component:Register
  },
  {
    path: '/Cart',
    name: 'Cart',
    component:Cart
  },
  {
    path: '/Login',
    component:Login
  },
  {
    path: '/Checkout',
    component:Checkout,
    name:'Checkout'
  },
  {
    path:'/Orders',
    component:Orders,
    name:"Orders"
  },
  {
    path: '/Admin',
    component:Admin,
    meta:{requiresAuth:true}
  },
  {
    path:'/:id',
    component:Details
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  firebase.auth().onAuthStateChanged(user=>{
    if(requiresAuth && !user){
      next('/')
    }
    else{
      next()
    }
  })
});



export default router
