   { width > 1200 ? <div className="stories-page-title">
    <div className="container stories-tabs-wrapper">
    <div className="tabs">
  
  <label
     style={{color : tabs.write == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-1" >Write
      
     </label>
        <label
     style={{color : tabs.notes == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-1" >Notes<span className="notification"
     style={{backgroundColor : tabs.notes == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >2</span>
      
     </label>
    
        <label
     style={{color : tabs.stories == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-2"  >Stories
      <span className="notification"
     style={{backgroundColor : tabs.stories == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >3</span>
     </label>

        <label
     style={{color : tabs.stickyNotes == true && "var(--primary-cocolor)", fontSize : "1.5rem", whiteSpace : "" }}
     onClick={slideTab}
     className="tab"  htmlFor="radio-3" >Sticky Notes
      <span className="notification"
     style={{backgroundColor : tabs.stickyNotes == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >{stickyNotesCount}</span>
     </label>
        <span className="stories-glider"
   
     style={{   transform: `translateX(${slideDistance}px)`, width :  width  < 768 ? "120px" : "180px"}} ></span>
    </div>
  </div> 
</div> :
<div className={`litenote-stories-select-menu  ${active ? 'active' : ''}`} ref={selectMenu}>
<div className="litenote-stories-select-btn"  onClick={openOption}>
<span className="litenote-stories-sBtn-text" ref={selectButton} >Filter By Category</span>
<FaAngleDown  className="litenote-angle-down"/>
</div>
<ul className={`litenote-stories-options ${active ? 'show' : 'close'}`} ref={list}>
    <li className="litenote-stories-option"  onClick={chooseOption}>
{/* <FaFeatherAlt  className="litenote-browse-react-icons"/> */}
<span className="litenote-stories-option-text">Write</span>
    </li>
    <li className="litenote-stories-option"  onClick={chooseOption}>

        <span className="litenote-stories-option-text">Notes</span>
           <span className="dropdown-stories-select-notification"
     style={{backgroundColor : "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >3</span>
            </li>
                    <li className="litenote-stories-option"  onClick={chooseOption}>
{/* <FaHeart className="litenote-browse-react-icons"/> */}
                        <span className="litenote-stories-option-text">Stories</span>
                        <span className="dropdown-stories-select-notification"
     style={{backgroundColor :  "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >4</span>
                            </li>
                            <li className="litenote-stories-option"  onClick={chooseOption}>
                               {/* <FaRobot className="litenote-browse-react-icons" /> */}
                                <span className="litenote-stories-option-text">Sticky Notes</span>
                                    </li>
                             
</ul>
    </div>
   }