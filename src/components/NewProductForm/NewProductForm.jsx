import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"



const NewProductForm = ({ closeModal, updateList }) => {

    const [productData, setProductData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])


    const handleInputChange = event => {
        const { name, value } = event.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        productService
            .saveProduct(productData)
            .then(() => {
                updateList()
                closeModal()
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    const { title, description, category, price } = productData

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProductData({ ...productData, image: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={category} onChange={handleInputChange} name="category" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price} onChange={handleInputChange} name="price" />
                    </Form.Group>

                </Col>

            </Row>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage} >{loadingImage ? 'Loading Image...' : 'Upload'}</Button>
            </div>
        </Form>
    )
}

export default NewProductForm