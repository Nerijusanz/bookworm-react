import {
    LOCALE_SET_LANG_YES,
    LOCALE_SET_LANG_NO

} from './types';


const setLocaleLang = (lang) => ({ 

    type:(lang)? LOCALE_SET_LANG_YES : LOCALE_SET_LANG_NO,
    payload:lang

});

export const setLocale = (lang) => (dispatch) => {

    dispatch(setLocaleLang(lang));

    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_LOCALE_LANG,lang);

}