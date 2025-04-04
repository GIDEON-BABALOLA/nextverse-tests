
export const navigator = (author, title, id) => {
    const encodedTitle = title.toLowerCase() 
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/^-+|-+$/g, "");
    const url = `${window.location.origin}/story/${author}/${encodedTitle}/${id}`;
    window.location.href = url;
    // window.open(url, "_blank");
    
}