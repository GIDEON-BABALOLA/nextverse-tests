import { useState } from "react";
import { litenotechatbot } from "../api/liteNoteChatBotAPI";
export const useGenerateChatBotResponse =  () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
    const generateResponse = async (incomingArray) => {
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
       try{
        const response = await litenotechatbot.get(`/${latestMessage[0].message}`)
        if(response && response.data){
            setIsLoading(false)
          const { audio } = response.data[0].phonetics.find((phonetic) => phonetic.audio.length > 2)
          const fullDefinition = response.data[0].meanings.map((index) => {
            return `${index.partOfSpeech.charAt(0).toUpperCase() + index.partOfSpeech.slice(1)}-definition:`  + " " + "It can be defined as," + " " +`${index.definitions[0].definition}`
          })
          const sentDefinition = fullDefinition.join(",") +  `The transription is given as ${response.data[0].phonetic}`
          const explanation = new myExplanation(sentDefinition, response.data[0].meanings[0].partOfSpeech)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message: explanation.messages[0].definition, audio : audio, error : false, time : new Date().toISOString()}]
        return alteredMessage
        }
       }catch(err){
        setError(true)
        const alteredMessage = [...incomingArray, {id : incomingArray[incomingArray.length - 1].id + 1, type: "incoming", message:  "Oops! Something went wrong. Please try again, This feature is still in development.", error : true, time : new Date().toISOString()}]
        return alteredMessage
       }
      }
      return { generateResponse, error, isLoading }
}