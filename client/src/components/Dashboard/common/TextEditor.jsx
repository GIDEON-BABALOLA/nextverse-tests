import { MdAttachFile, MdCloudUpload } from "react-icons/md"
import SpecialModal from "../../common/SpecialModal"
import CloudinaryIcon from "../../../styles/components/common/Icons/CloudinaryIcon"
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
  const [wordCount, setWordCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [attachmentLine, setAttachmentLine] = useState(0)
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
      const textWithoutTags = textAreaRef?.current?.innerText.replace(/\s+/g, ' ')
      setWordCount(textWithoutTags.length)
    // what we Are going to be saving into the database from here is e.target.innerHtml, and we are going to be saving it as a string format
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
const previewAttachmentHtml = () => {
  const slideLine =(e, index) => {
  setAttachmentLine(e.target.offsetLeft - 20)
  const allAttachments = document.querySelectorAll(".attach-picture-main")
  allAttachments.forEach((content) => content.classList.remove("active"))
  allAttachments[index].classList.add("active")
  }
  return (
  <>
<section className="attach-picture-options">
  <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257539/Assets/images/hdd_fpfs8i.svg"} width="15%"/>
  <span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 0) } > Local Device</span>
  </div>
  <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257535/Assets/images/google-drive_o6oi9s.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 1) }  > Google Drive</span></div>
  <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257531/Assets/images/camera_z43upm.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 2) } > Take Photo</span></div>
  <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257533/Assets/images/dropbox_v5sl8k.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 3) } > DropBox</span></div>
  <div
  onClick={slideLine}
   className="slideline" style={{left : attachmentLine + "px"}}></div>
  {/* <div>Picture To Text</div> */}
</section>
<section className="attach-picture-main active" >
<span><MdCloudUpload size={80} /></span>
<span><b>Upload Image</b></span>
<span>Image Size Must Be Less Than <b>2MB</b></span>
</section>
<section className="attach-picture-main">
  Upload Pictures from your google drive
  <button className="connect-to-services-button"> <FaGoogleDrive color="white"/>Connect to Google Drive</button>
</section>
<section className="attach-picture-main">
  snap a picture
</section>
<section   className="attach-picture-main">
  Upload Pictures from your dropbox
  <button className="connect-to-services-button"> <FaGoogleDrive color="white"/>Connect to DropBox</button>
</section>
<button className="attach-picture-button">Select Image</button>
<div style={{display : "flex", flexDirection :"row", alignItems : "center", justifyContent : "center"}}>
<span style={{fontSize : "10px"}}>Powered By</span> <CloudinaryIcon size={55}/>
</div>

  </>)
}
const attachmentFunction = () => {
  setOpenModal(true)
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
      
  return (
    <div className="litenote-text-editor-container">
    <SpecialModal 
    openModal={openModal}
    setOpenModal={setOpenModal}
    content={previewAttachmentHtml()}
    width={500}
    height={400}
    dismiss={false}

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
 <span style={{cursor : "pointer"}} 
 onClick={attachmentFunction}
 className="attach-picture-icon special-modal-client"
 >  <MdAttachFile size={20}/>Attach Picture</span>
 <span style={{fontFamily : "Poppins"}}>{wordCount} words</span>
    </div>
   
    {/* I am going to replace this input with auto resize text input when I find it online */}
    <div 
    ref={textAreaRef}
    style={{height : "59px"}}
    id="editable"
    placeholder="Type Something here..."
    className="textArea" 
    onInput={scrollTextArea}
    onBlur={scrollTextArea}
    spellCheck="true"
    contentEditable="true" ></div>
  <div className="text-editor-bottom">
    <button className="computerprogrammer">Submit</button>
    </div>
  
  
   

    </section>
</div>
  )
}

export default TextEditor