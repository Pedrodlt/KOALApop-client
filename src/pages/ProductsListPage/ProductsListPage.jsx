import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button, Col } from "react-bootstrap"
import productService from "../../services/products.services"
import ProductsList from "../../components/ProductsList/ProductsList"
import NewProductForm from "../../components/NewProductForm/NewProductForm"
// import EditProductForm from "../../components/EditProductForm/EditProductForm"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import SearchBar from "../../components/SearchBar/SearchBar"

const ProductsListPage = ({ closeModal, updateList }) => {

    const [products, setProducts] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    const [productsList, setProductsList] = useState(products)
    const [showFilterProduct, setShowFilterProduct] = useState()


    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => {
                const availableProducts = data.filter(elm => !elm.bought)
                setProducts(availableProducts)
                setProductsList(availableProducts)
                updateList()
                closeModal()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        let filterProduct = products?.filter(elm => {
            return elm.title.toLowerCase().includes(showFilterProduct) || elm.category.toLowerCase().includes(showFilterProduct) || elm.price.toString().includes(showFilterProduct)
        })
        setProductsList(filterProduct)
    }, [showFilterProduct])


    return (
        <Container>
            <Row>
                <Col>
                    <h1>PRODUCTS LIST</h1>

                    {
                        user && <Button variant="dark" size="sm" onClick={() => setShowModal(true)}>Sell Product</Button>
                    }
                </Col>
                <Col className="mt-5">
                    <SearchBar setShowFilterProduct={setShowFilterProduct} />
                </Col>
            </Row>


            <hr />
            <Row>
                {
                    !products
                        ?
                        // <h1>CHARGING.....</h1>
                        <Loader />
                        :
                        <ProductsList productsList={productsList} />//ESTE ES EL COMPONENTE PENDIENTE
                }
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewProductForm closeModal={() => setShowModal(false)} updateList={loadProducts} />
                </Modal.Body>
            </Modal>


        </Container>
    )
}

export default ProductsListPage