
import { useNavigate } from "react-router-dom";
const useNavigateProfile = () => {
    const navigate = useNavigate();
  const navigateToStory = (username) => {
    // Open the URL in a new tab
    navigate(`/profile/${username}`, '_blank');
  };

  return navigateToStory;
};

export default useNavigateProfile;
