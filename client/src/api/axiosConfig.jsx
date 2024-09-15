import axios from "axios"
export const axiosConfig = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : true
})