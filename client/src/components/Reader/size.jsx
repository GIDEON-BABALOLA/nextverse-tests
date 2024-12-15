const [avatarLoading, setAvatarLoading] = useState(true)
let avatarPicture = ""
if(isLoading === false){
  //  storyPicture = story.picture[Math.round(Math.random())]
  avatarPicture = comment.commentBy["picture"]
}
const { loaded, error } = useImageLoad(avatarPicture);
useEffect(() => {
  if (error) {
   setAvatarLoading(true)
  }

  if (loaded === true) {
  setAvatarLoading(false)
  }
}, [loaded, error])