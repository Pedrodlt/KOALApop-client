import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import productService from "../../services/products.services"
import { Row, Col, Container, Button, Modal, Carousel } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import EditProductForm from '../EditProductPage/EditProductPage'
import Loader from "../../components/Loader/Loader"



const ProductDetailsPage = () => {

    const { _id } = useParams()
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [product, setProduct] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        productService
            .getOneProduct(_id)
            .then(({ data }) => {
                setProduct(data)
            })
            .catch(err => console.log(err))
    }
    const handleDelete = () => {

        productService
            .deleteProduct(_id)
            .then(() => navigate('/products/list'))
            .catch(err => console.log(err))
    }


    return (
        <Container>
            {
                !product
                    ?
                    // <h1>CHARGING.....</h1>
                    <Loader />
                    :
                    <>
                        <h1>Detalles de {product.title}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6 }}>
                                <h3>Especificaciones</h3>
                                <p>{product.description}</p>
                                <hr />

                                <Link to="/products/list">
                                    <Button variant="dark">Volver a la galería</Button>
                                </Link>


                                {
                                    user?._id === product.owner
                                    &&
                                    <>
                                        <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>EDIT</Button>
                                        <Button variant="alert" size="sm" onClick={() => handleDelete()}>DELETE</Button>
                                    </>
                                }

                            </Col>

                            <Col md={{ span: 4 }}>
                                {/* <img src={product.image} style={{ width: '100%' }} /> */}

                                <Carousel>
                                    {product.image?.map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img className="d-block w-100" src={img} alt="" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>

                                {
                                    user._id !== product.owner
                                        ?
                                        <>
                                            <Link to={`/products/${_id}/purchase`}>
                                                <Button variant="warning" size="sm" id={_id}>BUY</Button>
                                            </Link>
                                        </>
                                        :
                                        <p>Your Product</p>
                                }

                            </Col>

                        </Row>

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditProductForm closeModal={() => setShowModal(false)} updateList={loadProduct} />
                            </Modal.Body>
                        </Modal>
                    </>
            }

        </Container>
    )
}

export default ProductDetailsPage