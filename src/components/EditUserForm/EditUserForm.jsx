import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import userService from "../../services/user.services"
import uploadServices from "../../services/upload.services"
import { useParams } from "react-router-dom"

const EditUserForm = ({ closeModal, updateList }) => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        avatar: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { _id } = useParams()


    const handleInputChange = event => {
        const { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        userService
            .editUser(_id, userData)
            .then(() => {
                closeModal()
                updateList()
            })
            .catch(err => console.log(err))
    }

    const { username, email } = userData

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUserData({ ...userData, avatar: res.data.cloudinary_url })
                setLoadingImage(false)

            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>@Email</Form.Label>
                <Form.Control type="text" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage} >{loadingImage ? 'Loading Image...' : 'Update'}</Button>
            </div>
        </Form>
    )
}

export default EditUserForm