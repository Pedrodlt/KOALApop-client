import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import productService from "../../services/products.services"
import { Row, Col, Container, Button, Modal, Carousel, Card } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import EditProductForm from '../EditProductPage/EditProductPage'
import Loader from "../../components/Loader/Loader"
import './ProductsDetailsPage.css';
import BidForm from "../../components/BidForm/BidForm"
import AcceptBidForm from "../../components/AcceptBidForm/AcceptBidForm"
import userService from "../../services/user.services"

const ProductDetailsPage = () => {

    const { _id } = useParams()
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [showModal3, setShowModal3] = useState(false)

    const [product, setProduct] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        loadProduct()
    }, [product])

    const loadProduct = () => {
        productService
            .getOneProduct(_id)
            .then(({ data }) => {
                setProduct(data)
            })
            .catch(err => console.log(err))
    }
    const handleDelete = () => {

        productService
            .deleteProduct(_id)
            .then(() => navigate('/products/list'))
            .catch(err => console.log(err))
    }



    const handleDenny = (e) => {
        const { bidOwnerId, bidAmount, bidOwnerFunds, bidID } = JSON.parse(e.target.value);

        console.log(bidOwnerId);
        console.log(bidAmount);
        console.log(bidOwnerFunds);
        console.log('-----------', bidID)

        const newFunds = parseInt(bidAmount) + bidOwnerFunds
        console.log(newFunds);

        userService
            .editUser(bidOwnerId, { funds: newFunds })
            .then(() => {
                productService
                    .denyBid(_id, bidID)
                    .then(({ data }) => {
                        console.log(data)
                        setProduct(data)
                        // navigate('/products/list')
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className="detailsCard">
                {
                    !product
                        ?
                        <Loader />
                        :
                        <>
                            <h1 className="profileTitle">{product.title} Details</h1>

                            {

                                user?._id !== product?.owner._id
                                    ?
                                    <>
                                        <Link to={`/products/${_id}/purchase`}>
                                            <Button className="buttonBuy" variant="warning" size="sm" id={_id}>BUY NOW</Button>
                                        </Link>
                                    </>
                                    :
                                    <p>Your Product</p>
                            }
                            <hr />


                            <Row>

                                <Col md={{ span: 4 }}>
                                    <h5>{product.category}</h5>
                                    <p>{product.description}</p>
                                    <p>{product.price} €</p>
                                    <hr />

                                    <Link to="/products/list">
                                        <Button variant="dark">Back to Gallery</Button>
                                    </Link>


                                    {
                                        user?._id === product?.owner._id
                                        &&
                                        <>
                                            <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>EDIT</Button>
                                            <Button variant="alert" size="sm" onClick={() => handleDelete()}>DELETE</Button>
                                        </>
                                    }

                                </Col>

                                <Col md={{ span: 4 }}>

                                    <Carousel>
                                        {product.image?.map((img, index) => (
                                            <Carousel.Item key={index}>
                                                <img className="d-block w-100" src={img} alt="" />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                </Col>
                                {
                                    user?._id !== product?.owner._id
                                        ?
                                        <Col md={{ span: 4 }}>
                                            <BidForm updateBids={loadProduct} />
                                        </Col>
                                        :
                                        <Col md={{ span: 4 }}>
                                            YOUR PRODUCT
                                        </Col>
                                }

                            </Row>

                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditProductForm closeModal={() => setShowModal(false)} updateList={loadProduct} />
                                </Modal.Body>
                            </Modal>
                        </>
                }
            </div>

            <h5 className="textAuction">Auction House</h5>
            {
                product?.bids?.map(bid => {
                    return (
                        <Container>
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <div className="bidCard">
                                        <>
                                            <Card.Body>

                                                <Card >

                                                    <p> <img src={bid.owner?.avatar} alt="" />{bid.content} €</p>

                                                    {
                                                        user?._id === product?.owner._id
                                                        &&
                                                        <>
                                                            <Button variant="warning" size="sm" onClick={() => setShowModal3(true)}>ACCEPT</Button>
                                                            <Button variant="alert" size="sm" value={JSON.stringify({ bidOwnerId: bid?.owner?._id, bidAmount: bid?.content, bidOwnerFunds: bid?.owner?.funds, bidID: bid?._id })} onClick={handleDenny}>DENY</Button>
                                                            {/* <Button variant="alert" size="sm" value={{ ownerId: bid?.owner?._id, content: bid?.content }} onClick={handleDenny}>DENY</Button> */}
                                                        </>
                                                    }
                                                    <Modal show={showModal3} onHide={() => setShowModal3(false)}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>ACCEPT BID ?</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <AcceptBidForm closeModal={() => setShowModal3(false)} updateList={loadProduct} productPrice={product?.price} bidContent={bid.content} bidOwner={bid?.owner?._id} bidOwnerFunds={bid?.owner?.funds} />
                                                        </Modal.Body>
                                                    </Modal>
                                                </Card>
                                            </Card.Body>

                                        </>
                                    </div >
                                </Col>
                            </Row>
                        </Container>
                    )
                })
            }


        </Container>
    )
}

export default ProductDetailsPage