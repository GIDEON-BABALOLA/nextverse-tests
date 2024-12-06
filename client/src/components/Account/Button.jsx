
import LoadingSpinner from "../Loaders/LoadingSpinner"
const Button = ({ isLoading, text,  ...props}) => {
  return (
    <button className="litenote-register-submit-btn"
    type="submit" 
    {...props}
  >
 { isLoading ? <span style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
  <LoadingSpinner width={15} />
  </span> : `${text}`
 }

  </button>
  )
}

export default Button