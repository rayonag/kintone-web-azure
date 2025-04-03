export const Necessary_Documents = [
    'passport',
    'recentPhoto',
    'medicalStatusForm',
    'doctorLetter',
    'criminalCheck',
    'criminalCheckApostille'
] as const;
export const Necessary_Documents_USA = [
    'passport',
    'recentPhoto',
    'medicalStatusForm',
    'doctorLetter',
    'criminalCheck',
    'criminalCheckApostille',
    'ssn'
] as const;
export const Necessary_Documents_ShortTerm = ['passport', 'recentPhoto', 'medicalStatusForm', 'doctorLetter'] as const;
export const Necessary_Documents_ShortTerm_USA = ['passport', 'recentPhoto', 'medicalStatusForm', 'doctorLetter', 'ssn'] as const;

export type NecessaryDocuments = (typeof Necessary_Documents_USA)[number];
