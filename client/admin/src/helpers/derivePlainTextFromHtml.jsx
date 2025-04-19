export const derivePlainTextFromHtml = (html) => {
  const regex = /<span[^>]*>\[Image [^\]]+\]<\/span>/g;
  console.log(html)
  const withoutImagePointer = html.replace(regex, " ")
    const tag = document.createElement("div")
    tag.innerHTML = withoutImagePointer;
    console.log(tag)
    return tag.innerText
  }