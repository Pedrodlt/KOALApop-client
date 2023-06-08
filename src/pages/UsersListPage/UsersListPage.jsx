import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button } from "react-bootstrap"
import userService from "../../services/user.services"
import UsersList from "../../components/UsersList/UsersList"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"

const UserListPage = () => {

    const [users, setUsers] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        userService
            .getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <h1>USERS LIST</h1>
            {/* 
            {
                user && <Button variant="dark" size="sm" onClick={() => setShowModal(true)}>Create New User</Button>
            } */}

            <hr />
            <Row>
                {
                    !users
                        ?
                        <Loader />
                        :
                        <UsersList users={users} />//ESTE ES EL COMPONENTE PENDIENTE
                }
            </Row>

        </Container>
    )
}

export default UserListPage