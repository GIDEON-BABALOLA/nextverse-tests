import { useState, useEffect, useRef } from "react"
import useDrivePicker from 'react-google-drive-picker'
import axios from "axios" 
import { useToastContext } from "../../../hooks/useToastContext"
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner"
import { FaGoogleDrive } from "react-icons/fa"
const GoogleDrivePicker = ({ googleDriveSuccess }) => {
const googleDriveAPIClientId = import.meta.env.VITE_REACT_GOOGLE_DRIVE_CLIENT_ID
const googleDriveAPIKey =  import.meta.env.VITE_REACT_GOOGLE_DRIVE_API_KEY
const [openPicker, authResponse] = useDrivePicker(); 
const [isLoading, setIsLoading] = useState(false)
const [accessToken, setAccessToken] = useState("") 
const { showToast } = useToastContext()
const accessTokenRef = useRef(null)
  useEffect(() => {
    if(authResponse && authResponse.access_token){
      console.log(authResponse)
setAccessToken(authResponse.access_token)
accessTokenRef.current = authResponse.access_token
    }
  }, [authResponse])
  const handleOpenPicker = () => {
     openPicker({
    clientId: googleDriveAPIClientId,
    developerKey: googleDriveAPIKey,
    viewId: "DOCS_IMAGES",
    // ✅ Remove token on first open to let picker handle auth
    showUploadView: true,
    showUploadFolders: true,
    supportDrives: true,
    multiselect: false,
    callbackFunction: async (data) => {
try{
    if (data.action === "picked") {
setIsLoading(true)
const token = accessTokenRef.current
const file = data.docs[0];
const fileId = file.id;
const response =  await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      params: {
        alt: "media"
      },
      responseType :"blob",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const blob = response.data
    const imageURL = URL.createObjectURL(blob)
    const myFile = new File([blob], data.docs[0].name, { type: blob.type });
    googleDriveSuccess(imageURL, myFile);
setIsLoading(false)

  }
}
catch(error){
setIsLoading(false)
showToast("Error", "Error while picking image from Google Drive", false)
}
    }
  });
  }
  return (
    <div>
            <button className="connect-to-services-button" onClick={() => handleOpenPicker()}>
                { isLoading ? <LoadingSpinner /> : <>
               <FaGoogleDrive color="white"/> Connect to Google Drive
               </>}
               
               </button>

</div>
  )
}

export default GoogleDrivePicker