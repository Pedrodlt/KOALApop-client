import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from "react-router-dom"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
<<<<<<< HEAD
        password: '',
=======
        password: ''
>>>>>>> 3f081a890c6c10f8ec731abf25d348a0f04ee491
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
<<<<<<< HEAD
            .then(({ data }) => navigate('/'))
=======
            .then(({ data }) => navigate('/galeria'))
>>>>>>> 3f081a890c6c10f8ec731abf25d348a0f04ee491
            .catch(err => console.log(err))
    }


    const { username, password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>USERNAME</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>@EMAIL</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <div className="d-grid">
<<<<<<< HEAD
                <Button variant="dark" type="submit">REGISTER</Button>
=======
                <Button variant="dark" type="submit">Registrarme</Button>
>>>>>>> 3f081a890c6c10f8ec731abf25d348a0f04ee491
            </div>

        </Form>
    )
}

export default SignupForm