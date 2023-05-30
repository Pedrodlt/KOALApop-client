import { Col } from "react-bootstrap"
import UserCard from "../UserCard/UserCard"

const UsersList = ({ users }) => {

    return (
        users.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <UserCard {...elm} />
                </Col>
            )
        })
    )
}

export default UsersList