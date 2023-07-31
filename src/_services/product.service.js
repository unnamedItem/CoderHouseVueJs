const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL_PRODUCTS;
const endpoint = baseUrl + '/products';

export const productService = {
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addProduct,
}

function getProductById(id) {
    return axios.get(`${endpoint}/${id}`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function getAllProducts() {
    return axios.get(endpoint)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function addProduct(product) {
    return axios.post(endpoint, product)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function updateProduct(product) {
    return axios.put(`${endpoint}/${product.id}`, product)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function deleteProduct(product) {
    return axios.delete(`${endpoint}/${product.id}`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}