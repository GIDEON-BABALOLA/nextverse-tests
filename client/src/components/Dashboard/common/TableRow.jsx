
import useNavigateStory from "../../../hooks/useNavigateStory"
import { formatTime } from "../../../helpers/formatTime";
const TableRow = ({ id, title, author, category, date, readTime, serialNumber, isLoading}) => {
  const navigateToStory = useNavigateStory();
  const openStory = () => {
    navigateToStory({_id : id, author, title})
  }
  return (
    <>
    {
      isLoading ? 
      <>
      <div 
      className="table-row-loader"
      style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="recent-stories-loader"></div>
        <div className="recent-stories-loader"></div>
        <div className="recent-stories-loader"></div>
        <div className="recent-stories-loader"></div>
        <div className="recent-stories-loader"></div>
        <div className="recent-stories-loader"></div>
        
      </div> 
      </>
      :

    
                <tr onClick={() => {openStory()}} style={{cursor : "pointer"}}>
                  <td>{serialNumber}</td>
                    <td>{title} </td>
                    <td>{author}</td>
                    <td>{category}</td>
                    <td className="litenote-dashboard-primary">{date}</td>
                    <td className="litenote-dashboard-warning">
                    {readTime["minutes"] == 0 ? `${readTime["seconds"]} seconds read` : `${formatTime(readTime["minutes"])} read`  }
                    </td>
                  
                </tr>
                }
    </>
  )
}

export default TableRow