import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import productService from "../../services/products.services"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"

const AcceptBidForm = ({ closeModal, updateList, bidOwner, productPrice, bidContent, bidOwnerFunds }) => {

    const [productSold, setProductSold] = useState(false)
    const { _id } = useParams()
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedProduct = {
            bought: productSold
        }
        const newFunds = user.funds + parseInt(bidContent)
        const dennyBid = bidOwnerFunds + parseInt(bidContent)


        productService
            .acceptBid(_id, updatedProduct, bidOwner)
            .then(() => {
                userService
                    .editUser(user?._id, { funds: newFunds })
                    .then(() => {
                        closeModal()
                        updateList()
                        navigate('/products/list')
                    })
            })
            .catch((err) => console.log(err))
        console.log('-----------------------', newFunds)
    };

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="bought">
                <Form.Check
                    type="checkbox"
                    label="Are you sure?"
                    checked={productSold}
                    onChange={() => setProductSold(!productSold)}
                />
            </Form.Group>

            <Button variant="dark" type="submit">
                SELL
            </Button>
        </Form>
    )
}

export default AcceptBidForm