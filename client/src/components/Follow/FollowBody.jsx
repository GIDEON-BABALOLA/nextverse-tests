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
</div>
    </section>
  )
}

export default FollowBody