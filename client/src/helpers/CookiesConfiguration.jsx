export const setCoookie = (cookieName, cookieValue, expiryDate) => {
    const d = new Date();
    d.setTime(d.getTime() + (expiryDate * 24 * 60 * 60 * 1000));
    let expires =  "expires="+d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    console.log(cookieValue)
  }