import { userService } from "@/_services/user.service"

const userId = JSON.parse(localStorage.getItem("userId"));
const user = userId ? await userService.getUserById(userId) : {}; 

export const accountModule = {
  namespaced: true,
  state: {
    user: user,
    logged: userId ? true : false,
  },
  mutations: {
    login(state, user) {
      localStorage.setItem("userId", JSON.stringify(user.id));
      state.user = user;
      state.logged = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.user = {};
      state.logged = false;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return userService.login(username, password)
        .then(user => {
          if (user) {
            commit("login", user);
          } else {
            throw new Error("Usuario o contraseña equivocados");
          }
        })
        .catch(err => { throw err })
    },
    logout({commit}) {
      commit("logout");
    },
    singIn({ commit }, userData) {
      return userService.singIn(userData)
        .then(user => {
          console.log(user)
          if (user) {
            commit("login", user);
          } else {
            throw new Error("No se pudo completar el registro");
          }
        })
        .catch(err => { throw err })
    },
  }
}