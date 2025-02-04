export const limitWord =(text, limit) => {
    console.log(text.split(" "))
    const truncatedText =  text.split(" ").slice(0, limit).join(" ");
    if(text.split(" ").length < limit){
        return truncatedText
    }
    return truncatedText.concat("...")
}