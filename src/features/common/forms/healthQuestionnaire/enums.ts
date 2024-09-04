import { TFunction } from 'i18next';

type Translation = TFunction<'translation', undefined>;

export const HeightUnit = (t: Translation) => ({
    ft: t('heightUnit.ft'),
    cm: t('heightUnit.cm')
});

export const WeightUnit = (t: Translation) => ({
    lbs: t('weightUnit.lbs'),
    kg: t('weightUnit.kg')
});
