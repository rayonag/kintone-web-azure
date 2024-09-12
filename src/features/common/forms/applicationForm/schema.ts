import { sign } from 'crypto';
import { DateTime } from 'luxon';
import { string, z } from 'zod';

const validateCheckbox = (val: string[]) => {
    return val.length > 0;
};
const validateRadio = (value: string | null) => value !== null;
const validateDate = (value: string | undefined) => {
    if (!value) return true;
    if (!DateTime.fromFormat(value, 'dd/MM/yyyy').isValid) return false;
    else if (DateTime.fromFormat(value, 'dd/MM/yyyy') >= DateTime.now().plus({ years: 100 })) return false;
    else if (DateTime.fromFormat(value, 'dd/MM/yyyy') <= DateTime.now().minus({ years: 100 })) return false;
    return true;
};
const error_required = {
    message: 'This field is required'
};
const error_invalidDate = {
    message: 'Invalid date'
};
const validateNumber = (value: string) => {
    const numberValue = parseFloat(value);
    return (
        !isNaN(numberValue) && numberValue >= 0 && Number.isInteger(numberValue * 100) && Number((numberValue * 100).toFixed(0)) === numberValue * 100
    );
};
const validateSSN = (value: string | undefined, ctx: any, hi: any, s: any) => {
    if (ctx.parent['office'] === 'USA' && !value) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'SSN is required if office is in the USA'
        });
    }
};

// common
const yesNo: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const date: z.ZodEffects<z.ZodString> = z.string().min(1).max(50).refine(validateDate, error_invalidDate);
const date_optional: z.ZodEffects<z.ZodOptional<z.ZodString>> = z.string().optional().refine(validateDate, error_invalidDate);
const string50: z.ZodString = z.string().min(1).max(50);
const string300: z.ZodString = z.string().min(1).max(300);
const string2000: z.ZodString = z.string().min(1).max(2000);
const string4000: z.ZodString = z.string().min(1).max(4000);
const string_optional: z.ZodOptional<z.ZodString> = z.string().optional();

// system
const ref: z.ZodString = z.string().min(1).max(50);
const nationalOffice = z.discriminatedUnion('office', [
    // 1 ssnNumber is required if office is USA
    z.object({
        office: z.literal('USA'),
        ssnNumber: z.string().min(1).max(50)
    }),
    z.object({
        office: z.enum(['Australia', 'Canada', 'Japan', 'New Zealand', 'South Africa', 'South Korea', 'United Kingdom', 'Other']),
        ssnNumber: z.string().optional()
    })
]);
const type = z.discriminatedUnion('type', [
    // 9 reference Other is required if type is Long Term or Zealous
    z.object({
        type: z.literal('Short Term'),
        refOtherName: string_optional,
        refOtherAddress: string_optional,
        refOtherPhone: string_optional,
        refOtherEmail: string_optional,
        refOtherRelationship: string_optional
    }),
    z.object({
        type: z.enum(['Long Term', 'Zealous']),
        refOtherName: string50,
        refOtherAddress: string50,
        refOtherPhone: string50,
        refOtherEmail: string50.email(),
        refOtherRelationship: string50
    })
]);

// 1
const firstName = string50;
const middleName = string_optional;
const lastName = string50;
const street = string50;
const city = string50;
const state = string50;
const zip = string50;
const country = string50;
const phone = string50;
const email: z.ZodString = z.string().email();
const passportNumber = string50;
//const passportExpiration: z.ZodString = z.string().min(1).max(50);
const passportIssued = string50;
const age = string50;
const birthday = string50;
const ssnNumber = string50;
const sex: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const maritalStatus = string50;
const spouseFullName = string_optional;
const childrenNames = string_optional;
const hasFamilySupport: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const hasFamilySupportExplain = string300;

// 2
const healthCondition: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const seriousInjury: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const seriousInjuryExplain: z.ZodOptional<z.ZodString> = z.string().optional();
const hasHandicap: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const hasHandicapExplain: z.ZodOptional<z.ZodString> = z.string().optional();
const doSmoke: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const canLift33lbs: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);
const personalDoctor = string_optional;
const personalDoctorPhone = string_optional;

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
const describeMotivation = string2000;
const areaInterested = z.array(z.string()).refine(
    (arr) => {
        return arr.some((str) => str.trim() !== '');
    },
    { message: 'You must select at least one' }
);
const otherAreaInterested = string_optional;
const ifNoPosition = yesNo;

