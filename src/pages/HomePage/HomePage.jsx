import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import './HomePage.css'
import productService from "../../services/products.services"
import Loader from "../../components/Loader/Loader"
import ProductsList from "../../components/ProductsList/ProductsList"
import { useEffect, useState } from "react"

const HomePage = () => {

    // const [products, setProducts] = useState()
    const [productsList, setProductsList] = useState();

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => {
                const firstFourProducts = data.slice(0, 4);
                setProductsList(firstFourProducts);

            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <section>
                <Image className='imgHome' src="/portada.jpg" />
            </section>

            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <h3 style={{ textAlign: "center" }}>POPULAR ARTICLES</h3>
                        <hr />
                        {/* <Link to="/products/list">
                            <Button variant="dark">Ir a la galería</Button>
                        </Link> */}

                    </Col>

                </Row>

                <Row>
                    {
                        !productsList
                            ?
                            <Loader />
                            :
                            <ProductsList productsList={productsList} />
                    }

                </Row>

            </Container>

        </>



    )
}

export default HomePage