const Input = ({type, placeholder, className, animate}) => {
  return (
   <>
      <div className={className}>
        <span>{animate}</span>
            <input type={type} placeholder={placeholder} required />
          </div>
   </>
  )
}

export default Input