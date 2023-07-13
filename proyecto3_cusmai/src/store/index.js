import Vue from 'vue'
import Vuex from 'vuex'

import { accountModule } from './account.module'
import { productModule } from './product.module'
import { cartModule } from './cart.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accountModule,
    productModule,
    cartModule,
  }
})
