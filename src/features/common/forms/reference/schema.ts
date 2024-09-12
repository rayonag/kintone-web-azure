import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const error_required = {
    message: 'This field is required'
};
const error_invalidDate = {
    message: 'Invalid date'
};
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
const radio: z.ZodEffects<z.ZodNullable<z.ZodString>> = z.string().nullable().refine(validateRadio, error_required);

// 1
const applicantName: z.ZodString = z.string().min(1, requiredErrorMessage);
const refereeName: z.ZodString = z.string().min(1, requiredErrorMessage);
const relationship = z.string().min(1, requiredErrorMessage);
const relationshipExplain = z.string().optional();

// 2
const indicationDesire = radio;
const indicationDesireExplain = z.string().optional();
const doctrinalPoint = z.string().optional();
const ethics = radio;
const ethicsExplain = z.string().optional();
const comeAcross = z.string().min(1, requiredErrorMessage);
const rateFollowInstructions = z.string().min(1, requiredErrorMessage);
const rateAttitude = z.string().min(1, requiredErrorMessage);
const rateVocation = z.string().min(1, requiredErrorMessage);
const demonstratedServantHeart = z.string().optional();
const dealtProblem = z.string().optional();
const familyRelationship = z.string().optional();
const guest = radio;
const guestExplain = z.string().optional();
const showInterest = radio;
const showInterestComment = z.string().optional();
const christianJewishRelations = radio;
const christianJewishRelationsComment = z.string().optional();
const aptitudes = z.string().optional();

// 3
const traitPhysicalCondition = z.string().min(1, requiredErrorMessage);
const traitEmotionalStability = z.string().min(1, requiredErrorMessage);
const traitSelfDiscipline = z.string().min(1, requiredErrorMessage);
const traitFinancialStewardship = z.string().min(1, requiredErrorMessage);
const traitSelflessness = z.string().min(1, requiredErrorMessage);
const traitFriendliness = z.string().min(1, requiredErrorMessage);
const traitSocialAcceptability = z.string().min(1, requiredErrorMessage);
const traitServanthood = z.string().min(1, requiredErrorMessage);
const traitLeadership = z.string().min(1, requiredErrorMessage);
const traitTeamwork = z.string().min(1, requiredErrorMessage);
const traitJudgment = z.string().min(1, requiredErrorMessage);
const traitPersonalAppearance = z.string().min(1, requiredErrorMessage);
const traitWorkmanship = z.string().min(1, requiredErrorMessage);
const traitFollowingOrders = z.string().min(1, requiredErrorMessage);
const traitSensitivity = z.string().min(1, requiredErrorMessage);
const traitAdaptability = z.string().min(1, requiredErrorMessage);
const traitIndustry = z.string().min(1, requiredErrorMessage);
const traitPerseverance = z.string().min(1, requiredErrorMessage);
const traitOrderliness = z.string().min(1, requiredErrorMessage);
const traitPersonalBibleStudy = z.string().min(1, requiredErrorMessage);
const traitPersonalPrayerLife = z.string().min(1, requiredErrorMessage);
const traitTeachableSpirit = z.string().min(1, requiredErrorMessage);

// 4
const characters = z.object({
    character1: z.array(z.string()).optional(),
    character2: z.array(z.string()).optional(),
    character3: z.array(z.string()).optional(),
    character4: z.array(z.string()).optional()
});
const checkBox: z.ZodArray<z.ZodString> = z.array(z.string());

// 5
const standpoint = z.string().min(1, requiredErrorMessage);
const recommend = z.string().min(1, requiredErrorMessage);
const address = z.string().min(1, requiredErrorMessage);
const phone = z.string().min(1, requiredErrorMessage);
const email = z.string().email();
const signature = z.string().min(1, requiredErrorMessage);
const signatureDate = z.string().min(1, requiredErrorMessage);

// Combine individual field schemas into a single schema
export const ReferenceFormSchema = z.object({
    ref,
    office,

    // 1
    applicantName,
    refereeName,
    relationship,
    relationshipExplain,

    // 2
    indicationDesire,
    indicationDesireExplain,
    doctrinalPoint,
    ethics,
    ethicsExplain,
    comeAcross,
    rateFollowInstructions,
    rateAttitude,
    rateVocation,

    // 3
    demonstratedServantHeart,
    dealtProblem,
    familyRelationship,
    guest,
    guestExplain,
    showInterest,
    showInterestComment,
    christianJewishRelations,
    christianJewishRelationsComment,
    aptitudes,

    // 4
    traitPhysicalCondition,
    traitEmotionalStability,
    traitSelfDiscipline,
    traitFinancialStewardship,
    traitSelflessness,
    traitFriendliness,
    traitSocialAcceptability,
    traitServanthood,
    traitLeadership,
    traitTeamwork,
    traitJudgment,
    traitPersonalAppearance,
    traitWorkmanship,
    traitFollowingOrders,
    traitSensitivity,
    traitAdaptability,
    traitIndustry,
    traitPerseverance,
    traitOrderliness,
    traitPersonalBibleStudy,
    traitPersonalPrayerLife,
    traitTeachableSpirit,
    characters,
    // 5
    standpoint,
    recommend,
    address,
    phone,
    email,
    signature,
    signatureDate
});

