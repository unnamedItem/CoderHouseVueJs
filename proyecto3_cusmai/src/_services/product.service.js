const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/products';

export const productService = {
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
}

function getProductById(id) {
    return axios.get(`${endpoint}/${id}`)
        .then((response) => { return response.data })
        .catch((err) => { console.error(`${err}`) })
}

function getAllProducts() {
    return axios.get(endpoint)
        .then((response) => { return response })
        .catch((err) => { console.error(`${err}`) })
}

function updateProduct(product) {
    return axios.get(`${endpoint}/${product.id}`, product)
        .then((response) => { return response })
        .catch((err) => { console.error(`${err}`) })
}

function deleteProduct(product) {
    return axios.get(`${endpoint}/${product.id}`)
        .then((response) => { return response })
        .catch((err) => { console.error(`${err}`) })
}