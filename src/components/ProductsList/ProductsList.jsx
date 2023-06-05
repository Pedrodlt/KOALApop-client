import { Col } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react"


const ProductsList = ({ productsList }) => {


    return (

        productsList?.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm._id}>
                    <ProductCard {...elm} />
                </Col>
            )
        })

    )
}

export default ProductsList