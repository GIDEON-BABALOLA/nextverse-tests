import axios from "axios"
const baseURL = import.meta.env.VITE_REACT_BACKEND_SERVER_URL
export const axiosConfig = axios.create({
    baseURL : "https://litenote.onrender.com/api",
    withCredentials : true
})