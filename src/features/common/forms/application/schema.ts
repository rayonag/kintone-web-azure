import { z } from 'zod';

const validateCheckbox = (val: string[]) => {
    return val.length > 0;
};
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
const passport: z.ZodString = z.string().min(1).max(50);
const passportExpiration: z.ZodString = z.string().min(1).max(50);
const passportIssued: z.ZodString = z.string().min(1).max(50);
const age: z.ZodString = z.string().min(1).max(50);
const birthDay: z.ZodString = z.string().min(1).max(50);
const birthMonth: z.ZodString = z.string().min(1).max(50);
const birthYear: z.ZodString = z.string().min(1).max(50);
const ssn: z.ZodString = z.string().min(1).max(50);
const sex: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const maritalStatus: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const children: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasFamilySupport: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hasFamilySupportExplain: z.ZodOptional<z.ZodString> = z.string().optional();

// 2

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
    passport: passport,
    passportExpiration: passportExpiration,
    passportIssued: passportIssued,
    age: age,
    birthDay: birthDay,
    birthMonth: birthMonth,
    birthYear: birthYear,
    ssn: ssn,
    sex: sex,
    maritalStatus: maritalStatus,
    children: children,
    hasFamilySupport: hasFamilySupport,
    hasFamilySupportExplain: hasFamilySupportExplain,

    verify: verify
});
export type ApplicationFormType = z.infer<typeof ApplicationFormSchema>;

export const HealthQuestionnaireDefaultValues: Partial<ApplicationFormType> = {
    heightUnit: [],
    weightUnit: [],
    migranes: [],
    headInjury: [],
    weakness: [],
    backProblems: [],
    asthma: [],
    lossHearing: [],
    epilepsy: [],
    anxiety: [],
    fatigue: [],
    diabetes: [],
    hemorrhoids: [],
    hepatitis: [],
    stroke: [],
    emphysema: [],
    anemia: [],
    neckPain: [],
    fainting: [],
    dizziness: [],
    heartProblems: [],
    tuberculosis: [],
    lossVision: [],
    depression: [],
    shortBreath: [],
    arthritis: [],
    vomiting: [],
    hiv: [],
    abnormalBleeding: [],
    cancer: [],
    brokenBones: [],
    highBloodPressure: [],
    // 3
    verify: false
};
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
