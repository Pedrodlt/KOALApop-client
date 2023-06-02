import { Routes, Route } from 'react-router-dom'
import HomePage from "./../pages/HomePage/HomePage"
import SignUpPage from "./../pages/SignUpPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProductsListPage from "../pages/ProductsListPage/ProductsListPage"
import ProductDetailsPage from '../pages/ProductsDetailsPage/ProductsDetailsPage'
import UsersListPage from '../pages/UsersListPage/UsersListPage'
import UserDetailsPage from '../pages/UserDetailsPage/UserDetailsPage'
// import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoutes from './PrivateRoutes'
import PurchasePage from '../pages/PurchasePage/PurchasePage'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products/list" element={<ProductsListPage />} />
            <Route path="/products/:_id" element={<ProductDetailsPage />} />
            <Route path="/users/list" element={<UsersListPage />} />
            <Route path="/users/:_id" element={<UserDetailsPage />} />
            <Route path="/products/:product_id/purchase" element={<PurchasePage />} />


            {/* <Route path="/users/:id" element={<PrivateRoutes />}>
                <Route path="" element={<UserDetailsPage />} />
            </Route> */}

            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes