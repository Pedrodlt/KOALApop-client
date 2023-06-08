import { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import userService from "../../services/user.services"
import uploadServices from "../../services/upload.services"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import * as PURCHASE_CONSTS from "../../consts/purchase-consts"


const AddFundsForm = ({ closeModal, updateList }) => {

    const { user } = useContext(AuthContext)

    const [userData, setUserData] = useState({
        username: user.username,
        funds: user.funds,
    });
    const [fundsToAdd, setFundsToAdd] = useState(0);

    const { _id } = useParams()


    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvv, setCvv] = useState('');


    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getOneUser(_id)
            .then(({ data }) => {
                setUserData(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        if (name === 'funds') {
            setFundsToAdd(parseInt(value));
        } else {
            setUserData({ ...userData, [name]: value });
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        const updatedUserData = {
            ...userData,
            funds: userData.funds + fundsToAdd,
        }

        userService
            .editUser(_id, updatedUserData)
            .then(() => {
                closeModal();
                updateList();
            })
            .catch(err => console.log(err));
    }

    const { username, email } = userData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" value={username} disabled onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="funds">
                <Form.Label>Add Funds</Form.Label>
                <Form.Control
                    type="number"
                    value={fundsToAdd}
                    onChange={handleInputChange}
                    name="funds"
                />
            </Form.Group>

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
                    <Form.Group controlId="cvv">
                        <Form.Label>CVV:</Form.Label>
                        <Form.Control
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-grid">
                <Button className="mt-2" variant="dark" type="submit" >Continue</Button>
            </div>
        </Form>
    )
}

export default AddFundsForm