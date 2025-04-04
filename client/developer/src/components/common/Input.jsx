const Input = ({ type, placeholder, className}) => {
  return (
    <input
    className={className}
     type={type}
      id="name"
    placeholder={placeholder}
     required />
  )
}

export default Input