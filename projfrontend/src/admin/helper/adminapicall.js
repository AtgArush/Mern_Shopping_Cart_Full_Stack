const { API } = require("../../backend");

export const createCategory = (userId, token, category) => {
    console.log(userId, token, category)
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(
        response =>{
            return response.json()
        }
    )
    .catch(err => console.log(err))
}

export const deleteCategory = (userId, productId, token) =>{
    console.log()
    return fetch(`${API}/category/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategory = (categoryId) =>{
    return fetch (`${API}/category/${categoryId}`, {
        mehtod: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = (userId, token) => {
    return fetch (`${API}/category`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateCategory = (categoryId, userId, token, category) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: category
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

// PRODUCT CALLS

export const createProduct = (userId, token, product) =>{
    console.log(userId, token, product)
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(
        response =>{
            return response.json()
        }
    )
    .catch(err => console.log(err))
}

export const getProducts = (userId, token) =>{
    return fetch (`${API}/products/${userId}`, {
        mehtod: "GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getProduct = (prooductId) =>{
    return fetch (`${API}/product/${prooductId}`, {
        mehtod: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateProduct = (productId, userId, token, product) =>{
    return fetch (`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteProduct = (userId, token, productId) =>{
    console.log(userId, token, productId)
    return fetch (`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}