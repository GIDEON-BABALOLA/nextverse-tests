import axios from "axios"
export const axiosConfig = axios.create({
    baseURL : "https://localhost:5000/api",
    withCredentials : true
})