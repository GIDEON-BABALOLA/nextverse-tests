import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAllReportsStatistics = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const initialReportCount = {
        totalReports : 0,
        clearedReports :0,
        openedReports :0,
        pendingReports :0
    }
    const [reportCount, setReportCount] = useState(initialReportCount)
    const getAllReportsStatistics = async () => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/report/get-all-reports-statistics", {
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    console.log(response.data);
    
    setReportCount({
        totalReports : response.data.totalReports,
        clearedReports : response.data.clearedReports,
        openedReports : response.data.openedReports,
        pendingReports : response.data.pendingReports   
    })
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setReportCount(initialReportCount)
            setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getAllReportsStatistics, isLoading, error,  statusCode, reportCount} 
}
