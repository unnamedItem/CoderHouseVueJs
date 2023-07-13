const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/users';
const ADMIN = "admin";

export const userService = {
    login,
    singIn,
    getUserById,
    getAllUsers,
    hasAdminRoles,
}

function checkCredentials(username, password) {
    return (user) => user.username === username && user.password === password;
}

function login(username, password) {
    return axios.get(endpoint)
        .then((response) => {
            const users = response.data;
            const user = users.find(checkCredentials(username, password));
            if (user) {
                localStorage.setItem("userId", JSON.stringify(user.id));
                return user;
            } else {
                throw new Error("Usuario o contraseña equivocados");
            }
        })
        .catch((err) => { throw err })
}

function singIn(userData) {
    return axios.post(endpoint, userData)
        .then((response) => {
            const user = response.data;
            return user;
        })
        .catch((err) => { console.error(`${err}`) })
}

function getUserById(id) {
    return axios.get(`${endpoint}/${id}`)
        .then((response) => {
            const user = response.data;
            return user;
        })
        .catch((err) => { console.error(`${err}`) })
}

function getAllUsers() {
    return axios.get(endpoint)
        .then((response) => {
            const users = response.data;
            return users;
        })
        .catch((err) => { console.error(`${err}`) })
}

function hasAdminRoles(id) {
    return axios.get(`${endpoint}/${id}`)
        .then((response) => {
            const user = response.data;
            const hasAdminRoles = user?.roles?.some(rol => rol === ADMIN);
            return hasAdminRoles;
        })
        .catch((err) => { console.error(`${err}`) })
}