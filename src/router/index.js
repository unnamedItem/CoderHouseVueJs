import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView'
import SingInView from '../views/SingInView'
import CartView from '../views/CartView'
import ProductView from '../views/ProductView'
import ProductManagement from '../views/ProductManagement'
import ProductManagementForm from '../views/ProductManagementForm'
import UserManagement from '../views/UserManagement'
import UserManagementForm from '../views/UserManagementForm'
import { userService } from '@/_services/user.service'

Vue.use(VueRouter)

const checkRoles = async function (to, from, next) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  userService.hasAdminRoles(userId)
    .then(hasAdminRoles => {
      if (!hasAdminRoles) {
        throw new Error("No tiene permisos para realizar esta acción");
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(`${err}`);
      return next("/login");
    })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/singin',
    name: 'SingIn',
    component: SingInView,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView,
    props: true,
  },
  {
    path: '/productmanagement',
    name: 'ProductManagement',
    component: ProductManagement,
    beforeEnter: checkRoles,
  },
  {
    path: '/productmanagement/form/:id',
    name: 'ProductManagementForm',
    component: ProductManagementForm,
    props: true,
    beforeEnter: checkRoles,
  },
  {
    path: '/usermanagement',
    name: 'UserManagement',
    component: UserManagement,
    beforeEnter: checkRoles,
  },
  {
    path: '/usermanagement/form/:id',
    name: 'UserManagementForm',
    component: UserManagementForm,
    props: true,
    beforeEnter: checkRoles,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
