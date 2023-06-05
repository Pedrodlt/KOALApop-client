import { Button, Card, Modal } from "react-bootstrap"
import { Carousel } from "react-bootstrap"

import './ProductCard.css'
import { Link } from "react-router-dom"
import { /* useContext, */ useState, useEffect } from "react"
// import { AuthContext } from './../../contexts/auth.context'
import productService from "../../services/products.services"
// import EditProductForm from '../EditProductForm/EditProductForm'


const ProductCard = ({ title, image, _id, /* owner */ }) => {

    // const [showModal, setShowModal] = useState(false)

    const [products, setProducts] = useState()
    console.log(products)


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
            <Card className="mb-3 ProductCard">

                <Carousel>
                    {image?.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={img} alt="" />
                        </Carousel.Item>
                    ))}
                    {/* {
                        products?.map((p) => {
                            return (
                                <Carousel.Item key={p._id}>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt=""
                                    />
                                </Carousel.Item>
                            )
                        })
                    }*/}
                </Carousel>
                {/* <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt="Second slide"
                        />
                    </Carousel.Item> */}
                {/* </Carousel> */}
                {/* <Card.Img variant="top" src={image} /> */}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div className="d-grid">
                        <Link to={`/products/${_id}`} className="btn btn-dark btn-sm">
                            {/* <Button variant="dark" size="sm"> */}Details{/* </Button> */}
                        </Link>
                        {/* {
                            user?._id === owner && <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>EDIT</Button>
                        } */}
                    </div>
                </Card.Body>
            </Card >

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