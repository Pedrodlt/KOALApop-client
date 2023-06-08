import { Card } from "react-bootstrap"
import './UserCard.css'
import { Link } from "react-router-dom"

const UserCard = ({ username, avatar, email, _id }) => {

    return (
        <Card className="mb-3 UserCard">
            <div className="d-grid">
                <Link to={`/users/${_id}`} className="btn btn-dark btn-sm">
                    <Card.Img variant="top" src={avatar} />
                </Link>
            </div>

            <Card.Body className="userBody">
                <Card.Title className="userTitle" /* style={{ color: "black" }} */><h4>{username}</h4></Card.Title>

            </Card.Body>
        </Card>
    )
}

export default UserCard