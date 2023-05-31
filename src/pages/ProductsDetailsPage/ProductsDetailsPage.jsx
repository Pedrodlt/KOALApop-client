import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import productService from "../../services/products.services"
import { Row, Col, Container, Button, Modal } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import EditProductForm from '../EditProductPage/EditProductPage'
// import Loader from "../../components/Loader/Loader"


const ProductDetailsPage = () => {

    const { _id } = useParams()
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)


    const [product, setProduct] = useState()

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        productService
            .getOneProduct(_id)
            .then(({ data }) => {
                // console.log()
                setProduct(data)
            })
            .catch(err => console.log(err))
    }

    // console.log(user, product.owner)

    return (
        <Container>
            {
                !product
                    ?
                    <h1>CHARGING.....</h1>
                    // <Loader />
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