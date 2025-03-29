import DropboxChooser from "react-dropbox-chooser";
import { FaDropbox } from "react-icons/fa";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner";
const DropBoxPicker = ({ dropboxSuccess, dropboxLoading }) => {
    const dropBoxAppKey = import.meta.env.VITE_REACT_DROPBOX_APP_KEY
    const onCancel = () => {
      console.log("user cancelled operation")
    }
  return (
    <>
    <DropboxChooser 
    appKey={dropBoxAppKey}
    success={dropboxSuccess}
    cancel={onCancel}
    multiselect={false}
    extensions={["image/jpeg", "image/png", "image/gif", "image/webp"]}>

        <button className="connect-to-services-button"> 
          {
            dropboxLoading ? 
            <LoadingSpinner />
            :
          <>
          <FaDropbox color="white"/> Connect to DropBox
          </>
}
          </button>   
</DropboxChooser>
</>
  )
}

export default DropBoxPicker