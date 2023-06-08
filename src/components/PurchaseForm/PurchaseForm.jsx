import { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
// import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"
import { useNavigate, useParams } from "react-router-dom"
// import userService from "../../services/user.services"
import { AuthContext } from "../../contexts/auth.context"
import Loader from "../Loader/Loader"
import { ToastContext } from "../../contexts/toast.context"
import * as PURCHASE_CONSTS from "../../consts/purchase-consts"
import * as USER_MESSAGES from './../../consts/user-messages-consts'


const PurchaseForm = ({ /* updateList, _id, */ data }) => {

    const [buyerData, setbuyerData] = useState({
        fullName: '',
        email: '',
        address: ''
    })

    const { emitMessage } = useContext(ToastContext)

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [isLoading, setIsLoading] = useState(false);


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
                setIsLoading(true);
                emitMessage(USER_MESSAGES.PROCESSING_PAYMENT)
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/products/list');
                    emitMessage(USER_MESSAGES.PAYMENT_SUCCESS)
                }, PURCHASE_CONSTS.TRANSACTION_DELAY);
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
                <Form.Label>Credit Card Name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="fullName" />
            </Form.Group>

            <Form.Group controlId="cardNumber">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId="expirationDate">
                        <Form.Label>Expiration Month</Form.Label>
                        <div className="expiration-date">
                            <Form.Control
                                as="select"
                                value={expirationMonth}
                                onChange={(e) => setExpirationMonth(e.target.value)}
                            >
                                <option value="">Mes</option>
                                {
                                    PURCHASE_CONSTS.PURCHASE_MONTHS_ARRAY.map((elm, idx) => <option key={elm} value={idx < 10 ? `0${idx + 1}` : `${idx + 1}`}>{elm}</option>)
                                }
                            </Form.Control>
                        </div>
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group controlId="expirationDate">
                        <Form.Label>Expiration Year</Form.Label>

                        <div className="expiration-date">

                            <Form.Control
                                as="select"
                                value={expirationYear}
                                onChange={(e) => setExpirationYear(e.target.value)}
                            >
                                <option value="">Año</option>
                                {
                                    PURCHASE_CONSTS.PURCHASE_YEARS_ARRAY.map((elm) => <option key={elm} value={elm}>{elm}</option>)
                                }

                            </Form.Control>
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="cvv">
                <Form.Label>CVV:</Form.Label>
                <Form.Control
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
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
            {isLoading && <Loader />}
            <div className="d-grid">
                <Button variant="dark" type="submit" >BUY</Button>
            </div>
        </Form>
    )
}


export default PurchaseForm