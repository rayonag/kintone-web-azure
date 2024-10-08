import { z } from 'zod';
import { useTranslation } from 'react-i18next';

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
const validateRadio = (value: string | null) => value !== null;
// system
const ref: z.ZodString = z.string().min(1).max(50);
const office: z.ZodString = z.string().min(1).max(50);

// common
const radio: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio);

// 1
const name: z.ZodString = z.string().min(1).max(50);
const age: z.ZodString = z.string().min(1).max(50);
const height: z.ZodEffects<z.ZodString> = z.string().refine(validateNumber, 'Invalid number');
const heightUnit: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const weight: z.ZodString = z.string().min(1).max(50);
const weightUnit: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);

// 2
const migranes: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const headInjury: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const weakness: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const backProblems: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const asthma: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const lossHearing: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const epilepsy: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const anxiety: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const fatigue: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const diabetes: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hemorrhoids: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hepatitis: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const stroke: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const emphysema: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const anemia: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const neckPain: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const fainting: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const dizziness: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const heartProblems: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const tuberculosis: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const lossVision: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const depression: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const shortBreath: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const arthritis: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const vomiting: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const hiv: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const abnormalBleeding: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const cancer: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const brokenBones: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);
const highBloodPressure: z.ZodEffects<z.ZodArray<z.ZodString>> = z.string().array().refine(validateCheckbox, requiredErrorMessage);

// 3
const q1: z.ZodString = z.string();
const q2: z.ZodString = z.string();
const q3: z.ZodString = z.string();
const q4: z.ZodString = z.string();
const q5: z.ZodString = z.string();
const q6: z.ZodString = z.string();
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

export const HealthQuestionnaireSchema = z.object({
    // system
    ref: ref,
    office: office,

    // 1
    name: name,
    age: age,
    height: height,
    heightUnit: radio,
    weight: weight,
    weightUnit: radio,

    // 2
    migranes: migranes,
    headInjury: headInjury,
    weakness: weakness,
    backProblems: backProblems,
    asthma: asthma,
    lossHearing: lossHearing,
    epilepsy: epilepsy,
    anxiety: anxiety,
    fatigue: fatigue,
    diabetes: diabetes,
    hemorrhoids: hemorrhoids,
    hepatitis: hepatitis,
    stroke: stroke,
    emphysema: emphysema,
    anemia: anemia,
    neckPain: neckPain,
    fainting: fainting,
    dizziness: dizziness,
    heartProblems: heartProblems,
    tuberculosis: tuberculosis,
    lossVision: lossVision,
    depression: depression,
    shortBreath: shortBreath,
    arthritis: arthritis,
    vomiting: vomiting,
    hiv: hiv,
    abnormalBleeding: abnormalBleeding,
    cancer: cancer,
    brokenBones: brokenBones,
    highBloodPressure: highBloodPressure,

    //3
    q1: q1,
    q2: q2,
    q3: q3,
    q4: q4,
    q5: q5,
    q6: q6,
    verify: verify
});
export type HealthQuestionnaireType = z.infer<typeof HealthQuestionnaireSchema>;

export const HealthQuestionnaireDefaultValues: Partial<HealthQuestionnaireType> = {
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
export const formFields = [
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
