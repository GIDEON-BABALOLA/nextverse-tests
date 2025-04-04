import { useState, useEffect } from "react";

const useImageLoad = (urls) => {
  const [imageLoad, setImageLoad] = useState({
    loaded: false,
    error: false,
    urls: []
  });

  useEffect(() => {
    if (!urls || (Array.isArray(urls) && urls.length === 0)) {
      return;
    }
    let isCancelled = false;
    const handleLoad = () => {
      if (!isCancelled) {
        setImageLoad((prevState) => ({
          ...prevState,
          loaded: true
        }));
      }
    };

    const handleError = () => {
      if (!isCancelled) {
        setImageLoad((prevState) => ({
          ...prevState,
          loaded: false,
          error: true
        }));
      }
    };

    const loadImage = (url) => {
      const img = new Image();
      img.src = url;
      img.onload = handleLoad;
      img.onerror = handleError;
    };

    if (Array.isArray(urls)) {
      urls.forEach(loadImage);
    } else {
      loadImage(urls);
    }

    return () => {
      isCancelled = true;
    };
  }, [urls]);

  return imageLoad;
};

export default useImageLoad;
