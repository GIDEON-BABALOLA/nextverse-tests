import axios from "axios"
const baseURL = import.meta.env.VITE_REACT_BACKEND_SERVER_URL
export const axiosConfig = axios.create({
    baseURL : baseURL,
    withCredentials : true,
});
export const axiosProperties = {
    timeout : 10000 // aborts request after 10 seconds
}