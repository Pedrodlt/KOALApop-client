import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import productService from "../../services/products.services"
import { Row, Col, Container, Button, Modal } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import EditProductForm from '../EditProductPage/EditProductPage'
import Loader from "../../components/Loader/Loader"


const ProductDetailsPage = () => {

    const { _id } = useParams()
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    console.log(showModal)
    const [product, setProduct] = useState()

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
                                    user?._id === product.owner && <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>EDIT</Button>
                                }
                                {
                                    user?._id === product.owner && <Button variant="alert" size="sm" onClick={() => handleDelete()}>DELETE</Button>
                                }

                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={product.image} style={{ width: '100%' }} />
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