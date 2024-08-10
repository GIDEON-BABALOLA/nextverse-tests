import "../../../styles/components/Dashboard/dashboard-pagination.css"
import { MdChevronLeft, MdChevronRight} from "react-icons/md"
import { useState } from "react";
const DashboardPagination = () => {
  const [currentValue, setCurrentValue] = useState(1);
  const [prev, disablePrev] = useState(false);
  const [next, disableNext] =  useState(false);
  const [paginationNumbers, setPaginationNumbers] = useState([1, 2, 3, 4, 5])
  const activeLink = (value) => { 
    console.log(value)
    setCurrentValue(value)
   }
   const backBtn = () => {
    console.log("Dkddkdkdkdk")
    console.log("Dd")
     if(currentValue === 1){
       return disablePrev(true)
     }
     if (currentValue > 1) {
       setCurrentValue(currentValue - 1);
     }
      if(currentValue == paginationNumbers[0]){
       console.log("letsgo")
       const firstNumber = paginationNumbers[paginationNumbers.length - paginationNumbers.length];
 const news = [firstNumber - 1, ...paginationNumbers.slice(0, 4)]
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
<div id="app" className="dashboard-pagination-container">  
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
    <li className="dashboard-pagination-page__numbers">20</li>
    <li   className={`dashboard-pagination-page__btn ${prev ? 'disabled' : ''}`}
     onClick={nextBtn}><span><MdChevronRight size={20} /></span></li>
  </ul>
</div>
  )
}

export default DashboardPagination