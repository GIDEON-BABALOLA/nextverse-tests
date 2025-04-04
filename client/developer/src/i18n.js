 import i18n from "i18next"
 import LanguageDetector from "i18next-browser-languagedetector"
 import { initReactI18next } from "react-i18next"
 //Languagedetector helps to detect current language and change it accordingly
 i18n.use(LanguageDetector)
 .use(initReactI18next) //How does i18n knows that it is in a react app
 .init({
    debug : true, //shows our errors in browser console.
    lng : "en", //default language to true
    resource : {
en : {
    translation : {
greeting : "Hello, Welcome!"
    }
},
fr : {
    translation : {
        greeting : "Bonjour, Bienvenue"
    }
},
hi : {

}
    }
    //resource object helps to keep all our translations
 })