const TextArea = ({ id, placeholder, className}) => {
  return (
<>
    <textarea 
    className={className}
    placeholder={placeholder}
    id={id}
    required></textarea>
</>
  )
}

export default TextArea