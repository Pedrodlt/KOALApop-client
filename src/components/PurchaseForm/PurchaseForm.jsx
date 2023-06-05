import { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
// import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"
import { useNavigate, useParams } from "react-router-dom"
// import userService from "../../services/user.services"
import { AuthContext } from "../../contexts/auth.context"


const PurchaseForm = ({ /* updateList, _id, */ data }) => {

    const [buyerData, setbuyerData] = useState({
        fullName: '',
        email: '',
        address: ''
    })

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const handleInputChange = event => {
        const { name, value } = event.target
        setbuyerData({ ...buyerData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const { fullName, email, address } = buyerData;

        productService
            .buyProduct(data._id, fullName, email, address, user.id)
            .then((response) => {
                // console.log(response)
                navigate('/products/list')
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })

        // productService
        //     .editProduct(data._id, { buyerInfo: buyerData })
        //     .then((response) => {
        //         console.log(response)
        //         navigate('/')
        //     })
        //     .catch(err => {
        //         setErrors(err.response.data.errorMessages)
        //     })
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