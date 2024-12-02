
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
export const useGenerateChatBotResponse =  () => {
  const apiKey = import.meta.env.VITE_REACT_GOOGLE_GEMINI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
    const generateResponse = async (incomingArray) => {
        setIsLoading(true)
       incomingArray.pop()
       const latestMessage = incomingArray.slice(-1)
       const prompt = latestMessage[0].message.toString()
       try{
        const result = await model.generateContent(prompt)
        if(result && result.response){
            setIsLoading(false)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message: result.response.text(), error : false, time : new Date().toISOString()}]
        return alteredMessage
        }
       }catch(err){
        setError(true)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message:  "Oops! Something went wrong. Please try again", error : true, time : new Date().toISOString()}]
        return alteredMessage
       }
      }
      return { generateResponse, error, isLoading }
}