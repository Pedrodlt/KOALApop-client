import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import userService from "../../services/user.services"
import { Row, Col, Container, Button, Modal } from "react-bootstrap"
import EditUserForm from "../../components/EditUserForm/EditUserForm"
import Loader from "../../components/Loader/Loader"

const UserDetailsPage = () => {

    const { _id } = useParams()

    // const{user}=useContext(Aut)

    const [user, setUsers] = useState()

    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getOneUser(_id)
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {

        userService
            .deleteUser(_id)
            .then(() => navigate('/users/list'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            {
                !user
                    ?
                    // <h1>CHARGING.....</h1>
                    <Loader />
                    :
                    <>
                        <h1>Detalles de {user.username}</h1>
                        <hr />

                        <Row>

                            <Col md={{ span: 6 }}>
                                <h3>Especificaciones</h3>
                                <p>{user.email}</p>
                                <hr />

                                <Link to="/users/list">
                                    <Button variant="dark">BACK</Button>
                                </Link>

                                {
                                    user?._id === _id
                                    &&
                                    <>
                                        <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>EDIT</Button>
                                        <Button variant="warning" size="sm" onClick={() => handleDelete()}>DELETE</Button>
                                    </>
                                }
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={user.avatar} style={{ width: '100%' }} />
                            </Col>

                        </Row>

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditUserForm closeModal={() => setShowModal(false)} updateList={loadUser} />
                            </Modal.Body>
                        </Modal>
                    </>
            }

        </Container>
    )
}

export default UserDetailsPage