// 5
const educationTable = z.array(
    z.object({
        educationSchoolName: string_optional,
        educationDegree: string_optional,
        educationDate: date_optional
    })
);
const employProfession = string_optional;
const employAccreditation = string_optional;
const employTable = z.array(
    z.object({
        employDate: string_optional,
        employName: string_optional,
        employAddress: string_optional,
        employDuties: string_optional,
        employLeavingReason: string_optional
    })
);
const hobby = string_optional;
const clubs = string_optional;
const serviceTable = z.array(
    z.object({
        serviceOrganizationName: string_optional,
        serviceStartDate: string_optional,
        serviceEndDate: string_optional,
        serviceDuties: string_optional
    })
);
const hasDriverLicense = yesNo;
const hasLicenseMoreThanTwelveMonths = yesNo;
const drivingViolation = string_optional;
const hasConvictedTrafficAccident = yesNo;
const hasTrafficAccidentExplain = string_optional;
const hasVisitedIsrael = yesNo;
const hasVisitedIsraelDates = string_optional;
const listForeignCountries = string_optional;

// 6
const churchName = string4000;
const christianExperience = string4000;
const christianJewishUnderstanding = string4000;
const interestIsrael = string4000;

// 7
const skillInventory = z.string();

// 8
const characters = z
    .object({
        character1: z.array(z.string()),
        character2: z.array(z.string()),
        character3: z.array(z.string()),
        character4: z.array(z.string())
    })
    .refine(
        (obj) => {
            return Object.keys(obj).some((key) => {
                const typedKey = key as keyof typeof obj;
                return obj[typedKey].some((str) => str.trim() !== '');
            });
        },
        { message: 'You must select at least one' }
    );
const checkBox: z.ZodArray<z.ZodString> = z.array(z.string());

