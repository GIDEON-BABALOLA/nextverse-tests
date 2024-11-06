import { useState, useEffect } from "react";

const useMultipleImageLoad = (urls) => {
  const [imageStatus, setImageStatus] = useState(
    urls.map((url) => ({ url, loaded: false, error: false }))
  );

  useEffect(() => {
    if (!urls || (Array.isArray(urls) && urls.length === 0)) {
      return;
    }

    let isCancelled = false;

    const loadImage = (url, index) => {
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
    };

    if (Array.isArray(urls)) {
      urls.forEach((url, index) => loadImage(url, index));
    } else {
      loadImage(urls, 0);
    }

    return () => {
      isCancelled = true;
    };
  }, [urls]);

  return imageStatus;
};

export default useMultipleImageLoad;
