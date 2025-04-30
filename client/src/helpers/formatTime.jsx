export const formatTime = (minutes) => 
    minutes < 60 ? `${minutes} minutes` : `${Math.floor(minutes / 60)} hours`;
  