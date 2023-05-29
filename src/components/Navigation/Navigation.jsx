// import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { ThemeContext } from '../../contexts/theme.context'
// import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    // const { theme, switchTheme } = useContext(ThemeContext)

    // const variant = theme === 'light' ? 'dark' : 'light'

    // const { user, logout } = useContext(AuthContext)

    return (
        <Navbar bg="dark" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand href="#home">Coasters MERN!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as="span">
                            <Link to="/">Inicio</Link>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <Link to="/galeria">Galeria</Link>
                        </Nav.Link>
                        {/* {
                            user
                                ?
                                <>
                                    <Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link>

                                    <Nav.Link as="span">
                                        <Link to="/perfil">¡Hola, {user.username}!</Link>
                                    </Nav.Link>

                                </>
                                :
                                <>
                                    <Nav.Link as="span">
                                        <Link to="/register">Registro</Link>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <Link to="/login">Login</Link>
                                    </Nav.Link>
                                </>
                        } */}
                    </Nav>
                    {/* <div className="justify-content-end">
                        <Navbar.Text onClick={switchTheme}>
                            {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
                        </Navbar.Text>
                    </div> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation