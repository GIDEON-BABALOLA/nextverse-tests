import { MdAttachFile, MdCloudUpload } from "react-icons/md"
import SpecialModal from "../../common/SpecialModal"
import CloudinaryIcon from "../../../styles/components/common/Icons/CloudinaryIcon"
import { useCreateAStory } from "../../../hooks/useCreateAStory";
import useWindowSize from "../../../hooks/useWindowSize";
import ImageUpload from "../../common/ImageUpload";
import { useToastContext } from "../../../hooks/useToastContext";
import CommonAvatar from "../../../components/common/CommonAvatar"
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import Toast from "../../../components/common/Toast"
import { FaGoogleDrive } from "react-icons/fa";
import { FaBold,
    FaItalic,
   FaUnderline,
   FaStrikethrough,
   FaSuperscript,
   FaSubscript,
   FaListOl,
   FaList,
   FaLink,
   FaUnlink,
   FaAlignLeft,
   FaAlignRight,
   FaAlignCenter,
   FaAlignJustify,
   FaIndent,
   FaClipboard,
   FaOutdent
 
  } from "react-icons/fa"
  import toast, { Toaster } from "react-hot-toast";
 import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
 import { useEffect, useRef, useState } from "react";
 import "../../../styles/components/Dashboard/text-editor.css"
const TextEditor = () => {
  const { createAStory, isLoading, error, data, statusCode } = useCreateAStory()
  const [storyPictures, setStoryPictures] = useState([{}, {}, {}])
  const [selectedImage, setSelectedImage] = useState()
  const [storyContent, setStoryContent] = useState()
  const [storyTitle, setStoryTitle] = useState()
  const { width } = useWindowSize();
  const [wordCount, setWordCount] = useState(0)
  const [attachmentModal, setAttachmentModal] = useState(false)
  const [titleCategoryModal, setTitleCategoryModal] = useState(false)
  const { showToast } = useToastContext()
    const alignButtons = useRef([])
    const spacingButtons = useRef([])
    const formatButtons = useRef([])
    const scriptButtons = useRef([])
    const fontName = useRef()
    const textAreaRef = useRef()
    const fontSizeRef = useRef()

    //initial settings
    //Highlight clicked button
    const copyTextArea = () => {
      if(textAreaRef.current.innerText == ""){
        toast.error("pls enter your text")
        return;
      }
      navigator.clipboard.writeText(textAreaRef.current.innerText).then(function() {
      toast.success("Text is copied to clipboard")
    }).catch(function(error) {
        console.error('Could not copy text: ', error);
    });
    }
    const scrollTextArea = (e) => {
textAreaRef.current.style.height ="63px"
textAreaRef.current.style.height ="auto"
textAreaRef.current.style.height =`${e.target.scrollHeight}px`
    }
    const highlighterRemover = (className) => {
   
        className.forEach((button) => {
       button.classList.remove("active");
    });
    };
const highlighter = (className, needsRemoval) => {
  
  className.forEach((button) => {
    if(button){
      button.addEventListener("click", () => {
        if (needsRemoval) {
            let alreadyActive = false;
         if ( button.classList.contains("active"))  {
            alreadyActive = true;
         }
         
         highlighterRemover(className);
         if(!alreadyActive) {
            button.classList.add("active");
         }
        }
         else {
            button.classList.toggle("active");
        }
            });
    }
    });
};
const submitNote = () => {
// const cleanHtml = sanitizeHtml(noteContent, {
// allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "a"], // Allow only safe tags
// allowedAttributes: { "a": ["href"] }, // Allow only safe attributes
//   });
const formData = new FormData();
formData.append("picture", file)
setTitleCategoryModal(true)
    const cleanHtml = storyContent
    if(wordCount == 0 || !cleanHtml ){
      showToast("Error", "Please Enter The Content Of Your Story", false)
      return;
    }
createAStory(storyTitle, cleanHtml)
                    
                  }
const handlePlaceholder = () => {
  const editor = textAreaRef.current;
  const textWithoutTags = editor.innerText.replace(/\s+/g, ' ').trim()
  setWordCount(textWithoutTags.length)
  if (editor) {
    setStoryContent(editor.innerHTML)
  }
  if (editor.innerText.trim().length === 0) {
  editor.setAttribute("data-placeholder", "Let Your Pen Speak...");
  editor.classList.add("empty"); 
  } else {
  editor.removeAttribute("data-placeholder");
  editor.classList.remove("empty"); 
  }
};
const attachmentFunction = () => {
  setAttachmentModal(true)
}
const initializer = () => {
    //function calls for highlighting buttons
    //no highlights for link, unlink, lists, undo, redo since they are one time operation
    highlighter(alignButtons.current, true);
    highlighter(spacingButtons.current, true);
    highlighter(formatButtons.current, false);
    highlighter(scriptButtons.current, true);
    
    //create options for font names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
       fontName.current.appendChild(option);
     });
    
    //fontSize allows only till 7
    for (let i = 1; i <=7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.current.appendChild(option);
    }
    fontSizeRef.current.value = 3;
    };
    
    const optionButtons = (e) => {
        const correctId = e.currentTarget.closest('button').id;
        if(e.target.id == ""){
            modifyText(correctId, false, null);
            return
        }
        modifyText(e.target.id, false, null);       
    }
    const advancedOptionButtons = (e) => {
        modifyText(e.target.id, false, e.target.value);
    }
    const linkButton = (e) => {
        let id;
        const correctId = e.currentTarget.closest("button").id
        if(e.target.id == ""){
            id = correctId
        }else{
            id = e.target.id
        }
        let userLink = prompt("Enter a URL");
        //if the link has http then pass directly else add http 
        if(/http/i.test(userLink)) { 
            modifyText(id, false, userLink);
        }else{
            userLink = "http://" + userLink;
            modifyText(id, false, userLink);
        }
    }
    //main logic
