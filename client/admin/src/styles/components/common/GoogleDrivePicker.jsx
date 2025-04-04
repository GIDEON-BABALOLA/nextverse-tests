import { useState, useEffect } from "react"
import useDrivePicker from 'react-google-drive-picker'
import { FaGoogleDrive } from "react-icons/fa"
const GoogleDrivePicker = ({ googleDriveSuccess }) => {
  const googleDriveAPIClientId = import.meta.env.VITE_REACT_GOOGLE_DRIVE_CLIENT_ID
  const googleDriveAPIKey =  import.meta.env.VITE_REACT_GOOGLE_DRIVE_API_KEY
    const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: googleDriveAPIClientId,
      developerKey: googleDriveAPIKey,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: googleDriveSuccess
    })
  }
  return (
    <div>
            <button className="connect-to-services-button" onClick={() => handleOpenPicker()}> <FaGoogleDrive color="white"/> Connect to Google Drive</button>

</div>
  )
}

export default GoogleDrivePicker