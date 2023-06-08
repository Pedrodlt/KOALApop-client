import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/products`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAllProducts() {
        return this.api.get('/getAllProducts')
    }
    getAllProductsSorted() {
        return this.api.get('/getAllProductsSorted')
    }

    getOneProduct(product_id) {
        return this.api.get(`/getOneProduct/${product_id}`)
    }

    saveProduct(productData) {
        return this.api.post('/saveProduct', productData)
    }

    editProduct(product_id, productData) {
        return this.api.put(`/editProduct/${product_id}`, productData)
    }

    buyProduct(product_id, fullName, email, address, user_id) {
        return this.api.put(`/buyProduct/${product_id}`, { fullName, email, address, user_id })
    }

    acceptBid(product_id, bought, user_id) {
        return this.api.put(`/acceptBid/${product_id}`, { bought, user_id })
    }
    denyBid(product_id, bidID) {
        return this.api.put(`/denyBid/${product_id}`, { bidID })
    }


    deleteProduct(product_id) {
        return this.api.delete(`/deleteProduct/${product_id}`)
    }
}

const productService = new ProductService()

export default productService