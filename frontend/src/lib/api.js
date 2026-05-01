import api from "./axios";

export const syncUser = async (userData) => {
    const response = await api.post("/api/users/sync", userData)
    return response.data;

}

export const getAllProducts = async () => {
    const {data} = await api.get("/api/products")
    return data.products;
}


export const getProductById = async(id) => {
    const response = await api.get(`/api/products/${id}`)
    return response.data.product;
}

export const getMyProducts = async () => {
    const response = await api.get('/api/products')
    return response.data.products;
}

// create prducts
export const createProduct = async (productData) => {
    const response = await api.post('/api/products', productData)
    return response.data;
} 

// update prducts
export const updateProduct = async ({id, ...productData}) => {
    const response = await api.put(`/api/products/${id}`, productData)
    return response.data;
}

// delete prducts
export const deleteProduct = async (id) => {
    const response = await api.delete(`/api/products/${id}`)
    return response.data;
}


// comments
export const addComment = async({productId, content}) => {
    const response = await api.post(`/api/comments/${productId}`, {content})
    return response.data;
}

export const deleteComment = async({commentId}) => {
    const response = await api.delete(`/api/comments/${commentId}`)
    return response.data;
}
