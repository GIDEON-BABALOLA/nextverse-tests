
import { axiosConfig } from "../api/axiosConfig"
export const getUser = async () => {
try{
    const response = await axiosConfig.get("/user/get-current-user")
    if(response && response.data){
        return response.data
    }
}catch(error){
    console.log(error)
    return null
}
}