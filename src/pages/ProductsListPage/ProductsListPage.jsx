import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button } from "react-bootstrap"
import productService from "../../services/products.services"
import ProductsList from "../../components/ProductsList/ProductsList"
import NewProductForm from "../../components/NewProductForm/NewProductForm"
// import EditProductForm from "../../components/EditProductForm/EditProductForm"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"

const ProductsListPage = ({ closeModal, updateList }) => {

    const [products, setProducts] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productService
            .getAllProducts()
            .then(({ data }) => {
                setProducts(data)
                closeModal()
                updateList()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <h1>PRODUCTS LIST</h1>

            {
                user && <Button variant="dark" size="sm" onClick={() => setShowModal(true)}>Create New Product</Button>
            }

            <hr />
            <Row>
                {
                    !products
                        ?
                        // <h1>CHARGING.....</h1>
                        <Loader />
                        :
                        <ProductsList products={products} />//ESTE ES EL COMPONENTE PENDIENTE
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