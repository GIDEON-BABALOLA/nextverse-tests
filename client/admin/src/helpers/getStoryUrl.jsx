
export const getStoryUrl = (story) => {
    const encodedTitle = story.title.toLowerCase() 
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/^-+|-+$/g, "");
    const url = `${window.location.origin}/story/${story.author}/${encodedTitle}/${story._id}`;
   return url;
    // window.open(url, "_blank");
    
}