const modifyText = (command,defaultui, value) => {
document.execCommand(command, defaultui, value);
};
    let  fontList = [
        "Arial",
        "Verdana",
        "Times New Roman",
        "Garamond",
        "Georgia",
        "Courier New",
        "Poppins",
        "cursive",
      ];
      useEffect(() => {
initializer()
      }, [])
    const dropImage = () => {

    }
    const dropboxSuccess = (file) => {
      const fileUrl = file[0].link.replace("dl=0", "raw=1");
      if([...storyPictures].length === 3){
        setAttachmentModal(false)
        showToast("Error", "You can only upload a maximum of three images", false)
        return
      }
      setStoryPictures((prev) => {
        return [...prev, { name : file[0].name, src : fileUrl, source : "cloud"}]
      })
      setAttachmentModal(false)
    }
    const googleDriveSuccess = () => {

    }
    const onUpload = (e) => {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
      if(!validTypes.includes(file.type)){
        showToast("Error", "Please Choose An Image File", false)
        return;
      }
      if(file.size > maxSize){
        showToast("Error", "Image Size Must Be Less Than 2MB", false)
        return;
      }
      if([...storyPictures].length === 3){
        setAttachmentModal(false)
        showToast("Error", "You can only upload a maximum of three images", false)
        return
      }
      setSelectedImage(file.name)
      e.target.value = ""
      const imageURL = URL.createObjectURL(file);
      setStoryPictures((prev) => {
        return [...prev, { name : file.name, src : imageURL, source : "local"}]
      })
    }
