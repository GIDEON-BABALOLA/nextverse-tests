
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { litenotechatbot } from "../api/liteNoteChatBotAPI";
export const useGenerateChatBotResponse =  () => {
  const apiKey = import.meta.env.VITE_REACT_GOOGLE_GEMINI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
    const generateResponse = async (incomingArray) => {
      console.log(incomingArray)
      console.log(Math.floor((Math.random() * 3) + 1))
        setIsLoading(true)
        class myExplanation {
          constructor(definition, partOfSpeech, transcription) {
              this.messages = [
                  {
                      definition: definition,
                      partOfSpeech : partOfSpeech,
                      transcription : transcription
                  }
              ];
          }
        }
       incomingArray.pop()
       const latestMessage = incomingArray.slice(-1)
       const prompt = latestMessage[0].message.toString()
       console.log(prompt)
       try{
        console.log("sharp now")
        const result = await model.generateContent(prompt)
        if(result && result.response){
          console.log("david")
          console.log(result.response.text());
            setIsLoading(false)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message: result.response.text(), audio : "", error : false, time : new Date().toISOString()}]
        return alteredMessage
        }
       }catch(err){
        console.log(err)
        setError(true)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message:  "Oops! Something went wrong. Please try again", error : true, time : new Date().toISOString()}]
        return alteredMessage
       }
      }
      return { generateResponse, error, isLoading }
}