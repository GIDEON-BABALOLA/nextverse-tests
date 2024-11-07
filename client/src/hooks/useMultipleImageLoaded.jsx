import { useState, useEffect } from "react";
import { usePopularStoriesContext } from "./usePopularStoriesContext";
const useMultipleImageLoad = (...urls) => {
  const { popularStories } = usePopularStoriesContext()
  const pictures =  urls.map((url) => {
    return { url, loaded : false, error : false}
  })
  const [imageStatus, setImageStatus] = useState(pictures);

  useEffect(() => {
    if (pictures.length === 0) {
      return;
    }

    let isCancelled = false;

  
  
const loadImage = async (url, index) => {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Check if image exists
    console.log(response.status)
    if (response.status === 404) {
      console.log("false man")
      console.log(url)
      // If 404, set error state and exit early
      setImageStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === index ? { ...status,  error: true } : status
        )
      );
      console.log("i set")
      return;
    }

    // If not 404, proceed with loading image
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (!isCancelled) {
        setImageStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === index ? { ...status, loaded: true } : status
          )
        );
      }
    };
    img.onerror = () => {
      if (!isCancelled) {
        setImageStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === index ? { ...status, error: true } : status
          )
        );
      }
    };
  } catch (error) {
    console.error("Error checking image status:", error);
    setImageStatus((prevStatus) =>
      prevStatus.map((status, i) =>
        i === index ? { ...status, error: true } : status
      )
    );
  }
};   
    
   
    urls.forEach((url, index) => loadImage(url, index));
    return () => {
      isCancelled = true;
    };
  }, [popularStories]);

  return imageStatus;
};
export default useMultipleImageLoad;












// const loadImage = (url, index) => {
//   const img = new Image();
//   img.src = url;
//   img.onload = () => {
//     if (!isCancelled) {
//       return setImageStatus((prevStatus) => 
//         prevStatus.map((status, i) => 
//           i === index ? { ...status, loaded: true } : status
//         )
//       );
//     }
//   };
//   img.onerror = () => {
//     if (!isCancelled) {
//       return setImageStatus((prevStatus) => 
//         prevStatus.map((status, i) => 
//           i === index ? { ...status, error: true } : status
//         )
//       );
//     }
//   };
// };















