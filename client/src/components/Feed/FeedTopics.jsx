const FeedTopics = ({ feedCategory, setFeedCategory}) => {
  const handleCategoryChange = (category) => {
    console.log(feedCategory)
    const tab = category.toLowerCase()
    const optionMapping = {}
    Object.entries(feedCategory).map(([key, value], index) => {
        optionMapping[key] = value
    })
const selectedOption = optionMapping[tab];
    setFeedCategory(prevState => ({
  ...Object.keys(prevState)
        .filter(key => key !== selectedOption) // Reset all others
        .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
        [tab]: true
     }))
  } 
  return (
    <div style={{marginTop  : "30px"}}>
    <h3>Recommended Topic</h3>
    <div className="feed-topics">
        <span 
         className={`feed-topic ${feedCategory["all"] ? "active" : ""}`}
        onClick={() => handleCategoryChange("all")}>All</span>
        <span
         className={`feed-topic ${feedCategory["technology"] && "active"}`}
          onClick={() => handleCategoryChange("technology")} >Technology</span>
        <span
         className={`feed-topic ${feedCategory["fiction"] && "active"}`}
          onClick={() => handleCategoryChange("fiction")} >Fiction</span>
        <span
         className={`feed-topic ${feedCategory["adventure"] && "active"}`}
          onClick={() => handleCategoryChange("adventure")}>Adventure</span>
        <span
         className={`feed-topic ${feedCategory["non-fiction"] && "active"}`}
          onClick={() => handleCategoryChange("non-fiction")}>Nonfiction</span>
        <span
         className={`feed-topic ${feedCategory["romance"] && "active"}`}
          onClick={() => handleCategoryChange("romance")}>Romance</span>
        <span
         className={`feed-topic ${feedCategory["memoir"] && "active"}`}
          onClick={() => handleCategoryChange("memoir")}>Memoir</span>
    </div>
    </div>
  )
}

export default FeedTopics