import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import './HomePage.css'
import productService from "../../services/products.services"
import Loader from "../../components/Loader/Loader"
import ProductsList from "../../components/ProductsList/ProductsList"
import { useEffect, useState } from "react"

const HomePage = () => {

    const [productsList, setProductsList] = useState()
    const [productsListClothing, setProductsListClothing] = useState()
    const [productsListElectronic, setProductsListElectronic] = useState()

    // const firstFourProducts2 = productsList.filter(elm => elm.category === 'Clothing')

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => {
                const firstFourProducts = data.slice(1, 5);
                setProductsList(firstFourProducts);
                const filterProductClothing = data.filter(elm => elm.category === 'Clothing')
                setProductsListClothing(filterProductClothing);
                const filterProductElectronic = data.filter(elm => elm.category === 'Electronic')
                setProductsListElectronic(filterProductElectronic);
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

            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <h3 style={{ textAlign: "center" }}>CLOTHING</h3>
                        <hr />

                    </Col>

                </Row>

                <Row>
                    {
                        !productsListClothing
                            ?
                            <Loader />
                            :
                            <ProductsList productsList={productsListClothing} />
                    }

                </Row>

            </Container>

            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <h3 style={{ textAlign: "center" }}>ELECTRONIC</h3>
                        <hr />

                    </Col>

                </Row>

                <Row>
                    {
                        !productsListElectronic
                            ?
                            <Loader />
                            :
                            <ProductsList productsList={productsListElectronic} />
                    }

                </Row>

            </Container>

        </>

    )
}

export default HomePage