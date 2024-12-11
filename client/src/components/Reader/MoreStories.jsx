
import { useGetExploreStories } from "../../hooks/useGetExploreStories"
import { useEffect } from "react";
const MoreStories = ({ userId }) => {
    const moreStories = useGetExploreStories();
    useEffect(() => {
        moreStories.getExploreStories(1, 2, "all", userId);
      }, [moreStories, userId]);
  return (
 <>

 </>
  )
}

export default MoreStories