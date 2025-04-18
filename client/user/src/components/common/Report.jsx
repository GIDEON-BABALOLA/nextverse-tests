import { MdClose } from "react-icons/md"
import "../../styles/components/common/report.css"
import { useParams } from "react-router-dom"
import { useCreateAReport } from "../../hooks/useCreateAReport"
import { useToastContext } from "../../hooks/useToastContext"
import Dropdown from "./Dropdown"
import { useEffect, useState } from "react"
import LoadingSpinner from "../Loaders/LoadingSpinner"
const Report = ({ setOpenModal }) => {
  const { username } = useParams();
  const { createAReport, isLoading, error, data, statusCode } = useCreateAReport();
  const [content, setContent] = useState();
  const { showToast } = useToastContext()
   const [category, setCategory] = useState({
        "harrasment or bullying" : false,
        "hate speech" : false,
        "fake account" : false,
        "inappropriate content" : false,
        "scam or fraud" : false,
        "misinformation" : false,
        "stolen content": false,
        "other" : false
      })
      const submitReport = () => {
        const selectedCategory = Object.keys(category).find((key) => category[key] === true)
        if(!selectedCategory){
          showToast("Error", `Pls Select A Category`, false)
        }
        console.log(content)
        createAReport(selectedCategory, content, username)
      }
      useEffect(() => {
if(error){
  showToast("Error", error.message, false)
}
console.log(data)
if(Object.keys(data).length !== 0 && statusCode == 201) {
  showToast("Success", data.message, true)
  setOpenModal(false)
}
      }, [data, statusCode, error])
  return (
    <>
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}} className="report-someone">
<span style={{fontSize : "1.9rem", fontWeight : 600}}>Report</span>
<span onClick={() => {setOpenModal(false)}}><MdClose size={20} style={{cursor : "pointer"}}/></span>
    </div>
    <Dropdown tabs={category} setTab={setCategory} scale={false} style={{maxWidth : "30rem"}}/>
          <textarea
            id="details"
            spellCheck={false}
            className="report-someone-textarea"
            placeholder="Add more info here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="report-buttons">
            <button type="button" className="cancel-btn" onClick={() => {setOpenModal(false)}}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" onClick={() => submitReport()}>
              {
                isLoading ? 
                <span style={{padding : "10px 40px"}}><LoadingSpinner /></span>
                
                : "Submit Report" 
              }
            </button>
          </div>
    </>
  )
}

export default Report


