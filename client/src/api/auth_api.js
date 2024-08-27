import axios from 'axios'

export const loginRequest = async(userData) => {
    try {
        return await axios.post('http://localhost:3000/api/login', userData)
    } catch (error) {
        console.log(error)
    }
}