import { Card } from "react-bootstrap"

import './ProductCard.css'
import { Link } from "react-router-dom"

const ProductCard = ({ title, image, _id }) => {

    return (
        <Card className="mb-3 ProductCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div className="d-grid">
                    <Link to={`/products/${_id}`} className="btn btn-dark btn-sm">Details</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard