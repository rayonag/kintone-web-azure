import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import applicationForm_en from './en.json';
import translation_he from './he.json';
import translation_ru from './ru.json';

import common_en from '@/libs/i18n/common/en.json';

const resources = {
    en: {
        applicationForm: { ...applicationForm_en, ...common_en }
        //healthQuestionnaire: { ...fac_en, ...common_en }
    },
    he: {
        translation: translation_he
    },
    ru: {
        translation: translation_ru
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
