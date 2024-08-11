
 {/* <div className="litenote-browse-category-filter">
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select">
        <option value="">All Categories</option>
        {categories.map((item) => (
            <option value="" key={item}>{item}</option>
        ))}
         
           {/* Categories will be added dynamically  */}
        //    </select>
        //    </div
        import { useRef, useState } from "react";
        import "../../styles/components/Browse/selectmenu.css"
import { FaFeatherAlt, FaLightbulb, FaHiking, FaHeart, FaRobot } from "react-icons/fa";
import { FaStaffSnake, FaAngleDown  } from "react-icons/fa6";
const SearchFilter = () => {   
    const [active, setActive] = useState(false)
    const selectMenu = useRef() 
    const list = useRef()
    const selectButton = useRef()
    const chooseOption = (e) => {
        setActive(!active)
        selectButton.current.innerText = e.target.innerText
        list.current.style.padding = "20px";
        setTimeout(() => {
            list.current.style.display = "none";
          }, 500);
       
    }
    const openOption = () => {
        list.current.style.display = "block";
        setActive(!active)
        if(active === true){
            list.current.style.padding = "20px";
            list.current.style.display = "block";
          setTimeout(() => {
            list.current.style.display = "none";
          }, 500);
        }
        
    }
  return (
  <>
      <div className={`litenote-browse-select-menu  ${active ? 'active' : ''}`} ref={selectMenu}>
<div className="litenote-browse-select-btn"  onClick={openOption}>
<span className="litenote-browse-sBtn-text" ref={selectButton}>Filter By Category</span>
<FaAngleDown  className="litenote-angle-down"/>
</div>
<ul className={`litenote-browse-options ${active ? 'show' : 'close'}`} ref={list}>
    <li className="litenote-browse-option"  onClick={chooseOption}>
<FaFeatherAlt  className="litenote-browse-react-icons"/>
<span className="litenote-browse-option-text">Fiction</span>
    </li>
    <li className="litenote-browse-option"  onClick={chooseOption}>
<FaLightbulb className="litenote-browse-react-icons" />
        <span className="litenote-browse-option-text">Non-Fiction</span>
            </li>
            <li className="litenote-browse-option"  onClick={chooseOption}>
<FaHiking className="litenote-browse-react-icons"/>
                <span className="litenote-browse-option-text">Adventure</span>
                    </li>
                    <li className="litenote-browse-option"  onClick={chooseOption}>
<FaHeart className="litenote-browse-react-icons"/>
                        <span className="litenote-browse-option-text">Romance</span>
                            </li>
                            <li className="litenote-browse-option"  onClick={chooseOption}>
                               <FaRobot className="litenote-browse-react-icons" />
                                <span className="litenote-browse-option-text">Technology</span>
                                    </li>
                                    <li className="litenote-browse-option"  onClick={chooseOption}>
                               <FaStaffSnake className="litenote-browse-react-icons" />
                                <span className="litenote-browse-option-text">Health</span>
                                    </li>
</ul>
    </div>
  </>
  )
}

export default SearchFilter