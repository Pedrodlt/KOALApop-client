import { Button, Card, Modal, Row, Col } from "react-bootstrap"
import { Carousel } from "react-bootstrap"

import './ProductCard.css'
import { Link } from "react-router-dom"
import { /* useContext, */ useState, useEffect } from "react"
// import { AuthContext } from './../../contexts/auth.context'
import productService from "../../services/products.services"
import Loader from "../Loader/Loader"
// import EditProductForm from '../EditProductForm/EditProductForm'


const ProductCard = ({ title, image, price, description, _id, owner }) => {

    // const [showModal, setShowModal] = useState(false)

    const [products, setProducts] = useState([])

    console.log('LOS PRODUCTOS', products)
    console.log('EL OWNER', owner)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    // const { user } = useContext(AuthContext)
    // console.log(user)

    return (
        <>
            {
                products && products.length > 0 ? (
                    <Card className=" ProductCard">
                        <Row className="ownerInCard">
                            <Col md={{ span: 6 }}>
                                <img src={owner?.avatar} alt="" />
                            </Col>
                            <Col md={{ span: 6 }}><p className="usernameInCard">{owner?.username}</p></Col>
                        </Row>

                        <Carousel>
                            {image?.map((img, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100" src={img} alt="" />
                                </Carousel.Item>
                            ))}

                        </Carousel>
                        <Card.Body>
                            <div >
                                <Card.Title>
                                    <h5>{title}</h5>
                                    <p style={{ fontWeight: 300 }}>{price} €</p>
                                    <hr />
                                </Card.Title>
                                <p style={{ fontWeight: 100 }}>{description}</p>

                            </div>
                            <div className="d-grid">
                                <Link to={`/products/${_id}`} className="button"> Details </Link>
                            </div>

                        </Card.Body>
                    </Card >
                )
                    :
                    <Loader />

            }

            {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProductForm closeModal={() => setShowModal(false)} updateList={loadProducts} />
                </Modal.Body>
            </Modal> */}
        </>

    )
}

export default ProductCard