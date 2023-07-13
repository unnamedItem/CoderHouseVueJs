import { userService } from "@/_services/user.service";

export const accountModule = {
  state() {
    const userId = JSON.parse(localStorage.getItem("userId"));
    return {
      user: userId ? userService.getUserById(userId) : {},
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}