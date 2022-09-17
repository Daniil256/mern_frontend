import axios from "axios";

// export const baseURL = 'http://localhost:4444'
export const baseURL = 'https://kryuchkov-mern.herokuapp.com'
// export const baseURL = process.env.REACT_APP_API_URL

const instance = axios.create({ baseURL })

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance