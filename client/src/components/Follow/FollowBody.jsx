import FollowSidebar from "./FollowSidebar"
import FollowHeader from "./FollowHeader"
import FollowList from "./FollowList"
import "../../styles/components/Follow/follow-body.css"
import { useEffect } from "react"
import {useThemeContext} from "../../hooks/useThemeContext"
import ErrorMessage from "../common/ErrorMessage"
const FollowBody = () => {
  const { colorMode } = useThemeContext()
  useEffect(() => {
    switch (colorMode) {
      case "dark-mode":
        document.body.classList.add("dark-theme-variables")
        break;
        case "light-mode":
            document.body.classList.remove("dark-theme-variables")
        break;
    }
  }, [colorMode])
  console.log("gideon babalola", colorMode)
  return (
    <section className="followers-body-prefix">
    <FollowSidebar />
    <div className="main-content">
<FollowHeader />
<FollowList />
{/* <ErrorMessage title={"Something went wrong"} 
  message={"We are unable to load this content, check your connection"}
  height={80}
 /> */}
</div>
    </section>
  )
}

export default FollowBody