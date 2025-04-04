const bios = [
    "Writing stories, one post at a time.",
    "Read, like, bookmark, repeat.",
    "Words that stay with you.",
    "Fiction, facts, and feels.",
    "Thoughts turned into stories.",
    "Bookmark-worthy content.",
    "Living through words.",
    "Making ideas come alive.",
    "Every story has a soul.",
    "Writing what I feel.",
    "Let my words take you places.",
    "Stories you won’t forget.",
    "Painting with words.",
    "Just a storyteller at heart.",
    "Read, reflect, enjoy.",
    "Exploring ideas through writing.",
    "For the love of words.",
    "Writing, one thought at a time.",
    "Save now, thank me later.",
    "Creating magic with words."
  ]
  
export const bioSuggestions = () => {
    return bios[Math.floor(Math.random() * bios.length)]
}