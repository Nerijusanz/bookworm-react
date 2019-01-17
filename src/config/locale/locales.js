import { addLocaleData } from 'react-intl';
import lt from 'react-intl/locale-data/lt';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

export const initLocales = () => {

    addLocaleData(en);
    addLocaleData(lt);
    addLocaleData(ru);
    
}