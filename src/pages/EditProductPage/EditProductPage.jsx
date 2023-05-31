import { Container } from "react-bootstrap"
import EditProductForm from "../../components/EditProductForm/EditProductForm"

const EditProductPage = () => {

    return (
        <Container>
            <h1>Edit Product</h1>
            <hr />
            <EditProductForm />
        </Container>
    )
}

export default EditProductPage