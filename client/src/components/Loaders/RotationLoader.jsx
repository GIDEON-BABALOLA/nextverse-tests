import "../../styles/components/Loaders/rotation-loader.css"
const RotationLoader = ({...props}) => {
  return (
    <div className="box-loader-container">
    <div 
    {...props}
    className="box-loader"></div>
    </div>

  )
}

export default RotationLoader