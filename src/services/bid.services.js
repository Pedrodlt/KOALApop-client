import axios from 'axios'

class BidService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/bids`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    showBids() {
        return this.api.get('/showBids')
    }

    saveBid(bidData) {
        // console.log(req.params)
        return this.api.post(`/saveBid`, bidData)
    }

    auctionProduct(product_id, bid_id) {
        console.log(product_id)
        return this.api.put(`/${product_id}/auctionProduct`, { bid_id })
    }

    // deleteProduct(product_id) {
    //     return this.api.delete(`/deleteProduct/${product_id}`)
    // }
}

const bidService = new BidService()

export default bidService