// 9
const refPastorName: z.ZodString = z.string().min(1).max(50);
const refPastorAddress: z.ZodString = z.string().min(1).max(50);
const refPastorPhone: z.ZodString = z.string().min(1).max(50);
const refPastorEmail: z.ZodString = z.string().email();
const refEmployerName: z.ZodString = z.string().min(1).max(50);
const refEmployerAddress: z.ZodString = z.string().min(1).max(50);
const refEmployerPhone: z.ZodString = z.string().min(1).max(50);
const refEmployerEmail: z.ZodString = z.string().email();
const refFriendName: z.ZodString = z.string().min(1).max(50);
const refFriendAddress: z.ZodString = z.string().min(1).max(50);
const refFriendPhone: z.ZodString = z.string().min(1).max(50);
const refFriendEmail: z.ZodString = z.string().email();

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
    office: nationalOffice,
    type: type,

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
    passportExpiration: date,
    passportIssued: passportIssued,
    age: age,
    birthday: date,
    //ssnNumber is under office object
    sex: sex,
    maritalStatus: maritalStatus,
    spouseFullName: spouseFullName,
    hasChildren: yesNo,
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
    minAvailability: string_optional,
    maxAvailability: string_optional,
    preferredStartDate: date_optional,
    preferredStartDate2: date_optional,
    ifNoPosition: string_optional, // making optional for Zealous

    // 5
    educationTable: educationTable,
    employProfession: employProfession,
    employAccreditation: employAccreditation,
    employTable: employTable,
    hobby: hobby,
    clubs: clubs,
    serviceTable: serviceTable,
    hasDriverLicense: hasDriverLicense,
    hasLicenseMoreThanTwelveMonths: hasLicenseMoreThanTwelveMonths,
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
    skillCarpentry: skillInventory,
    skillConstruction: skillInventory,
    skillElectrical: skillInventory,
    skillForklift: skillInventory,
    skillMechanic: skillInventory,
    skillRepair: skillInventory,
    skillLaborer: skillInventory,
    skillWelding: skillInventory,
    skillMasonry: skillInventory,
    skillPlumbing: skillInventory,
    skillPainting: skillInventory,
    skillWarehouseMaintenance: skillInventory,
    skillTransportation: skillInventory,
    hasHeavyLicense: yesNo,
    // B
    skillWebsite: skillInventory,
    skillWebDesign: skillInventory,
    skillIT: skillInventory,
    skillVideo: skillInventory,
    skillComputerDesign: skillInventory,
    skillAdobePhotoshop: skillInventory,
    skillAdobeInDesign: skillInventory,
    skillOtherPrograms: skillInventory,
    skillJournalism: skillInventory,
    skillPublicSpeaking: skillInventory,
    skillFilmmaking: skillInventory,
    skillPhotography: skillInventory,
    // C
    skillAccounting: skillInventory,
    skillAdministration: skillInventory,
    skillBookkeeping: skillInventory,
    skillOperatingSystems: skillInventory,
    skillSystem: z.array(z.string()),
    skillSoftware: z.array(z.string()),
    skillOfficeSuite: skillInventory,
    skillExcel: skillInventory,
    skillTyping: skillInventory,
    skillGoogleDrive: skillInventory,
    skillSecretarial: skillInventory,
    skillOrganizing: skillInventory,
    skillLibrary: skillInventory,
    skillReception: skillInventory,
    // D
    skillProofreading: skillInventory,
    skillCopyEditing: skillInventory,
    skillTranslation: skillInventory,
    // E
    skillCounseling: skillInventory,
    skillMusicalInstrument: skillInventory,
    skillJanitorial: skillInventory,
    skillCooking: skillInventory,
    skillForeignLanguage: string_optional,
    skillComputer: string_optional,
    skillSpecialTraining: string_optional,

    // 8
    characters: characters,
    character1: checkBox,
    character2: checkBox,
    character3: checkBox,
    character4: checkBox,

    // 9
    refPastorName: refPastorName,
    refPastorAddress: refPastorAddress,
    refPastorPhone: refPastorPhone,
    refPastorEmail: refPastorEmail,
    refEmployerName: refEmployerName,
    refEmployerAddress: refEmployerAddress,
    refEmployerPhone: refEmployerPhone,
    refEmployerEmail: refEmployerEmail,
    refFriendName: refFriendName,
    refFriendAddress: refFriendAddress,
    refFriendPhone: refFriendPhone,
    refFriendEmail: refFriendEmail,
    // refOther is under type object
    hasFriendsIsrael: yesNo,
    hasFriendsIsraelExplain: string_optional,

    // 10
    verify1: verify,
    verify2: verify,
    verify3: verify,
    verify4: verify,
    verify5: verify,
    verify6: verify,
    verify7: verify,
    signature: string50,
    signatureDate: date
});

export type ApplicationFormType = z.infer<typeof ApplicationFormSchema>;

