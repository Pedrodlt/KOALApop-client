import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts/theme.context'
import { AuthContext } from '../../contexts/auth.context'
import './Navigation.css'

const Navigation = () => {

    const { theme, switchTheme } = useContext(ThemeContext)

    const variant = theme === 'light' ? 'dark' : 'light'

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <Navbar expand="lg" bg={variant} variant={variant} className='mb-5'>
            <Container>
                <Navbar.Brand href="/" style={{ color: 'white' }}>_KOALApop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        user
                            ?
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link as="span">
                                        <Link to="/products/list" className='navTitle'>Shop</Link>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <Link to="/products/list" className='navTitle'>Auction House</Link>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <Link to="/users/list" className='navTitle'>Users</Link>
                                    </Nav.Link>
                                </Nav>
                                <Nav.Link as="span">
                                    <Link to="/profile" className='navTitle'>¡Heleu, {user.username}!</Link>
                                </Nav.Link>
                                <Nav.Link className='navTitle justify-content-right mx-2' style={{ color: 'white' }} as="span" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as="span">
                                    <Link to="/register" className='navTitle'>Sign Up</Link>
                                </Nav.Link>
                                <Nav.Link as="span">
                                    <Link to="/login" className='navTitle mx-2'>Login</Link>
                                </Nav.Link>
                            </>
                    }
                    {/* <div className="justify-content-end">
                        <Navbar.Text className='navTitle' style={{ color: 'white' }} onClick={switchTheme}>
                            {theme === 'dark' ? '☼' : '☾'}
                        </Navbar.Text>
                    </div>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation