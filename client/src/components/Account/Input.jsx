const Input = ({type, placeholder, className, animate, ...props}) => {
  return (
   <>
      <div className={className}  > 
        <span>{animate}</span>
            <input
            type={type} 
            placeholder={placeholder}
            {...props}
             required />
          </div>
   </>
  )
}

export default Input