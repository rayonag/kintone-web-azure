import { z } from 'zod';

const validateCheckbox = (val: string[]) => {
    return val.length > 0;
};
const validateRadio = (value: string | null) => value !== null;
const requiredErrorMessage = {
    message: 'This field is required'
};
const validateNumber = (value: string) => {
    const numberValue = parseFloat(value);
    return (
        !isNaN(numberValue) && numberValue >= 0 && Number.isInteger(numberValue * 100) && Number((numberValue * 100).toFixed(0)) === numberValue * 100
    );
};
// system
const ref: z.ZodString = z.string().min(1).max(50);
const office: z.ZodString = z.string().min(1).max(50);
// 1
const firstName: z.ZodString = z.string().min(1).max(50);
const middleName: z.ZodOptional<z.ZodString> = z.string().optional();
const lastName: z.ZodString = z.string().min(1).max(50);
const street: z.ZodString = z.string().min(1).max(50);
const city: z.ZodString = z.string().min(1).max(50);
const state: z.ZodString = z.string().min(1).max(50);
const zip: z.ZodString = z.string().min(1).max(50);
const country: z.ZodString = z.string().min(1).max(50);
const phone: z.ZodString = z.string().min(1).max(50);
const email: z.ZodString = z.string().email();
const passportNumber: z.ZodString = z.string().min(1).max(50);
const passportExpiration: z.ZodString = z.string().min(1).max(50);
const passportIssued: z.ZodString = z.string().min(1).max(50);
const age: z.ZodString = z.string().min(1).max(50);
const birthday: z.ZodString = z.string().min(1).max(50);
const ssn: z.ZodString = z.string().min(1).max(50);
const sex: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const maritalStatus: z.ZodString = z.string().min(1).max(50);
const spouseFullName: z.ZodString = z.string().min(1).max(50);
const childrenNames: z.ZodString = z.string().min(1).max(50);
const hasFamilySupport: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const hasFamilySupportExplain: z.ZodOptional<z.ZodString> = z.string().optional();

// 2
const healthCondition: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const seriousInjury: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const seriousInjuryExplain: z.ZodOptional<z.ZodString> = z.string().optional();
const hasHandicap: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const hasHandicapExplain: z.ZodOptional<z.ZodString> = z.string().optional();
const doSmoke: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const canLift33lbs: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, requiredErrorMessage);
const personalDoctor: z.ZodString = z.string().min(1).max(50);
const personalDoctorPhone: z.ZodString = z.string().min(1).max(50);

// 3
const emergencyName: z.ZodString = z.string().min(1).max(50);
const emergencyRelationship: z.ZodString = z.string().min(1).max(50);
const emergencyStreet: z.ZodString = z.string().min(1).max(50);
const emergencyCity: z.ZodString = z.string().min(1).max(50);
const emergencyState: z.ZodString = z.string().min(1).max(50);
const emergencyZip: z.ZodString = z.string().min(1).max(50);
const emergencyPhone: z.ZodString = z.string().min(1).max(50);
const emergencyCountry: z.ZodString = z.string().min(1).max(50);
const emergencyEmail: z.ZodString = z.string().email();

// 4
const describeMotivation: z.ZodString = z.string().min(1).max(50);
const areaInterested: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const otherAreaInterested: z.ZodOptional<z.ZodString> = z.string().optional();
const minAvailability: z.ZodString = z.string().min(1).max(50);
const maxAvailability: z.ZodString = z.string().min(1).max(50);
const preferredStartDate: z.ZodString = z.string().min(1).max(50);
const preferredStartDate2: z.ZodString = z.string().min(1).max(50);
const ifNoPosition: z.ZodString = z.string().min(1).max(50);

// 5
const educationSchoolName: z.ZodString = z.string().min(1).max(50);
const educationDegree: z.ZodString = z.string().min(1).max(50);
const educationDate: z.ZodString = z.string().min(1).max(50);
const employProfessional: z.ZodString = z.string().min(1).max(50);
const employAccreditation: z.ZodString = z.string().min(1).max(50);
const employHistory: z.ZodString = z.string().min(1).max(50);
const hobby: z.ZodString = z.string().min(1).max(50);
const clubs: z.ZodString = z.string().min(1).max(50);
const serviceOrganizationName: z.ZodString = z.string().min(1).max(50);
const serviceStartDate: z.ZodString = z.string().min(1).max(50);
const serviceEndDate: z.ZodString = z.string().min(1).max(50);
const serviceDuties: z.ZodString = z.string().min(1).max(50);
const hasDriverLicense: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasHeldLicense12Months: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const drivingViolation: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasConvictedTrafficAccident: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasTrafficAccidentExplain: z.ZodOptional<z.ZodString> = z.string().optional();
const hasVisitedIsrael: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasVisitedIsraelDates: z.ZodString = z.string().min(1).max(50);
const listForeignCountries: z.ZodString = z.string().min(1).max(50);

