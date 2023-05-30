import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import productService from "../../services/products.services"
import { Row, Col, Container, Button } from "react-bootstrap"
// import Loader from "../../components/Loader/Loader"


const ProductDetailsPage = () => {

    const { _id } = useParams()


    const [product, setProduct] = useState()

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        productService
            .getOneProduct(_id)
            .then(({ data }) => {
                console.log(product)
                setProduct(data)
            })
            .catch(err => console.log(err))
    }



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

                                <Link to="/galeria">
                                    <Button variant="dark">Volver a la galería</Button>
                                </Link>

                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={product.image} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }

        </Container>
    )
}

export default ProductDetailsPage