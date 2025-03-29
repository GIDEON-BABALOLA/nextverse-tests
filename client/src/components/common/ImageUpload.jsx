
import { MdCloudUpload } from "react-icons/md"
import { useState } from "react"
import CloudinaryIcon from "../../styles/components/common/Icons/CloudinaryIcon"
import "../../styles/components/common/image-upload.css"
import { FaGoogleDrive } from "react-icons/fa"
import LoadingSpinner from "../Loaders/LoadingSpinner"
import DropBoxPicker from "../../styles/components/common/DropBoxPicker"
import { FaDropbox } from "react-icons/fa"
const ImageUpload = ({ onUpload, isLoading, setOpenModal, dropImage, selectedImage, dropboxSuccess, dropboxLoading}) => {
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [uploadMethod, setUploadMethod] = useState({
      localDevice : true,
      googleDrive : false,
      takePhoto : false,
      dropBox : false
    })
 const changeUploadMethod = (type) => {
  switch (type) {
    case "localDevice":
      setUploadMethod({
          localDevice : true,
          googleDrive : false,
          takePhoto : false,
          dropBox : false
        }
      )
      break;
    case "googleDrive": 
    setUploadMethod({
      localDevice : false,
      googleDrive : true,
      takePhoto : false,
      dropBox : false
    }
  )
      break;
      case "takePhoto": 
      setUploadMethod({
        localDevice : false,
        googleDrive : false,
        takePhoto : true,
        dropBox : false
      }
    )
        break;
        case "dropBox": 
        setUploadMethod({
          localDevice : false,
          googleDrive : false,
          takePhoto : false,
          dropBox : true
        }
      )
          break;
  
    default:
      break;
  }
 }
    const slideLine =(e, index, type) => {
      changeUploadMethod(type)
        setAttachmentLine(e.target.offsetLeft - 20)
        const allAttachments = document.querySelectorAll(".attach-picture-main")
        allAttachments.forEach((content) => content.classList.remove("active"))
        allAttachments[index].classList.add("active")
        }
        const allowDrop = (e) => {
          e.preventDefault() // Required to allow drop event
        } 
  return (
    <>
    <section className="attach-picture-options">
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257539/Assets/images/hdd_fpfs8i.svg"} width="15%"/>
      <span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 0, "localDevice") } > Local Device</span>
      </div>
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257535/Assets/images/google-drive_o6oi9s.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 1, "googleDrive") }  > Google Drive</span></div>
      {/* <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257531/Assets/images/camera_z43upm.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 2, "takePhoto") } > Take Photo</span></div> */}
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257533/Assets/images/dropbox_v5sl8k.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 3, "dropBox") } > DropBox</span></div>
      <div
      onClick={slideLine}
       className="slideline" style={{left : attachmentLine + "px"}}></div>
      {/* <div>Picture To Text</div> */}
    </section>
    <section className="attach-picture-main active" 
    onDragOver={allowDrop}
    onDrop={dropImage}>
    <span><MdCloudUpload size={80} color="#0071FF" /></span>
    <span>{ selectedImage ? <b> {selectedImage} </b>: <b>Drag and drop or Click button to upload image.</b>}</span>
    <span>Image Size Must Be Less Than <b>2MB</b></span>
    </section>
    <section className="attach-picture-main">
    <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257535/Assets/images/google-drive_o6oi9s.svg"} width="15%"/>
      Upload Pictures from your google drive
      <button className="connect-to-services-button"> <FaGoogleDrive color="white"/>Connect to Google Drive</button>
    </section>
    <section className="attach-picture-main">
      snap a picture
    </section>
    <section   className="attach-picture-main dropbox">
      <FaDropbox size={50} color="#0071FF"/>
      Upload Pictures from your dropbox
      <DropBoxPicker dropboxSuccess={dropboxSuccess} dropboxLoading={dropboxLoading}>
      </DropBoxPicker>

    </section>
    <input onChange={onUpload} type="file" id="file-input"
            style={{display: "none", cursor : "pointer"}}
            accept="image/*"
            ></input>
            { uploadMethod.localDevice &&
    <button className="attach-picture-button special-modal-client" onClick={() => {
      document.getElementById("file-input").click()
      setOpenModal(true)
    
      }}>
        
        { isLoading ? <LoadingSpinner /> : "Select Image"}
      </button>
}
    <div style={{display : "flex", flexDirection :"row", alignItems : "center", justifyContent : "center"}}>
    <span style={{fontSize : "10px"}}>Powered By</span> <CloudinaryIcon size={60}/>
    </div>
    </>
  )
}

export default ImageUpload