// 6
const churchName: z.ZodString = z.string().min(1).max(50);
const christianExperience: z.ZodString = z.string().min(1).max(50);
const christianJewishUnderstanding: z.ZodString = z.string().min(1).max(50);
const interestIsrael: z.ZodString = z.string().min(1).max(50);

// 7
// A
const skillCarpentry: z.ZodNumber = z.number();
const skillConstruction: z.ZodNumber = z.number();
const skillElectrical: z.ZodNumber = z.number();
const skillForklift: z.ZodNumber = z.number();
const skillMechanic: z.ZodNumber = z.number();
const skillRepair: z.ZodNumber = z.number();
const skillLaborer: z.ZodNumber = z.number();
const skillWelding: z.ZodNumber = z.number();
const skillMasonry: z.ZodNumber = z.number();
const skillPlumbing: z.ZodNumber = z.number();
const skillPainting: z.ZodNumber = z.number();
const skillWarehouseMaintenance: z.ZodNumber = z.number();
const skillTransportation: z.ZodNumber = z.number();
const hasHeavyLicense: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
// B
const skillWebsite: z.ZodNumber = z.number();
const skillWebDesign: z.ZodNumber = z.number();
const skillIT: z.ZodNumber = z.number();
const skillVideo: z.ZodNumber = z.number();
const skillComputerDesign: z.ZodNumber = z.number();
const skillAdobePhotoshop: z.ZodNumber = z.number();
const skillAdobeInDesign: z.ZodNumber = z.number();
const skillOtherPrograms: z.ZodNumber = z.number();
const skillJournalism: z.ZodNumber = z.number();
const skillPublicSpeaking: z.ZodNumber = z.number();
const skillFilmmaking: z.ZodNumber = z.number();
const skillPhotography: z.ZodNumber = z.number();
// C
const skillAccounting: z.ZodNumber = z.number();
const skillAdministration: z.ZodNumber = z.number();
const skillBookkeeping: z.ZodNumber = z.number();
const skillOperatingSystems: z.ZodNumber = z.number();
const skillSystem: z.ZodNumber = z.number();
const skillSoftware: z.ZodNumber = z.number();
const skillOfficeSuite: z.ZodNumber = z.number();
const skillExcel: z.ZodNumber = z.number();
const skillTyping: z.ZodNumber = z.number();
const skillGoogleDrive: z.ZodNumber = z.number();
const skillSecretarial: z.ZodNumber = z.number();
const skillOrganizing: z.ZodNumber = z.number();
const skillLibrary: z.ZodNumber = z.number();
const skillReception: z.ZodNumber = z.number();
// D
const skillProofreading: z.ZodNumber = z.number();
const skillCopyEditing: z.ZodNumber = z.number();
const skillTranslation: z.ZodNumber = z.number();
// E
const skillCounseling: z.ZodNumber = z.number();
const skillMusicalInstrument: z.ZodNumber = z.number();
const skillJanitorial: z.ZodNumber = z.number();
const skillCooking: z.ZodNumber = z.number();
const skillForeignLanguage: z.ZodNumber = z.number();
const skillComputer: z.ZodNumber = z.number();
const skillSpecialTraining: z.ZodNumber = z.number();

// 8
const character1: z.ZodString = z.string().min(1).max(50);
const character2: z.ZodString = z.string().min(1).max(50);
const character3: z.ZodString = z.string().min(1).max(50);
const character4: z.ZodString = z.string().min(1).max(50);

// 9
const refPasterName: z.ZodString = z.string().min(1).max(50);
const refPasterAddress: z.ZodString = z.string().min(1).max(50);
const refPasterPhone: z.ZodString = z.string().min(1).max(50);
const refPasterEmail: z.ZodString = z.string().email();
const refEmployerName: z.ZodString = z.string().min(1).max(50);
const refEmployerAddress: z.ZodString = z.string().min(1).max(50);
const refEmployerPhone: z.ZodString = z.string().min(1).max(50);
const refEmployerEmail: z.ZodString = z.string().email();
const refFriendName: z.ZodString = z.string().min(1).max(50);
const refFriendAddress: z.ZodString = z.string().min(1).max(50);
const refFriendPhone: z.ZodString = z.string().min(1).max(50);
const refFriendEmail: z.ZodString = z.string().email();
const refOtherName: z.ZodString = z.string().min(1).max(50);
const refOtherAddress: z.ZodString = z.string().min(1).max(50);
const refOtherPhone: z.ZodString = z.string().min(1).max(50);
const refOtherEmail: z.ZodString = z.string().email();
const refOtherRelationship: z.ZodString = z.string().min(1).max(50);
const hasFriendsIsrael: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasFriendsIsraelExplain: z.ZodOptional<z.ZodString> = z.string().optional();

