
import "../../styles/components/Browse/pagination.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react"
const SearchPagination = () => {

  const [currentValue, setCurrentValue] = useState(1);
  const [prev, disablePrev] = useState(false);
  const [next, disableNext] =  useState(false);
  const [paginationNumbers, setPaginationNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const activeLink = (value) => { 
   setCurrentValue(value)
  }
  const backBtn = () => {
    if(currentValue === 1){
      return disablePrev(true)
    }
    if (currentValue > 1) {
      setCurrentValue(currentValue - 1);
    }
     if(currentValue == paginationNumbers[0]){
      console.log("letsgo")
      const firstNumber = paginationNumbers[paginationNumbers.length - paginationNumbers.length];
const news = [firstNumber - 1, ...paginationNumbers.slice(0, 9)]
      // Update state
      setPaginationNumbers(news);
      setCurrentValue(currentValue - 1);
    }
    else if (currentValue > 1) {
      setCurrentValue(currentValue - 1);
    }
  };

  const nextBtn = () => {
    if(currentValue === 20){
      return disableNext(true)
    }
    if (currentValue < 10) {
      setCurrentValue(currentValue + 1);
    }
     if(currentValue === paginationNumbers[paginationNumbers.length - 1]){
      const lastNumber = paginationNumbers[paginationNumbers.length - 1];
        
      // Calculate new pagination array
      const newPaginationNumbers = [...paginationNumbers.slice(1), lastNumber + 1];

      // Update state
      setPaginationNumbers(newPaginationNumbers);
      setCurrentValue(currentValue + 1);
    }
  };
  return (
   <>
      {/* <div className="litenote-browse-pagination">
        <button id="prev-page" disabled>Previous</button>
        <span id="current-page">1</span>
        <button id="next-page">Next</button>
      </div> */}

      <div className="litenote-pagination-container">
    <button className={`litenote-pagination-btn1 litenote-pagination-controlbutton ${prev ? 'disabled' : ''}`}
    onClick={()=> { 
      backBtn();
      
      }}>
    <FaChevronLeft />Previous
    </button>
    <ul className="litenote-pagination-number-list">
      {paginationNumbers.map((value) => (
        <li
        className={`link ${currentValue === value ? 'active' : ''}`}
        key={value}
        onClick={() =>{
          activeLink(value);
        }}

        >
          {value}
        </li>
      ))}
    </ul>
    <button className={`litenote-pagination-btn2 litenote-pagination-controlbutton ${next ? 'disabled' : ''}`}
     onClick={()=> { nextBtn()}}>
      Next<FaChevronRight />
    </button>
  </div>
   </>
  )
}

export default SearchPagination