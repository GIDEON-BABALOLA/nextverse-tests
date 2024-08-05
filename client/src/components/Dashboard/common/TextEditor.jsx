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
 
  } from "react-icons/fa"
 import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
 import { useEffect, useRef } from "react";
 import "../../../styles/components/Dashboard/text-editor.css"
const TextEditor = () => {
    const alignButtons = useRef()
    const spacingButtons = useRef()
    const formatButtons = useRef()
    const scriptButtons = useRef()
    const fontName = useRef()
    const textAreaRef = useRef()
    const fontSizeRef = useRef()
    //initial settings
    //Highlight clicked button
    const scrollTextArea = (e) => {
             textAreaRef.current.style.height ="63px"
        textAreaRef.current.style.height ="auto"
textAreaRef.current.style.height =`${e.target.scrollHeight}px`
    }
    const highlighterRemover = (className) => {
        console.log(className)
        Array.from(className).forEach((button) => {
       button.classList.remove("active");
    });
    };
const highlighter = (className, needsRemoval) => {
    console.log(typeof className)
    console.log(Array.from(className))
    Array.from(className).forEach((button) => {
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
    });
};
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
    console.log(command)
    //execCommand executes command on selected text 
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
    
    <h5 style={{color : "#CED4DA"}}>App</h5>
    <h3 style={{fontWeight : "800"}}>Editor</h3>
    <section >
    <div className="litenote-text-editor-options">
   {/* textFormat */}
   <button id="bold" className="litenote-text-editor-option-button
   format" onClick={optionButtons} ref={formatButtons} 

    >
   <FaBold />
   </button>
   <button id="italic" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={formatButtons} >
  <FaItalic />
   </button>
   <button id="underline" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={formatButtons} >
   <FaUnderline />
   </button>
   <button id="strikethrough" className="litenote-text-editor-option-button
   format" onClick={optionButtons}  ref={formatButtons} >
 <FaStrikethrough/>
   </button>
   <button id="superscript" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={scriptButtons} >
   <FaSuperscript />
   </button>
   <button id="subscript" className="litenote-text-editor-option-button
   format" onClick={optionButtons}   ref={scriptButtons} >
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
   <button id="justifyLeft" className="litenote-text-editor-option-button align" onClick={optionButtons} ref={alignButtons}>
   <FaAlignLeft />
 </button>
   <button id="justifyCenter" 
   className="litenote-text-editor-option-button align" onClick={optionButtons} ref={alignButtons}>
   <FaAlignCenter />
 </button>
 <button id="justifyRight" className="litenote-text-editor-option-button
 align" onClick={optionButtons}  ref={alignButtons} >
   <FaAlignRight />
 </button>
 <button id="justifyFull" className="litenote-text-editor-option-button
 align" onClick={optionButtons}  ref={alignButtons} >
   <FaAlignJustify />
 </button>
 <button id="indent" className="litenote-text-editor-option-button
 spacing" onClick={optionButtons}  ref={spacingButtons} >
    <FaIndent />
 </button>
 <button id="outdent" className="litenote-text-editor-option-button
 spacing" onClick={optionButtons}  ref={spacingButtons} >
    <i className="litenote-text-editor-fa-solid fa-outcome"></i>
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
   <input type="color" id="foreColor"
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
    </div>
   
    {/* I am going to replace this input with auto resize text input when I find it online */}
    {/* <div id="text-input" contentEditable="true" className="textInput-editor"></div> */}
    <textarea 
    ref={textAreaRef}
    onKeyUp={scrollTextArea}
    style={{height : "59px"}}
    contentEditable="true"
    className="textArea" placeholder="Type Something here..."></textarea>
    
  
    <button className="computerprogrammer">Submit</button>

    </section>
</div>
  )
}

export default TextEditor