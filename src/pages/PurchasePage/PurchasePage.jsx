import { Container, Row, Col } from 'react-bootstrap'
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import productService from '../../services/products.services'
import Loader from '../../components/Loader/Loader'


const PurchasePage = () => {

    const { product_id } = useParams()
    const [productData, setProductData] = useState()

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {

        productService
            .getOneProduct(product_id)
            .then(({ data }) => {
                setProductData(data)
            })
            .catch(err => console.log(err))
    }

    return (

        <Container>
            {
                !productData
                    ?
                    <Loader />
                    :
                    <Row>

                        <Col md={{ offset: 3, span: 6 }}>

                            <h1>Purchase</h1>

                            <hr />

                            <PurchaseForm data={productData} id={product_id} />

                        </Col>
                    </Row>

            }

        </Container>
    )
}

export default PurchasePage