// 10
const verify: z.ZodEffects<z.ZodBoolean> = z.boolean().refine((value) => value === true, {
    message: 'Please check the box'
});

export const customErrorMap =
    (t: any): z.ZodErrorMap =>
    (error, ctx) => {
        switch (error.code) {
            case z.ZodIssueCode.too_small:
                return { message: t('error.required') };
            case z.ZodIssueCode.too_big:
                return { message: t('error.too_big') };
            case z.ZodIssueCode.custom:
                return { message: t('error.required') };
        }

        // fall back to default message!
        return { message: ctx.defaultError };
    };

export const ApplicationFormSchema = z.object({
    // system
    ref: ref,
    office: office,

    // 1
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    street: street,
    city: city,
    state: state,
    zip: zip,
    country: country,
    phone: phone,
    email: email,
    passportNumber: passportNumber,
    passportExpiration: passportExpiration,
    passportIssued: passportIssued,
    age: age,
    birthday: birthday,
    ssn: ssn,
    sex: sex,
    maritalStatus: maritalStatus,
    spouseFullName: spouseFullName,
    childrenNames: childrenNames,
    hasFamilySupport: hasFamilySupport,
    hasFamilySupportExplain: hasFamilySupportExplain,

    // 2
    healthCondition: healthCondition,
    seriousInjury: seriousInjury,
    seriousInjuryExplain: seriousInjuryExplain,
    hasHandicap: hasHandicap,
    hasHandicapExplain: hasHandicapExplain,
    doSmoke: doSmoke,
    canLift33lbs: canLift33lbs,
    personalDoctor: personalDoctor,
    personalDoctorPhone: personalDoctorPhone,

    // 3
    emergencyName: emergencyName,
    emergencyRelationship: emergencyRelationship,
    emergencyStreet: emergencyStreet,
    emergencyCity: emergencyCity,
    emergencyState: emergencyState,
    emergencyZip: emergencyZip,
    emergencyPhone: emergencyPhone,
    emergencyCountry: emergencyCountry,
    emergencyEmail: emergencyEmail,

    // 4
    describeMotivation: describeMotivation,
    areaInterested: areaInterested,
    otherAreaInterested: otherAreaInterested,
    minAvailability: minAvailability,
    maxAvailability: maxAvailability,
    preferredStartDate: preferredStartDate,
    preferredStartDate2: preferredStartDate2,
    ifNoPosition: ifNoPosition,

    // 5
    educationSchoolName: educationSchoolName,
    educationDegree: educationDegree,
    educationDate: educationDate,
    employProfessional: employProfessional,
    employAccreditation: employAccreditation,
    employHistory: employHistory,
    hobby: hobby,
    clubs: clubs,
    serviceOrganizationName: serviceOrganizationName,
    serviceStartDate: serviceStartDate,
    serviceEndDate: serviceEndDate,
    serviceDuties: serviceDuties,
    hasDriverLicense: hasDriverLicense,
    hasHeldLicense12Months: hasHeldLicense12Months,
    drivingViolation: drivingViolation,
    hasConvictedTrafficAccident: hasConvictedTrafficAccident,
    hasTrafficAccidentExplain: hasTrafficAccidentExplain,
    hasVisitedIsrael: hasVisitedIsrael,
    hasVisitedIsraelDates: hasVisitedIsraelDates,
    listForeignCountries: listForeignCountries,

    // 6
    churchName: churchName,
    christianExperience: christianExperience,
    christianJewishUnderstanding: christianJewishUnderstanding,
    interestIsrael: interestIsrael,

    // 7
    // A
    skillCarpentry: skillCarpentry,
    skillConstruction: skillConstruction,
    skillElectrical: skillElectrical,
    skillForklift: skillForklift,
    skillMechanic: skillMechanic,
    skillRepair: skillRepair,
    skillLaborer: skillLaborer,
    skillWelding: skillWelding,
    skillMasonry: skillMasonry,
    skillPlumbing: skillPlumbing,
    skillPainting: skillPainting,
    skillWarehouseMaintenance: skillWarehouseMaintenance,
    skillTransportation: skillTransportation,
    hasHeavyLicense: hasHeavyLicense,
    // B
    skillWebsite: skillWebsite,
    skillWebDesign: skillWebDesign,
    skillIT: skillIT,
    skillVideo: skillVideo,
    skillComputerDesign: skillComputerDesign,
    skillAdobePhotoshop: skillAdobePhotoshop,
    skillAdobeInDesign: skillAdobeInDesign,
    skillOtherPrograms: skillOtherPrograms,
    skillJournalism: skillJournalism,
    skillPublicSpeaking: skillPublicSpeaking,
    skillFilmmaking: skillFilmmaking,
    skillPhotography: skillPhotography,
    // C
    skillAccounting: skillAccounting,
    skillAdministration: skillAdministration,
    skillBookkeeping: skillBookkeeping,
    skillOperatingSystems: skillOperatingSystems,
    skillSystem: skillSystem,
    skillSoftware: skillSoftware,
    skillOfficeSuite: skillOfficeSuite,
    skillExcel: skillExcel,
    skillTyping: skillTyping,
    skillGoogleDrive: skillGoogleDrive,
    skillSecretarial: skillSecretarial,
    skillOrganizing: skillOrganizing,
    skillLibrary: skillLibrary,
    skillReception: skillReception,
    // D
    skillProofreading: skillProofreading,
    skillCopyEditing: skillCopyEditing,
    skillTranslation: skillTranslation,
    // E
    skillCounseling: skillCounseling,
    skillMusicalInstrument: skillMusicalInstrument,
    skillJanitorial: skillJanitorial,
    skillCooking: skillCooking,
    skillForeignLanguage: skillForeignLanguage,
    skillComputer: skillComputer,
    skillSpecialTraining: skillSpecialTraining,

    // 8
    character1: character1,
    character2: character2,
    character3: character3,
    character4: character4,

    // 9
    refPasterName: refPasterName,
    refPasterAddress: refPasterAddress,
    refPasterPhone: refPasterPhone,
    refPasterEmail: refPasterEmail,
    refEmployerName: refEmployerName,
    refEmployerAddress: refEmployerAddress,
    refEmployerPhone: refEmployerPhone,
    refEmployerEmail: refEmployerEmail,
    refFriendName: refFriendName,
    refFriendAddress: refFriendAddress,
    refFriendPhone: refFriendPhone,
    refFriendEmail: refFriendEmail,
    refOtherName: refOtherName,
    refOtherAddress: refOtherAddress,
    refOtherPhone: refOtherPhone,
    refOtherEmail: refOtherEmail,
    refOtherRelationship: refOtherRelationship,
    hasFriendsIsrael: hasFriendsIsrael,
    hasFriendsIsraelExplain: hasFriendsIsraelExplain,

    // 10
    verify: verify
});

