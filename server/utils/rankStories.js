const rankStories = (stories, number) => {
    const weights = {
        totalViews: 1,      
        totalComments: 2,        
        totalLikes: 4,           
        totalBookmarks:   5
    }
    const storiesToBeRanked = stories.map((story) => {
        const storyConvertedToObject = story.toObject()
        const popularityScore = (weights.totalViews * storyConvertedToObject.totalViews) +
        (weights.totalComments * storyConvertedToObject.totalComments) +
        (weights.totalLikes * storyConvertedToObject.totalLikes) +
        (weights.totalBookmarks * storyConvertedToObject.totalBookmarks)
        return {...storyConvertedToObject, picture : storyConvertedToObject.picture[Math.round(Math.random())], popularityScore}
    })
 const topStories = storiesToBeRanked.sort((a, b) => b.popularityScore - a.popularityScore)
 .slice(0, number)
return topStories

}
module.exports = { rankStories }