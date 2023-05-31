import { useContext } from "react"
import { AuthContext } from './../../contexts/auth.context'
import { Container } from 'react-bootstrap'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)


    return (
        <Container>
            <h1>¡Heleu, {user.username}!</h1>
            <hr />
        </Container>
    )
}

export default ProfilePage