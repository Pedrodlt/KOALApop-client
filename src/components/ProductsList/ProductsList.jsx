import { Col } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"

const ProductsList = ({ products }) => {

    return (
        products?.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm._id} className="mb-3">
                    <ProductCard {...elm} />
                </Col>
            )
        })
    )
}

export default ProductsList