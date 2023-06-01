import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"
import { useParams } from "react-router-dom"

const PurchaseForm = ({ updateList, _id, data }) => {

    console.log('oerijuhfiuerfiuherfiu', data)
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
    })

    const [errors, setErrors] = useState([])

    useEffect(() => {
        loadProduct()
    }, [])
    const loadProduct = () => {

        productService
            .getOneProduct(_id)
            .then(({ data }) => {
                setProductData(data)
            })
            .catch(err => console.log(err))
    }


    const handleInputChange = event => {
        const { name, value } = event.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        productService
            .editProduct(_id, productData)
            .then(() => {
                updateList()

            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    const { title, description, price } = productData

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h5>Product Information</h5>
            </div>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={data.title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={data.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={data.price} onChange={handleInputChange} name="price" />
            </Form.Group>

            <div>
                <h5>Buyer Information</h5>
            </div>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="title" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit" >BUY</Button>
            </div>
        </Form>
    )
}


export default PurchaseForm