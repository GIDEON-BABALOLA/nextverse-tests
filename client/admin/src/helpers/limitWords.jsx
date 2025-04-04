export const limitWord =(text, limit) => {
    console.log(limit)
    const truncatedText =  text.split(" ").slice(0, limit).join(" ");
    console.log(truncatedText)
    if(text.split(" ").length <= limit){
        return truncatedText
    }
    return truncatedText.concat("...")
}