export const ApplicationFormDefaultValues: Partial<ApplicationFormType> = {
    areaInterested: [],
    character1: [],
    character2: [],
    character3: [],
    character4: [],
    skillCarpentry: '0',
    skillConstruction: '0',
    skillElectrical: '0',
    skillForklift: '0',
    skillMechanic: '0',
    skillRepair: '0',
    skillLaborer: '0',
    skillWelding: '0',
    skillMasonry: '0',
    skillPlumbing: '0',
    skillPainting: '0',
    skillWarehouseMaintenance: '0',
    skillTransportation: '0',
    skillWebsite: '0',
    skillWebDesign: '0',
    skillIT: '0',
    skillVideo: '0',
    skillComputerDesign: '0',
    skillAdobePhotoshop: '0',
    skillAdobeInDesign: '0',
    skillOtherPrograms: '0',
    skillJournalism: '0',
    skillPublicSpeaking: '0',
    skillFilmmaking: '0',
    skillPhotography: '0',
    skillAccounting: '0',
    skillAdministration: '0',
    skillBookkeeping: '0',
    skillOperatingSystems: '0',
    skillSystem: [],
    skillSoftware: [],
    skillOfficeSuite: '0',
    skillExcel: '0',
    skillTyping: '0',
    skillGoogleDrive: '0',
    skillSecretarial: '0',
    skillOrganizing: '0',
    skillLibrary: '0',
    skillReception: '0',
    skillProofreading: '0',
    skillCopyEditing: '0',
    skillTranslation: '0',
    skillCounseling: '0',
    skillMusicalInstrument: '0',
    skillJanitorial: '0',
    skillCooking: '0'
};
export const ApplicationFormFields = [
    // Step 0: System
    ['ref', 'office'],
    // Step 1: Personal Information
    [
        'office',
        'firstName',
        'middleName',
        'lastName',
        'street',
        'city',
        'state',
        'zip',
        'country',
        'phone',
        'email',
        'passportNumber',
        'passportExpiration',
        'passportIssued',
        'age',
        'birthday',
        //'ssnNumber',
        'sex',
        'maritalStatus',
        'spouseFullName',
        'childrenNames',
        'hasFamilySupport',
        'hasFamilySupportExplain'
    ],
    // Step 2: Health Information
    [
        'healthCondition',
        'seriousInjury',
        'seriousInjuryExplain',
        'hasHandicap',
        'hasHandicapExplain',
        'doSmoke',
        'canLift33lbs',
        'personalDoctor',
        'personalDoctorPhone'
    ],
    // Step 3: Emergency Contact
    [
        'emergencyName',
        'emergencyRelationship',
        'emergencyStreet',
        'emergencyCity',
        'emergencyState',
        'emergencyZip',
        'emergencyPhone',
        'emergencyCountry',
        'emergencyEmail'
    ],
    // Step 4: Motivation and Availability
    [
        'describeMotivation',
        'areaInterested',
        'otherAreaInterested',
        'minAvailability',
        'maxAvailability',
        'preferredStartDate',
        'preferredStartDate2',
        'ifNoPosition'
    ],
    // Step 5: Education and Employment
    [
        'educationTable',
        'employProfession',
        'employAccreditation',
        'employHistory',
        'hobby',
        'clubs',
        'serviceOrganizationName',
        'serviceStartDate',
        'serviceEndDate',
        'serviceDuties',
        'hasDriverLicense',
        'hasHeldLicense12Months',
        'drivingViolation',
        'hasConvictedTrafficAccident',
        'hasTrafficAccidentExplain',
        'hasVisitedIsrael',
        'hasVisitedIsraelDates',
        'listForeignCountries'
    ],
    // Step 6: Religious Information
    ['churchName', 'christianExperience', 'christianJewishUnderstanding', 'interestIsrael'],
    // Step 7: Skills
    [
        'skillCarpentry',
        'skillConstruction',
        'skillElectrical',
        'skillForklift',
        'skillMechanic',
        'skillRepair',
        'skillLaborer',
        'skillWelding',
        'skillMasonry',
        'skillPlumbing',
        'skillPainting',
        'skillWarehouseMaintenance',
        'skillTransportation',
        'hasHeavyLicense',
        'skillWebsite',
        'skillWebDesign',
        'skillIT',
        'skillVideo',
        'skillComputerDesign',
        'skillAdobePhotoshop',
        'skillAdobeInDesign',
        'skillOtherPrograms',
        'skillJournalism',
        'skillPublicSpeaking',
        'skillFilmmaking',
        'skillPhotography',
        'skillAccounting',
        'skillAdministration',
        'skillBookkeeping',
        'skillOperatingSystems',
        'skillSystem',
        'skillSoftware',
        'skillOfficeSuite',
        'skillExcel',
        'skillTyping',
        'skillGoogleDrive',
        'skillSecretarial',
        'skillOrganizing',
        'skillLibrary',
        'skillReception',
        'skillProofreading',
        'skillCopyEditing',
        'skillTranslation',
        'skillCounseling',
        'skillMusicalInstrument',
        'skillJanitorial',
        'skillCooking',
        'skillForeignLanguage',
        'skillComputer',
        'skillSpecialTraining'
    ],
    // Step 8: Character References
    ['characters', 'character1', 'character2', 'character3', 'character4'],
    // Step 9: References
    [
        'refPastorName',
        'refPastorAddress',
        'refPastorPhone',
        'refPastorEmail',
        'refEmployerName',
        'refEmployerAddress',
        'refEmployerPhone',
        'refEmployerEmail',
        'refFriendName',
        'refFriendAddress',
        'refFriendPhone',
        'refFriendEmail',
        // 'refOtherName',
        // 'refOtherAddress',
        // 'refOtherPhone',
        // 'refOtherEmail',
        // 'refOtherRelationship',
        'type',
        'hasFriendsIsrael',
        'hasFriendsIsraelExplain'
    ],
    // Step 10: Verification
    ['verify1', 'verify2', 'verify3', 'verify4', 'verify5', 'verify6', 'verify7', 'signature', 'signatureDate']
] as const;
