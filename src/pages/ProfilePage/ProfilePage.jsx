import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../contexts/auth.context'
import { Container } from 'react-bootstrap'
import userService from "../../services/user.services"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState(null)

    console.log(profileUser, user)

    useEffect(() => {
        userService
            .getOneUser(user._id)
            .then(({ data }) => setProfileUser(data))
            .catch(err => console.log(err))
    }, [])

    // TODO: OBTENER INFO DE USUARIO DE LA API

    return (
        <Container>
            <h1>¡Heleu, {profileUser?.username}!</h1>
            <hr />
        </Container>
    )
}

export default ProfilePage