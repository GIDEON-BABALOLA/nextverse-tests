import FollowSidebar from "./FollowSidebar"
import FollowHeader from "./FollowHeader"
import FollowList from "./FollowList"
import "../../styles/components/Follow/follow-body.css"
import { useEffect } from "react"
import {useThemeContext} from "../../hooks/useThemeContext"

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
</div>
    </section>
  )
}

export default FollowBody