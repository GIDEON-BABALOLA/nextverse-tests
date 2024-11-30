import FollowSidebar from "./FollowSidebar"
import FollowHeader from "./FollowHeader"
import FollowList from "./FollowList"
import "../../styles/components/Follow/follow-body.css"
const FollowBody = () => {
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