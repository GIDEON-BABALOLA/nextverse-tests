
const TableRow = ({title, author, category, date, readTime}) => {
  return (
    <>
                <tr>
                    <td>{title} </td>
                    <td>{author}</td>
                    <td>{category}</td>
                    <td className="litenote-dashboard-primary">{date}</td>
                    <td className="litenote-dashboard-warning">{readTime}</td>
                  
                </tr>
    </>
  )
}

export default TableRow