const removeStoryPicture = (pic) => {
const newStoryPictures = [...storyPictures].filter((picture) => picture.name !== pic.name)
setStoryPictures(newStoryPictures)
}
    useEffect(() => {
if(selectedImage){
  setTimeout(() => {
    setAttachmentModal(false)  
    setSelectedImage("")  
  }, 500);
  

}
    }, [selectedImage])
    const previewTitleCategoryContent = () => {
return <div>
  Hi there
</div>
    }
  return (
    <>
    <Toast />
        <div className="litenote-text-editor-container">
      <SpecialModal 
           openModal={attachmentModal}
           setOpenModal={setAttachmentModal}
           width={width < 768 ? 350 : 500}
           height={400}
           content={
           <ImageUpload
           isLoading={isLoading}
           dropboxLoading={isLoading}
           dropImage={dropImage} 
           dropboxSuccess={dropboxSuccess}
           googleDriveSuccess={googleDriveSuccess}
           onUpload={onUpload}
           setOpenModal={setAttachmentModal}
           selectedImage={selectedImage}
           />
          }
           />
           <SpecialModal 
            openModal={titleCategoryModal}
            setOpenModal={setTitleCategoryModal}
            width={width < 768 ? 350 : 500}
            height={400}
            content={previewTitleCategoryContent()}
           />
    <Toaster />

    <h5 style={{color : "#CED4DA"}}>Text</h5>
    <h3 style={{fontWeight : "800"}}>Editor</h3>
    <section >
    <div className="litenote-text-editor-options">
   {/* textFormat */}
   <button id="bold" className="litenote-text-editor-option-button
   format" onClick={optionButtons} ref={el => formatButtons.current.push(el)}
  //  style={{background : "#e6eef9", color : "black"}}
    >
   <FaBold />
   </button>
   <button id="italic" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={el => formatButtons.current.push(el)}>
  <FaItalic />
   </button>
   <button id="underline" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={el => formatButtons.current.push(el)} >
   <FaUnderline />
   </button>
   <button id="strikethrough" className="litenote-text-editor-option-button
   format" onClick={optionButtons}  ref={el => formatButtons.current.push(el)}  >
 <FaStrikethrough/>
   </button>
   <button id="superscript" className="litenote-text-editor-option-button
   format" onClick={optionButtons}    ref={el => scriptButtons.current.push(el)} >
   <FaSuperscript />
   </button>
   <button id="subscript" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={el => scriptButtons.current.push(el)}>
   <FaSubscript />
   </button>

   {/* list */}
   <button id="insertOrderedList" 
   className="litenote-text-editor-option-button" onClick={optionButtons} >
  <FaListOl />
   </button>
   <button id="insertUnorderedList" className="litenote-text-editor-option-button" onClick={optionButtons} >
  <FaList />
   </button>

   {/* undoRedo */}
   <button id="undo" className="litenote-text-editor-option-button" onClick={optionButtons} >
    <FaRotateLeft />
    </button>
    <button id="redo" className="litenote-text-editor-option-button" onClick={optionButtons} >
     <FaRotateRight />
     </button>

    {/* link */}
     <button
     onClick={linkButton}
      id="createLink" className="litenote-text-editor-adv-option-button litenote-text-editor-option-button" >
       <FaLink />
     </button>
     <button 
      onClick={linkButton}
     id="unlink" className="litenote-text-editor-option-button" >
        <FaUnlink />
     </button>

 {/* Alignment */}
   <button id="justifyLeft" className="litenote-text-editor-option-button align" onClick={optionButtons} ref={el => alignButtons.current.push(el)}>
   <FaAlignLeft />
 </button>
   <button id="justifyCenter" 
   className="litenote-text-editor-option-button align" onClick={optionButtons} ref={el => alignButtons.current.push(el)}>
   <FaAlignCenter />
 </button>
 <button id="justifyRight" className="litenote-text-editor-option-button
 align" onClick={optionButtons}  ref={el => alignButtons.current.push(el)} >
   <FaAlignRight />
 </button>
 <button id="justifyFull" className="litenote-text-editor-option-button
 align" onClick={optionButtons}  ref={el => alignButtons.current.push(el)} >
   <FaAlignJustify />
 </button>
 <button id="indent" className="litenote-text-editor-option-button
 spacing" onClick={optionButtons}  ref={el => spacingButtons.current.push(el)} >
    <FaIndent />
 </button>
 <button id="outdent" className="litenote-text-editor-option-button
 spacing" onClick={optionButtons}  ref={el => spacingButtons.current.push(el)}>
   <FaOutdent />

 </button>
 <button id="outdent" className="litenote-text-editor-option-button
 spacing" onClick={copyTextArea}   >
   <FaClipboard />
 </button>

{/* headings */}
 <select id="formatBlock"
 className="litenote-text-editor-adv-option-button" onClick={optionButtons} >
 <option value="H1" style={{fontSize : "2rem", fontWeight : 900}}> Heading 1</option>
 <option value="H2" style={{fontSize : "1.7rem", fontWeight : 900}} >Heading 2</option>
 <option value="H3" style={{fontSize : "1.4rem", fontWeight : 900}}>Heading H3</option>
 <option value="H4" style={{fontSize : "1.1rem", fontWeight : 900}}>Heading H4</option>
 <option value="H5" style={{fontSize : "0.8rem", fontWeight : 900}}> Heading H5</option>
 <option value="H6" style={{fontSize : "0.5rem", fontWeight : 900}} > Heading H6</option>
 </select>

 {/* font */}
 <select id="fontName" ref={fontName}
 className="litenote-text-editor-adv-option-button" onChange={advancedOptionButtons} > </select>
 <select id="fontSize"ref={fontSizeRef}
 className="litenote-text-editor-adv-option-button" onChange={advancedOptionButtons} ></select>

 {/* color */}
 <div className="litenote-text-editor-input-wrapper no-outline">
   <input type="color" id="foreColor" value="#777777"
   className="litenote-text-editor-adv-option-button " onChange={advancedOptionButtons} />
   <span htmlFor="foreColor">
   <b> Font Color</b>
  </span>
 </div>
 <div className="litenote-text-editor-input-wrapper">
   <input type="color" id="backColor"
   className="litenote-text-editor-adv-option-button" onChange={advancedOptionButtons} />
   <span htmlFor="backColor">
   <b>Highlight Color</b>
   </span>
 </div>
 <span style={{cursor : "pointer", fontSize : "1.3rem"}} 
 onClick={attachmentFunction}
 className="attach-picture-icon special-modal-client"
 >  <MdAttachFile size={20}/>Attach Picture</span>
 <span style={{fontFamily : "Poppins"}}>{wordCount} words</span>
    </div>
   
    {/* I am going to replace this input with auto resize text input when I find it online */}
       {/* I am going to replace this input with auto resize text input when I find it online */}
       {
      storyPictures.map((pic, index) => (
        <div className="text-editor-small-image-container" key={index}>
          <CommonAvatar
          style={{height : "50px", width: "80px"}}
          image={"https://res.cloudinary.com/doctr0fct/image/upload/v1733302193/Story/user8%40gmail.com/tmnwdkvk3gon0rgrr3hs.jpg"}
          className="text-editor-small-image-preview"
          />
        <button className="text-editor-small-cancel-btn" >×</button>
      </div>
      ))
    }
    <div 
    ref={textAreaRef}
    style={{height : "59px", border : "1px solid transparent"}}
    id="editable"
    className="textArea empty" 
    onInput={scrollTextArea}
    onBlur={scrollTextArea}
    spellCheck="true"
    onKeyUp={handlePlaceholder}
    data-placeholder="Let Your Pen Speak..."
    contentEditable="true" >
    </div>
  <div className="text-editor-bottom">
    <button className="computerprogrammer special-modal-client" onClick={() => { submitNote()}}>
      {
        isLoading ? 
        <span className="text-editor-loading-spinner special-modal-client">
        <LoadingSpinner />
        </span>

      :
    <span >
    Submit
    </span>
}
   </button>
    </div>
  
  
   

    </section>
</div>
    </>

  )
}

export default TextEditor