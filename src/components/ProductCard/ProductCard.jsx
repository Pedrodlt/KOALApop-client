import { Button, Card, Modal, Row, Col } from "react-bootstrap"
import { Carousel } from "react-bootstrap"

import './ProductCard.css'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import productService from "../../services/products.services"
import Loader from "../Loader/Loader"

const ProductCard = ({ title, image, price, description, _id, owner }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                products && products.length > 0 ? (
                    <Card className=" ProductCard">
                        <Row className="ownerInCard">
                            <Col md={{ span: 5 }}>
                                <img src={owner?.avatar} alt="" />
                            </Col>
                            <Col md={{ span: 6 }}><p className="usernameInCard">{owner?.username}</p></Col>
                        </Row>

                        <Carousel>
                            {image?.map((img, index) => (
                                <Carousel.Item key={index}>
                                    <Link to={`/products/${_id}`} className="button"> <img className="d-block w-100" src={img} alt="" /> </Link>
                                </Carousel.Item>
                            ))}

                        </Carousel>
                        <Card.Body className="cardBody">
                            <div >
                                <Card.Title>
                                    <h5>{title}</h5>
                                    <p style={{ fontWeight: 300 }}>{price} €</p>
                                    <hr />
                                </Card.Title>
                                <p style={{ fontWeight: 100 }}>{description}</p>

                            </div>
                        </Card.Body>
                    </Card >
                )
                    :
                    <Loader />

            }

        </>

    )
}

export default ProductCard