import { Form, Button, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { ToastContext } from '../../contexts/toast.context'
import bidService from "../../services/bid.services"
import userService from "../../services/user.services"
import { BID_DENIED } from "../../consts/user-messages-consts"


const BidForm = ({ updateBids }) => {

    const { emitMessage } = useContext(ToastContext)

    const { user } = useContext(AuthContext)

    const [userFound, setUserFound] = useState()

    const { _id } = useParams()

    useEffect(() => {
        getUserLogged()
    }, [user])

    const getUserLogged = () => {
        userService
            .getOneUser(user?._id)
            .then(({ data }) => setUserFound(data))
            .catch(err => console.log(err))
    }


    const [bidData, setBidData] = useState({
        content: '',
        owner: user?._id

    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setBidData({ ...bidData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        console.log(userFound?.funds, bidData.content)

        userFound?.funds >= parseInt(bidData?.content)
            ?
            userService
                .checkFunds(bidData, userFound?.funds)
                .then(response => {
                    bidService
                        .saveBid(bidData)
                        .then(({ data }) => { return data })
                        .then((data) => {

                            bidService
                                .auctionProduct(_id, data._id)
                                .then(({ data }) => {
                                    updateBids()
                                    emitMessage("Bid Placed, Good Luck")
                                    setBidData({
                                        content: '',
                                        owner: user._id
                                    })

                                })
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            :
            emitMessage(BID_DENIED)
    }

    return (

        <Row className="" >
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Place Bid</Form.Label>
                    <Form.Control as="textarea" rows={1} name="content" onChange={handleInputChange} value={bidData.content} />
                </Form.Group>

                <div className="d-grid mt-3">
                    <Button variant="dark" type="submit">BID!</Button>
                </div>

            </Form>
        </Row >

    )
}


export default BidForm