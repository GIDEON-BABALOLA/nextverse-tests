
import { useNavigate } from "react-router-dom";
const useNavigatePage = () => {
    const navigate = useNavigate();
  const navigateToPage = (page) => {
  
    navigate(page);
  };

  return navigateToPage;
};

export default useNavigatePage;
