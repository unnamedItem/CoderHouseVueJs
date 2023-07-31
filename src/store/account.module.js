import { userService } from "@/_services/user.service"

const userId = JSON.parse(localStorage.getItem("userId"));
const user = userId ? await userService.getUserById(userId) : {};
const cart = userId ? await userService.getUserCart(userId) : [];

export const accountModule = {
  namespaced: true,
  state: {
    user: user,
    cart: cart.cart,
    cartId: cart.id,
    logged: userId ? true : false,
  },
  mutations: {
    login(state, { user, cart }) {
      localStorage.setItem("userId", JSON.stringify(user.id));
      state.user = user;
      state.cart = cart.cart;
      state.cartId = cart.id;
      state.logged = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.user = {};
      state.cart = [];
      state.cartId = null;
      state.logged = false;
    },
    loadUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return userService.login(username, password)
        .then(user => {
          if (user) {
            userService.getUserCart(user.id)
              .then((userCart) => { commit("login", { user: user, cart: userCart }) })
              .catch(err => { throw err })
          } else {
            throw new Error("Usuario o contraseña equivocados");
          }
        })
        .catch(err => { throw err })
    },
    logout({ commit }) {
      commit("logout");
    },
    singIn({ commit }, userData) {
      return userService.singIn(userData)
        .then(user => {
          if (user) {
            userService.createUserCart(user.id)
              .then((userCart) => { commit("login", { user: user, cart: userCart }) })
              .catch(err => { throw err })
          } else {
            throw new Error("No se pudo completar el registro");
          }
        })
        .catch(err => { throw err })
    },
    updateUserCart({ state, commit }, cart) {
      let userCopy = JSON.parse(JSON.stringify(state.user));
      userCopy.products = JSON.stringify(cart);
      userService.updateUser(userCopy)
        .then(user => { commit("loadUser", user) })
    }
  }
}