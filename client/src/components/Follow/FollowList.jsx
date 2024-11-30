import ErrorMessage from "../common/ErrorMessage"
import FollowCard from "./FollowCard"
import { useEffect, useState } from "react"
import { useFollowSuggestion } from "../../hooks/useFollowSuggestions"
const FollowList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5)
    const [followListData, setFollowListData] = useState([])
    const {getUsersToFollow, isLoading, error, data, statusCode, userCount} = useFollowSuggestion();
    useEffect(() => {
getUsersToFollow(page, limit)
    }, [page, limit])
  return (
    <div className="followers-list">
    {dummyData.map((content, index) => (
<FollowCard key={index} content={content}/>
    ))}
        </div>
  )
}

export default FollowList