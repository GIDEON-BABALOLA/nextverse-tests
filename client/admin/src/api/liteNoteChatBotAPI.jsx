import axios from "axios"
export const litenotechatbot = axios.create({
    baseURL : "",
    withCredentials : false
})