import { Container } from "react-bootstrap"
import NewProductForm from "../../components/NewProductForm/NewProductForm"

const NewProductPage = () => {

    return (
        <Container>
            <h1>New Product</h1>
            <hr />
            <NewProductForm />
        </Container>
    )
}

export default NewProductPage