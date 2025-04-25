export const cleanObject = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== '') { // or: if (obj[key]) to remove all falsy values
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };