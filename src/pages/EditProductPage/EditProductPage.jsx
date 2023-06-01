import { Container } from "react-bootstrap"
import EditProductForm from "../../components/EditProductForm/EditProductForm"

const EditProductPage = ({ closeModal, updateList }) => {

    return (
        <Container>
            <h1>Edit Product</h1>
            <hr />
            <EditProductForm closeModal={closeModal} updateList={updateList} />
        </Container>
    )
}

export default EditProductPage