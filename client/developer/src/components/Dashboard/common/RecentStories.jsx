import TableRow from "./TableRow"
import "../../../styles/components/Dashboard/recent-stories.css"
const dummyStories = [
    {
title : "The Endless Journey",
author : "Dave James",
category : "Adventure",
date : "3/28/2024",
readTime : "10mins"
    }, 
    {
title : "Love Conquers All ",
category : "Romance",
author : "John Elvis",
date : "6/28/2024 ",
readTime : "5mins"
    },
    {
title : "The Mythical Realm",
author : "Dora Cardie",
category : "Friction",
date : "7/28/2024",
readTime : "10mins"
    }, 
    {
title : "The Science Behind Exercise",
author : "itness Zone",
category : "Non Friction",
date : "11/28/2024",
readTime : "8mins"   
    },
    {
        title : "The Mythical Realm",
        author : "Dora Cardie",
        category : "Friction",
        date : "7/28/2024",
        readTime : "10mins"
            }, 
            {
        title : "The Science Behind Exercise",
        author : "itness Zone",
        category : "Non Friction",
        date : "11/28/2024",
        readTime : "8mins"   
            },
]
const RecentStories = () => {
  return (
    <div className="litenote-dashboard-recent-stories">
    <h2  className="litenote-dashboard-h-two"style={{fontWeight : 900, fontSize : "20px"}}>Recent Stories</h2>
    <table >
        <thead className="table-heading-dash">
            <tr>
                <th>Title</th>
                <th> Authors</th>
                <th>Category</th>
                <th>Date</th>
                <th>Read Time </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {dummyStories.map((content, index) => (
<TableRow key={index}
    title={content.title}
    author={content.author}
    category={content.category}
    date={content.date}
    readTime={content.readTime}
/>
        ))}
            
        </tbody>
    </table>
    <a href="#">Show all</a>
</div>
  )
}

export default RecentStories