import { TFunction } from 'i18next';

type Translation = TFunction<'translation', undefined>;

// export const Language = (t: Translation) => ({
//     1: t('nativeLanguage.options.1'),
//     2: t('nativeLanguage.options.2'),
//     3: t('nativeLanguage.options.3'),
//     4: t('nativeLanguage.options.4'),
//     5: t('nativeLanguage.options.5'),
//     6: t('nativeLanguage.options.6'),
//     7: t('nativeLanguage.options.7')
// });

// export const IDType = (t: Translation) => ({
//     0: t('idType.options.0'),
//     1: t('idType.options.1')
// });

export const MaritalStatus = (t: Translation) => ({
    Married: t('maritalStatus.options.Married'),
    Single: t('maritalStatus.options.Single'),
    Widowed: t('maritalStatus.options.Widowed'),
    Divorced: t('maritalStatus.options.Divorced')
});

export const Sex = (t: Translation) => ({
    Female: t('sex.options.Female'),
    Male: t('sex.options.Male')
});

// export const whereHeardOfUs = (t: Translation) => ({
//     0: t('whereHeardOfUs.options.0'),
//     1: t('whereHeardOfUs.options.1'),
//     2: t('whereHeardOfUs.options.2'),
//     3: t('whereHeardOfUs.options.3')
// });

export const YesNo = (t: Translation) => ({
    Yes: t('yesNo.Yes'),
    No: t('yesNo.No')
});

export const HealthCondition = (t: Translation) => ({
    Excellent: t('healthCondition.options.Excellent'),
    Good: t('healthCondition.options.Good'),
    Fair: t('healthCondition.options.Fair'),
    Poor: t('healthCondition.options.Poor')
});

export const AreaInterested = (t: Translation) => ({
    Administration: t('areaInterested.options.administration'),
    'Food Bank': t('areaInterested.options.foodBank'),
    Accounting: t('areaInterested.options.accounting'),
    'Maintenance team/Home repair team': t('areaInterested.options.maintenanceTeam'),
    'Publications/Media': t('areaInterested.options.publicationsMedia'),
    'IT support': t('areaInterested.options.itSupport'),
    Other: t('areaInterested.options.other')
});
