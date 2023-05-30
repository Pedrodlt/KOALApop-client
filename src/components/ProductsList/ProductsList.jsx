import { Col } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"

const ProductsList = ({ products }) => {

    return (
        products.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <ProductCard {...elm} />
                </Col>
            )
        })
    )
}

export default ProductsList