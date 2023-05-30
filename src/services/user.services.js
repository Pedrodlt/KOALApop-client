import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/users`
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    getOneUser(user_id) {
        return this.api.get(`/getOneUser/${user_id}`)
    }

    editUser(user_id, userData) {
        return this.api.post('/editUser', user_id, userData)
    }

    deleteUser(user_id) {
        return this.api.post('/deleteUser', user_id)
    }
}

const userService = new UserService()

export default userService