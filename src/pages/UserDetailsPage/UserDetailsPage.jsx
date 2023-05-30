import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import userService from "../../services/user.services"
import { Row, Col, Container, Button } from "react-bootstrap"
// import Loader from "../../components/Loader/Loader"


const UserDetailsPage = () => {

    const { _id } = useParams()


    const [user, setUsers] = useState()

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



    return (
        <Container>
            {
                !user
                    ?
                    <h1>CHARGING.....</h1>
                    // <Loader />
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

                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={user.avatar} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }

        </Container>
    )
}

export default UserDetailsPage