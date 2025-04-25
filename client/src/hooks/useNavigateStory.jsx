// useNavigateStory.js
import { useNavigate } from 'react-router-dom';

const useNavigateStory = () => {
  const navigate = useNavigate();

  const navigateToStory = (story) => {
    const encodedTitle = story.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); 

    navigate(`/story/${story.author}/${encodedTitle}/${story._id}`);
  };

  return navigateToStory;
};

export default useNavigateStory;
