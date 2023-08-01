const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL_USERS;
const endpoint = baseUrl + '/users';
const ADMIN = "admin";

export const userService = {
    login,
    singIn,
    getUserById,
    getAllUsers,
    hasAdminRoles,
    updateUser,
    deleteUser,
    createUserCart,
    getUserCart,
    updateUserCart,
    clearUserCart,
}

function checkCredentials(username, password) {
    return (user) => user.username === username && user.password === password;
}

function login(username, password) {
    return axios.get(endpoint)
        .then(response => {
            const users = response.data;
            const user = users.find(checkCredentials(username, password));
            return user;
        })
        .catch((err) => { console.error(`${err}`) })
}

function singIn(userData) {
    return axios.post(endpoint, userData)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function getUserById(id) {
    return axios.get(`${endpoint}/${id}`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function getAllUsers() {
    return axios.get(endpoint)
        .then((response) => { return response.data })
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

function updateUser(user) {
    return axios.put(`${endpoint}/${user.id}`, user)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function deleteUser(user) {
    return axios.delete(`${endpoint}/${user.id}`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function createUserCart(id) {
    return axios.post(`${endpoint}/${id}/cart`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function getUserCart(id) {
    return axios.get(`${endpoint}/${id}/cart`)
        .then((response) => { return response.data[0] })
        .catch((err) => { console.error(`${err}`) })
}

function updateUserCart(id, cart, cartId) {
    return axios.put(`${endpoint}/${id}/cart/${cartId}`, cart)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function clearUserCart(id, cartId) {
    return axios.put(`${endpoint}/${id}/cart/${cartId}`, { cart: [] })
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}