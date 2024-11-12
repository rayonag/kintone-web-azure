import { z } from 'zod';

const error_required = {
    message: 'This field is required'
};
const requiredErrorMessage = {
    message: 'This field is required'
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
const comeAcross = z.string().optional();
const rateFollowInstructions = z.string().min(1, requiredErrorMessage);
const rateAttitude = z.string().min(1, requiredErrorMessage);
const rateVocation = z.string().min(1, requiredErrorMessage);

// 3
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

// 4
const traitPhysicalCondition = z.string().optional();
const traitEmotionalStability = z.string().optional();
const traitSelfDiscipline = z.string().optional();
const traitFinancialStewardship = z.string().optional();
const traitSelflessness = z.string().optional();
const traitFriendliness = z.string().optional();
const traitSocialAcceptability = z.string().optional();
const traitServanthood = z.string().optional();
const traitLeadership = z.string().optional();
const traitTeamwork = z.string().optional();
const traitJudgment = z.string().optional();
const traitPersonalAppearance = z.string().optional();
const traitWorkmanship = z.string().optional();
const traitFollowingOrders = z.string().optional();
const traitSensitivity = z.string().optional();
const traitAdaptability = z.string().optional();
const traitIndustry = z.string().optional();
const traitPerseverance = z.string().optional();
const traitOrderliness = z.string().optional();
const traitPersonalBibleStudy = z.string().optional();
const traitPersonalPrayerLife = z.string().optional();
const traitTeachableSpirit = z.string().optional();
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
    aptitudes: '',
    characters: {
        character1: [],
        character2: [],
        character3: [],
        character4: []
    }
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
    ref: '58',
    office: 'Japan',
    applicantName: 'John Doe',
    refereeName: 'Jane Smith',
    relationship: 'Friend',
    relationshipExplain: 'Worked together for 5 years',
    indicationDesire: 'None of the above',
    indicationDesireExplain: 'Highly motivated',
    doctrinalPoint: 'Agrees with core values',
    ethics: 'Yes',
    ethicsExplain: 'Always follows ethical guidelines',
    comeAcross: 'Professional',
    rateFollowInstructions: 'Strong',
    rateAttitude: 'Strong',
    rateVocation: 'Strong',
    demonstratedServantHeart: 'Always willing to help',
    dealtProblem: 'Handles conflicts well',
    familyRelationship: 'Good',
    guest: 'Yes',
    guestExplain: 'Visited multiple times',
    showInterest: 'Yes',
    showInterestComment: 'Shows great interest in the work',
    christianJewishRelations: 'Yes',
    christianJewishRelationsComment: 'Respects all beliefs',
    aptitudes: 'Skilled in various areas',
    traitPhysicalCondition: 'X',
    traitEmotionalStability: 'X',
    traitSelfDiscipline: 'X',
    traitFinancialStewardship: 'X',
    traitSelflessness: 'X',
    traitFriendliness: 'X',
    traitSocialAcceptability: 'X',
    traitServanthood: 'X',
    traitLeadership: '',
    traitTeamwork: '',
    traitJudgment: '',
    traitPersonalAppearance: '',
    traitWorkmanship: '',
    traitFollowingOrders: '',
    traitSensitivity: '',
    traitAdaptability: '',
    traitIndustry: '',
    traitPerseverance: '',
    traitOrderliness: '',
    traitPersonalBibleStudy: '',
    traitPersonalPrayerLife: '',
    traitTeachableSpirit: '4',
    characters: {
        character1: ['Take charge', 'Determined'],
        character2: ['Visionary', 'Take risks'],
        character3: ['Loyal', 'Even-keeled'],
        character4: []
    },
    standpoint: 'Average',
    recommend: 'Yes',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    email: 'test@example.com',
    signature: 'John Doe',
    signatureDate: '2023-01-01'
};
