import { z } from 'zod';
import { useTranslation } from 'react-i18next';

// 1
const name: z.ZodString = z.string().min(1).max(50);
const age: z.ZodString = z.string().min(1).max(50);
const height: z.ZodString = z.string().min(1).max(50);
const heightUnit: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const weight: z.ZodString = z.string().min(1).max(50);
const weightUnit: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));

// 2
const migranes: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const headInjury: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const weakness: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const backProblems: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const asthma: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const lossHearing: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const epilepsy: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const anxiety: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const fatigue: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const diabetes: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const hemorrhoids: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const hepatitis: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const stroke: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const emphysema: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const anemia: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const neckPain: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const fainting: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const dizziness: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const heartProblems: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const tuberculosis: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const lossVision: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const depression: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const shortBreath: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const arthritis: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const vomiting: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const hiv: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const abnormalBleeding: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const cancer: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const brokenBones: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));
const highBloodPressure: z.ZodArray<z.ZodString> = z.array(z.string().min(1).max(50));

// const firstName: z.ZodString = z.string().min(1).max(50);
// const lastName: z.ZodString = z.string().min(1).max(50);
// const IDType: z.ZodString = z.string().min(2).max(30);
// const IDNumber: z.ZodString = z.string().min(1).max(30);
// const gender = z
//     .string()
//     .nullable()
//     .transform((value, ctx): string => {
//         if (value == null) {
//             ctx.addIssue({
//                 code: 'custom',
//                 message: 'This field is required'
//             });
//             return '';
//         }
//         return value;
//     });
// const birthday = z.object({
//     day: z.string().max(5, { message: 'Required' }),
//     month: z.string().max(5, { message: 'Required' }),
//     year: z.string().max(5, { message: 'Required' })
// });
// const originCity: z.ZodString = z.string().min(1).max(50);
// const originCountry: z.ZodString = z.string().min(1).max(50);
// const nativeLanguage: z.ZodString = z.string().min(2).max(50);
// const phone: z.ZodString = z
//     .string({ required_error: 'This field is required' })
//     .min(6, { message: 'Invalid phone number' })
//     .max(20, { message: 'The value length exceeds the limit' });
// const email: z.ZodString = z.string().min(1).max(100).email({ message: 'Invalid email format' });
// const address1: z.ZodString = z.string().min(1).max(100);
// const address2: z.ZodOptional<z.ZodString> = z.string().optional();
// const city: z.ZodString = z.string().min(1).max(50);
// const zip: z.ZodOptional<z.ZodString> = z.string().optional();

// // Page 2
// const spouse = z
//     .discriminatedUnion('maritalStatus', [
//         z.object({
//             maritalStatus: z.literal('Married'),
//             spouseFirstName: z.string().min(1).max(50),
//             spouseFamilyName: z.string().min(1).max(50),
//             spouseIDType: z.string().min(2).max(30),
//             spouseIDNumber: z.string().min(1).max(50),
//             spouseBirthday: z.object({
//                 day: z.string().max(5, { message: 'Required' }),
//                 month: z.string().max(5, { message: 'Required' }),
//                 year: z.string().max(5, { message: 'Required' })
//             })
//         }),
//         z.object({
//             maritalStatus: z.enum(['Single', 'Widowed', 'Divorced', 'd']),
//             spouseFirstName: z.string().optional(),
//             spouseFamilyName: z.string().optional(),
//             spouseIDType: z.string().optional(),
//             spouseIDNumber: z.string().optional(),
//             spouseBirthday: z
//                 .object({
//                     day: z.string().optional(),
//                     month: z.string().optional(),
//                     year: z.string().optional()
//                 })
//                 .optional()
//         })
//     ])
//     .refine(
//         (data) => {
//             if (data.maritalStatus == 'd') return false;
//             else return true;
//         },
//         {
//             message: 'This field is required',
//             path: ['maritalStatus']
//         }
//     );
// const children = z
//     .discriminatedUnion('childStatus', [
//         z.object({
//             childStatus: z.literal('Yes'),
//             childTable: z.array(
//                 z.object({
//                     childFirstName: z.string().min(1).max(50),
//                     childLastName: z.string().min(1).max(50),
//                     childGender: z.string().min(2).max(30),
//                     childAccompanied: z.string().min(1).max(30),
//                     childBirthday: z.object({
//                         day: z.string().max(5, { message: 'Required' }),
//                         month: z.string().max(5, { message: 'Required' }),
//                         year: z.string().max(5, { message: 'Required' })
//                     })
//                 })
//             )
//         }),
//         z.object({
//             childStatus: z.enum(['No']),
//             childTable: z.array(
//                 z.object({
//                     childFirstName: z.string().optional(),
//                     childLastName: z.string().optional(),
//                     childGender: z.string().optional(),
//                     childAccompanied: z.string().optional(),
//                     childBirthday: z
//                         .object({
//                             day: z.string().optional(),
//                             month: z.string().optional(),
//                             year: z.string().optional()
//                         })
//                         .optional()
//                 })
//             )
//         }),
//         z.object({
//             childStatus: z.null()
//         })
//     ])
//     .refine(
//         (data) => {
//             if (data.childStatus == null) return false;
//             else return true;
//         },
//         {
//             message: 'This field is required',
//             path: ['childStatus']
//         }
//     );
//const children = z.any();

// const file: z.ZodLiteral<string> = z.literal("true", {
//     errorMap: () => ({ message: "同意が必須です" }),
// });

export const customErrorMap =
    (t: any): z.ZodErrorMap =>
    (error, ctx) => {
        switch (error.code) {
            case z.ZodIssueCode.too_small:
                return { message: t('error.required') };
            case z.ZodIssueCode.too_big:
                return { message: t('error.too_big') };

            case z.ZodIssueCode.custom:
                // produce a custom message using error.params
                // error.params won't be set unless you passed
                // a `params` arguments into a custom validator
                const params = error.params || {};
                if (params.myField) {
                    return { message: `Bad input: ${params.myField}` };
                }
                break;
        }

        // fall back to default message!
        return { message: ctx.defaultError };
    };

export const HealthQuestionnaireSchema = z.object({
    // 1
    name: name,
    age: age,
    height: height,
    heightUnit: heightUnit,
    weight: weight,
    weightUnit: weightUnit,

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
    highBloodPressure: highBloodPressure
});
export type HealthQuestionnaireType = z.infer<typeof HealthQuestionnaireSchema>;
