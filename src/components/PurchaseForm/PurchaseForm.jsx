import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"
import { useNavigate, useParams } from "react-router-dom"

const PurchaseForm = ({ updateList, _id, data }) => {

    const [productData, setProductData] = useState({
        fullName: '',
        email: '',
        address: ''
    })

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { name, value } = event.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        productService
            .editProduct(data._id, { buyerInfo: productData })
            .then((response) => {
                console.log(response)
                navigate('/')
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h5>Product Information</h5>
            </div>
            <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={data.title} disabled={true} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={data.description} disabled={true} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={data.price} disabled={true} />
            </Form.Group>

            <div>
                <h5>Buyer Information</h5>
            </div>

            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="fullName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>@Email</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Shipment Details</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="address" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit" >BUY</Button>
            </div>
        </Form>
    )
}


export default PurchaseForm