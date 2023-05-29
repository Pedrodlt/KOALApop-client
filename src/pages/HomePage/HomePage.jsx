import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePage = () => {

    return (
        <Container>

            <Row>

                <Col md={{ span: 6, offset: 3 }}>

                    <h1>Welcome to KOALApop!</h1>
                    <hr />
                    <Link to="/galeria">
                        <Button variant="dark">Ir a la galería</Button>
                    </Link>

                </Col>

            </Row>

        </Container>
    )
}

export default HomePage