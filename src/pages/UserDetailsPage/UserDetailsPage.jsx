import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import userService from "../../services/user.services"
import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap"
import EditUserForm from "../../components/EditUserForm/EditUserForm"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import './UserDetailsPage.css';
import AddFundsForm from "../../components/AddFundsForm/AddFundsForm"


const UserDetailsPage = () => {

    const { _id } = useParams()

    const { user, logout } = useContext(AuthContext)

    const [profileUser, setProfileUser] = useState()

    const [showModalEdit, setshowModalEdit] = useState(false)

    const [showModalFunds, setshowModalFunds] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getOneUser(_id)
            .then(({ data }) => {
                setProfileUser(data)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        userService
            .deleteUser(_id)
            .then(() => {
                logout()
                navigate('/users/list')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className="profileCard">
                {
                    !profileUser
                        ?
                        <Loader />
                        :
                        <>
                            <h1 className="profileTitle">User Profile: {profileUser.username}!</h1>
                            <hr />

                            <Row>

                                <Col md={{ span: 8 }}>
                                    <p>Email: {profileUser.email}</p>

                                    {
                                        user?._id === profileUser?._id &&
                                        <p>Wallet💰 : {profileUser.funds}€
                                            <Button className="mx-3 buttonAdd" size="sl" onClick={() => setshowModalFunds(true)}>Add Funds</Button>
                                        </p>
                                    }
                                    <hr />
                                    <h5>Purchased Products</h5>
                                    <Row>
                                        {
                                            profileUser?.purchasedProduct.map((eachPurchasedProduct) => {
                                                console.log(eachPurchasedProduct.image)
                                                return (

                                                    <>
                                                        <Col className="mb-3" md={{ span: 3 }}>
                                                            <Card className="mb-3 PurchasedProductCard">
                                                                <Link to={`/products/${eachPurchasedProduct._id}`}>
                                                                    <Card.Img variant="top" src={eachPurchasedProduct.image} />
                                                                </Link>
                                                                <Card.Body>
                                                                    <Card.Title>{eachPurchasedProduct.title}</Card.Title>
                                                                </Card.Body>
                                                            </Card >
                                                        </Col>
                                                    </>
                                                )
                                            })
                                        }
                                    </Row>
                                    <hr />

                                    <Link to="/users/list">
                                        <Button size="sl" variant="dark" >BACK</Button>
                                    </Link>

                                    {
                                        user?._id === _id
                                        &&
                                        <>

                                            <Button className="mx-2 buttonEdit" variant="warning" size="sl" onClick={() => setshowModalEdit(true)}>EDIT</Button>
                                            <Button variant="danger" size="sl" onClick={() => handleDelete()}>DELETE</Button>
                                        </>
                                    }

                                </Col>

                                <Col md={{ span: 4 }}>
                                    <img src={profileUser.avatar} style={{ width: '100%', borderRadius: '40%' }} />
                                </Col>

                            </Row>
                            {/* EDIT FORM */}
                            <Modal show={showModalEdit} onHide={() => setshowModalEditEdit(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditUserForm closeModal={() => setshowModalEdit(false)} updateList={loadUser} />
                                </Modal.Body>
                            </Modal>
                            {/* FUNDS FORM */}
                            <Modal show={showModalFunds} onHide={() => setshowModalFunds(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddFundsForm closeModal={() => setshowModalFunds(false)} updateList={loadUser} />
                                </Modal.Body>
                            </Modal>
                        </>
                }
            </div>

        </Container>
    )
}

export default UserDetailsPage