import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/products`
        })
    }

    getAllProducts() {
        return this.api.get('/getAllProducts')
    }

    getOneProduct(product_id) {
        console.log("+++++++++++++", product_id)
        return this.api.get(`/getOneProduct/${product_id}`)
    }

    saveProduct(productData) {
        return this.api.post('/saveProduct', productData)
    }

    editProduct(product_id, productData) {
        return this.api.post('/editProduct', product_id, productData)
    }

    deleteProduct(product_id) {
        return this.api.post('/deleteProduct', product_id)
    }
}

const productService = new ProductService()

export default productService