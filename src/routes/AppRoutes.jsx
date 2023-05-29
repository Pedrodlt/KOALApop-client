import { Routes, Route } from 'react-router-dom'
import HomePage from "./../pages/HomePage/HomePage"
import SignUpPage from "./../pages/SignUpPage/SignUpPage"
import LoginPage from "../pages/LoginPage/LoginPage"



const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* <Route path="/perfil" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route> */}

            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes