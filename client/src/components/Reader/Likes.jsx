import { useGetStoryLikes } from "../../hooks/useGetStoryLikes"
import { useEffect, useState } from "react"
const Likes = ({ id, likeModal, likesDrawerOpen }) => {
  const { getStoryLikes, isLoading, error, data, statusCode, commentCount } = useGetStoryLikes()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  useEffect(() => {
    if(likeModal || likesDrawerOpen){
        getStoryLikes(page, limit, id)
     }
  }, [page, limit, likeModal, likesDrawerOpen, id])
  return (
    <div>This is me</div>
  )
}

export default Likes