export type ApplicationFormType = z.infer<typeof ApplicationFormSchema>;

// export const HealthQuestionnaireDefaultValues: Partial<ApplicationFormType> = {
//     heightUnit: [],
//     weightUnit: [],
//     migranes: [],
//     headInjury: [],
//     weakness: [],
//     backProblems: [],
//     asthma: [],
//     lossHearing: [],
//     epilepsy: [],
//     anxiety: [],
//     fatigue: [],
//     diabetes: [],
//     hemorrhoids: [],
//     hepatitis: [],
//     stroke: [],
//     emphysema: [],
//     anemia: [],
//     neckPain: [],
//     fainting: [],
//     dizziness: [],
//     heartProblems: [],
//     tuberculosis: [],
//     lossVision: [],
//     depression: [],
//     shortBreath: [],
//     arthritis: [],
//     vomiting: [],
//     hiv: [],
//     abnormalBleeding: [],
//     cancer: [],
//     brokenBones: [],
//     highBloodPressure: [],
//     // 3
//     verify: false
// };
export const ApplicationFormFields = [
    ['name', 'age', 'height', 'heightUnit', 'weight', 'weightUnit'],
    [
        'migranes',
        'headInjury',
        'weakness',
        'backProblems',
        'asthma',
        'lossHearing',
        'epilepsy',
        'anxiety',
        'fatigue',
        'diabetes',
        'hemorrhoids',
        'hepatitis',
        'stroke',
        'emphysema',
        'anemia',
        'neckPain',
        'fainting',
        'dizziness',
        'heartProblems',
        'tuberculosis',
        'lossVision',
        'depression',
        'shortBreath',
        'arthritis',
        'vomiting',
        'hiv',
        'abnormalBleeding',
        'cancer',
        'brokenBones',
        'highBloodPressure'
    ],
    ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'verify']
] as const;
