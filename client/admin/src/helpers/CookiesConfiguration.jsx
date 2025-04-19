export const setCookie = (cookieName, cookieValue, expiryDate) => {
    const d = new Date();
    d.setTime(d.getTime() + (expiryDate * 24 * 60 * 60 * 1000));
    let expires =  "expires="+d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  export const getCookie = (cookieName) => {
    let name = cookieName.toString() + "=";
    let decodedCookie =  decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";")
    for(let i = 0; i < ca.length; i++){
      let c = ca[i];
      while(c.charAt(0) == " "){
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0){
        return c.substring(name.length, c.length)
      }
    }
    return undefined
  }
  export const checkCookie = (cookieName) => {
    return document.cookie.includes(cookieName)
  }