// Define default values
export const ReferenceFormDefaultValues: Partial<z.infer<typeof ReferenceFormSchema>> = {
    relationshipExplain: '',
    indicationDesireExplain: '',
    doctrinalPoint: '',
    ethicsExplain: '',
    demonstratedServantHeart: '',
    dealtProblem: '',
    familyRelationship: '',
    guestExplain: '',
    showInterestComment: '',
    christianJewishRelationsComment: '',
    aptitudes: ''
};

// Export the schema and default values
export type ReferenceFormType = z.infer<typeof ReferenceFormSchema>;

export const ReferenceFormFields = [
    // system
    ['ref', 'office'],
    // Step 1
    ['applicantName', 'refereeName', 'relationship', 'relationshipExplain'],
    // Step 2
    [
        'indicationDesire',
        'indicationDesireExplain',
        'doctrinalPoint',
        'ethics',
        'ethicsExplain',
        'comeAcross',
        'rateFollowInstructions',
        'rateAttitude',
        'rateVocation'
    ],
    // Step 3
    [
        'demonstratedServantHeart',
        'dealtProblem',
        'familyRelationship',
        'guest',
        'guestExplain',
        'showInterest',
        'showInterestComment',
        'christianJewishRelations',
        'christianJewishRelationsComment',
        'aptitudes'
    ],
    // Step 4
    [
        'traitPhysicalCondition',
        'traitEmotionalStability',
        'traitSelfDiscipline',
        'traitFinancialStewardship',
        'traitSelflessness',
        'traitFriendliness',
        'traitSocialAcceptability',
        'traitServanthood',
        'traitLeadership',
        'traitTeamwork',
        'traitJudgment',
        'traitPersonalAppearance',
        'traitWorkmanship',
        'traitFollowingOrders',
        'traitSensitivity',
        'traitAdaptability',
        'traitIndustry',
        'traitPerseverance',
        'traitOrderliness',
        'traitPersonalBibleStudy',
        'traitPersonalPrayerLife',
        'traitTeachableSpirit',
        'characters'
    ],
    // Step 5
    ['standpoint', 'recommend', 'address', 'phone', 'email', 'signature', 'signatureDate']
] as const;

export const ReferenceFormDefaultValuess: ReferenceFormType = {
    ref: '12345',
    office: 'Main Office',
    applicantName: 'John Doe',
    refereeName: 'Jane Smith',
    relationship: 'Colleague',
    relationshipExplain: 'Worked together for 5 years',
    indicationDesire: 'Yes',
    indicationDesireExplain: 'Highly motivated',
    doctrinalPoint: 'Agrees with core values',
    ethics: 'High',
    ethicsExplain: 'Always follows ethical guidelines',
    comeAcross: 'Professional',
    rateFollowInstructions: 'Excellent',
    rateAttitude: 'Positive',
    rateVocation: 'Dedicated',
    demonstratedServantHeart: 'Always willing to help',
    dealtProblem: 'Handles conflicts well',
    familyRelationship: 'Good',
    guest: 'Yes',
    guestExplain: 'Visited multiple times',
    showInterest: 'Yes',
    showInterestComment: 'Shows great interest in the work',
    christianJewishRelations: 'Good',
    christianJewishRelationsComment: 'Respects all beliefs',
    aptitudes: 'Skilled in various areas',
    traitPhysicalCondition: 'Excellent',
    traitEmotionalStability: 'Stable',
    traitSelfDiscipline: 'Disciplined',
    traitFinancialStewardship: 'Responsible',
    traitSelflessness: 'Selfless',
    traitFriendliness: 'Friendly',
    traitSocialAcceptability: 'Acceptable',
    traitServanthood: 'Servant-hearted',
    traitLeadership: 'Strong leader',
    traitTeamwork: 'Team player',
    traitJudgment: 'Good judgment',
    traitPersonalAppearance: 'Neat',
    traitWorkmanship: 'High quality',
    traitFollowingOrders: 'Follows orders well',
    traitSensitivity: 'Sensitive to others',
    traitAdaptability: 'Adaptable',
    traitIndustry: 'Industrious',
    traitPerseverance: 'Perseverant',
    traitOrderliness: 'Orderly',
    traitPersonalBibleStudy: 'Regular',
    traitPersonalPrayerLife: 'Consistent',
    traitTeachableSpirit: 'Teachable',
    characters: {
        character1: ['Honest', 'Reliable'],
        character2: ['Punctual', 'Hardworking'],
        character3: ['Creative', 'Innovative'],
        character4: ['Team player', 'Leader']
    },
    standpoint: 'Strongly recommend',
    recommend: 'Yes',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    email: 'test@example.com',
    signature: 'John Doe',
    signatureDate: '2023-01-01'
};
