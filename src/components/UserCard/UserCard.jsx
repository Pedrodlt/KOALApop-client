import { Card } from "react-bootstrap"
import './UserCard.css'
import { Link } from "react-router-dom"

const UserCard = ({ username, avatar, email, _id }) => {

    return (
        <Card className="mb-3 UserCard">
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <div className="d-grid">
                    <Link to={`/users/${_id}`} className="btn btn-dark btn-sm">Details</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UserCard