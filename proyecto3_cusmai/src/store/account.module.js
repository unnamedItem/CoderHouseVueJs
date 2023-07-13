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
    loadUser(state, user) {
      state.user = user;
      state.logged = true;
    },
    logout(state) {
      state.user = {};
      state.logged = false;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return userService.login(username, password)
        .then(user => {
          if (user) {
            localStorage.setItem("userId", JSON.stringify(user.id));
            commit("loadUser", user);
          } else {
            throw new Error("Usuario o contraseña equivocados");
          }
        })
        .catch(err => { throw err })
    },
    logout({commit}) {
      localStorage.removeItem("userId");
      commit("logout");
    }
  }
}