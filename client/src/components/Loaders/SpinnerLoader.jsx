import "../../styles/components/Loaders/spinner-loader.css"
const spinnerLoader = ({ width }) => {
  return (
   <div className="loader"
   style={{
    width : `${width}px`
   }}
   ></div>

  )
}

export default spinnerLoader