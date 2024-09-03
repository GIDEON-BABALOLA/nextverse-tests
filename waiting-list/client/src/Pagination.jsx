import "./pagination.css"
import { MdChevronLeft, MdChevronRight} from "react-icons/md"
import { useState, useEffect } from "react";
import ArrowKeyDetector from "./ArrowKeyDetector";
const Pagination = ({ userCount, getWaitingList, paginationNumbers, setPaginationNumbers }) => {
  const [currentValue, setCurrentValue] = useState(1);
  const [prev, disablePrev] = useState(false);
  const [next, disableNext] =  useState(false);
  const activeLink = (value) => { 
    setCurrentValue(value)
   }
   useEffect(() => {
    getWaitingList(currentValue, 5)
   }, [currentValue])
   const backBtn = () => {
     if(currentValue === 1){
       return disablePrev(true)
     }
     if (currentValue > 1) {
       setCurrentValue(currentValue - 1);
     }
      if(currentValue == paginationNumbers[0]){
        console.log("dave")
       const firstNumber = paginationNumbers[paginationNumbers.length - paginationNumbers.length];
       console.log(firstNumber)
 const news = [firstNumber - 1, ...paginationNumbers.slice(0, 2)]
       // Update state
       setPaginationNumbers(news);
       setCurrentValue(currentValue - 1);
     }
     else if (currentValue > 1) {
       setCurrentValue(currentValue - 1);
     }
   };
 
   const nextBtn = () => {
     if(currentValue === Math.ceil((userCount / 5))){
      console.log("dkdk")
       return disableNext(true)
     }
     if (currentValue < Math.ceil(userCount / 5)) {
      console.log("power of the emipire")
       setCurrentValue(currentValue + 1);
     }
      if(currentValue === paginationNumbers[paginationNumbers.length - 1]){
       const lastNumber = paginationNumbers[paginationNumbers.length - 1];
         console.log(lastNumber)
       // Calculate new pagination array
       const newPaginationNumbers = [...paginationNumbers.slice(1), lastNumber + 1];
       // Update state
       setPaginationNumbers(newPaginationNumbers);
       setCurrentValue(currentValue + 1);
     }
   };
  return (
<div id="app" className="dashboard-pagination-container">  
<ArrowKeyDetector backBtn={backBtn} nextBtn={nextBtn}/>
<ul className="dashboard-pagination-page">

    <li 
   className={`dashboard-pagination-page__btn ${prev ? 'disabled' : ''}`}
    onClick={() => {backBtn()}} ><span
    ><MdChevronLeft  size={20}/></span></li>
{paginationNumbers.map((value) => (
  <span key={value} 
  className={` dashboard-pagination-page__numbers  ${currentValue === value ? 'active' : ''}`}
  onClick={() => activeLink(value)}
  >{value}</span>
))}
    <li className="dashboard-pagination-page__dots">...</li>
    <li className="dashboard-pagination-page__numbers">{
      Math.ceil((userCount / 5)   )
    }</li>
    <li   className={`dashboard-pagination-page__btn ${next ? 'disabled' : ''}`}
     onClick={nextBtn}><span><MdChevronRight size={20} /></span></li>
  </ul>
</div>
  )
}

export default Pagination