import "../../styles/components/Browse/sliding-tabs.css"
import { useState } from "react"
const SlidingTabs = () => {
  const [slideDistance, setSlideDistance] = useState(0)
  const [tabs, setTab] = useState({
    all : true,
    fiction : false,
    nonFiction : false,
    adventure : false,
    romance : false,
    technology : false,
    health : false
  })
  const clickMe = (e) => {

    switch (e.target.innerText) {
      case "All":
        setSlideDistance(0)
        setTab({
          all : true,
          fiction : false,
          nonFiction : false,
          adventure : false,
          romance : false,
          technology : false,
          health : false
        })
        break;
        case "Fiction":
          setSlideDistance(200)
          setTab({
            all : false,
            fiction : true,
            nonFiction : false,
            adventure : false,
            romance : false,
            technology : false,
            health : false
          })
        break;
        case "Non-Fiction":
          setSlideDistance(400)
          setTab({
            all : false,
            fiction : false,
            nonFiction : true,
            adventure : false,
            romance : false,
            technology : false,
            health : false
          })
        break;
        case "Romance":
          setSlideDistance(600)
          setTab({
            all : false,
            fiction : false,
            nonFiction : false,
            adventure : false,
            romance : true,
            technology : false,
            health : false
          })
          break;
          case "Technology":
            setSlideDistance(800)
            setTab({
              all : false,
              fiction : false,
              nonFiction : false,
              adventure : false,
              romance : false,
              technology : true,
              health : false
            })
            break;
            case "Health":
              setSlideDistance(1000)
              setTab({
                all : false,
                fiction : false,
                nonFiction : false,
                adventure : false,
                romance : false,
                technology : false,
                health : true
              })
              break;
        case "Adventure":
          setSlideDistance(1200)
          setTab({
            all : false,
            fiction : false,
            nonFiction : false,
            adventure : true,
            romance : false,
            technology : false,
            health : false
          })
          
        break;
      
    
       
      default:
        setSlideDistance(0)
        break;
    }
  }
  return (

    
    <div>

<div className="wrapper">
        <div className="tabs">
       
    
        <label
            style={{color : tabs.all == true && "#F44336"  }}
             onClick={clickMe}
             htmlFor="tab1">All</label>
        
            <label htmlFor="tab2"
               style={{color : tabs.fiction == true && "#F44336"  }}
            onClick={clickMe}
            >Fiction</label>

          
            <label
               style={{color : tabs.nonFiction == true && "#F44336"  }}
             onClick={clickMe}
             htmlFor="tab3">Non-Fiction</label>

            <label 
               style={{color : tabs.romance == true && "#F44336"  }}
             onClick={clickMe}
            htmlFor="tab4">Romance </label>

            <label
            style={{color : tabs.technology == true && "#F44336"  }}
             onClick={clickMe}
            htmlFor="tab5">Technology</label>

            <input type="radio" name="tabs" id="tab6" />
            <label 
              style={{color : tabs.health == true && "#F44336"  }}
             onClick={clickMe}
            htmlFor="tab6">Health</label>

           
            <label
             style={{color : tabs.adventure == true && "#F44336"  }}
             onClick={clickMe}
             htmlFor="tab7">Adventure</label>
              <div className="search-glider" style={{   transform: `translateX(${slideDistance}px)`}}></div>
        </div>
    </div>
    </div>
  )
}

export default SlidingTabs