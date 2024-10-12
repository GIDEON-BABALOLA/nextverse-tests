const FontSize = ({noteSettings, setNoteSettings}) => {
    const handleFontSize = (e) => {
        switch (e.target.id) {
          case "small":
            setNoteSettings((prevState) => {
              return {...prevState, fontSize : 1}
            })
            break;
            case "medium":
              setNoteSettings((prevState) => {
                return {...prevState, fontSize : 1.1}
              })
            break;
            case "large":
              setNoteSettings((prevState) => {
                return {...prevState, fontSize : 1.2}
              })
              break;
              case "extralarge":
                setNoteSettings((prevState) => {
                  return {...prevState, fontSize : 1.3}
                })
            break;
            case "extraextralarge":
              setNoteSettings((prevState) => {
                return {...prevState, fontSize : 1.4}
              })
          break;
        }
      }
  return (
    <section className="settings-main ">
    <div 
    className="shoe-size"
    style={{display : "flex", flexDirection : "row", justifyContent :"space-between", alignItems : "center", gap : "35px", textAlign : "center", fontFamily : "Poppins"}}>
      <span className={`  ${noteSettings["fontSize"] == 1 && "active" }`}  id="small"
      onClick={handleFontSize}
       >S</span>
      <span  className={`  ${noteSettings["fontSize"] == 1.1 && "active" }`} id="medium"
      onClick={handleFontSize}
      >M</span>
      <span  className={`  ${noteSettings["fontSize"] == 1.2 && "active" }`} id="large"
      onClick={handleFontSize}
      >L</span>
      <span  className={`  ${noteSettings["fontSize"] == 1.3 && "active" }`} id="extralarge"
      onClick={handleFontSize}
      >XL</span>
      <span  className={`  ${noteSettings["fontSize"] == 1.4 && "active" }`} id="extraextralarge"
      onClick={handleFontSize}
      >XXL</span>
    </div>
   
        </section>
  )
}

export default FontSize