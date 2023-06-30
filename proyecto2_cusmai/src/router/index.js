import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView'
import SingInView from '../views/SingInView'
import CartView from '../views/CartView'
import ProductView from '../views/ProductView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/singin',
    name: 'SingIn',
    component: SingInView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!Object.keys(to.params).length) {
    const user = JSON.parse(localStorage.getItem("user"));
    next({name: to.name, params: {user: user}, query: to.query});
  }
  next()
});

export default router
