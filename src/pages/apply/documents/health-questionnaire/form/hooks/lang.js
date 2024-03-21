import i18n from "i18next";

export const langReducer = (state, action) => {
    switch (action) {
        case "lang_en":
            i18n.changeLanguage("en");
            return { ...state, language: "en" };
        case "lang_he":
            i18n.changeLanguage("he");
            return { ...state, language: "he" };
        case "lang_ru":
            i18n.changeLanguage("ru");
            return { ...state, language: "ru" };
        default:
            return state;
    }
};
