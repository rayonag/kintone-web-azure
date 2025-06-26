import { DateTime } from 'luxon';
import { z } from 'zod';

const error_required = {
    message: 'This field is required'
};
const error_invalidDate = {
    message: 'Invalid date'
};
const requiredErrorMessage = {
    message: 'This field is required'
};
const validateRadio = (value: string | null) => value !== null;
const validateDate = (value: string | undefined) => {
    if (!value) return true;
    if (!DateTime.fromFormat(value, 'dd/MM/yyyy').isValid) return false;
    else if (DateTime.fromFormat(value, 'dd/MM/yyyy') >= DateTime.now().plus({ years: 100 })) return false;
    else if (DateTime.fromFormat(value, 'dd/MM/yyyy') <= DateTime.now().minus({ years: 100 })) return false;
    return true;
};
// New date validation for day/month/year structure
const validateDateComponents = (day: string, month: string, year: string) => {
    if (!day || !month || !year) return false;

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return false;
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < 1900 || yearNum > 2100) return false;

    // Check if the date is valid (e.g., Feb 30 doesn't exist)
    const date = DateTime.fromObject({ day: dayNum, month: monthNum, year: yearNum });
    if (!date.isValid) return false;

    // Check if date is not too far in the future or past
    if (date >= DateTime.now().plus({ years: 100 })) return false;
    if (date <= DateTime.now().minus({ years: 100 })) return false;

    return true;
};
// New date object schema
const dateObject = z
    .object({
        day: z.string().min(1, error_required),
        month: z.string().min(1, error_required),
        year: z.string().min(1, error_required)
    })
    .refine((data) => validateDateComponents(data.day, data.month, data.year), error_invalidDate);

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
const recommend = radio;
const address = z.string().min(1, requiredErrorMessage);
const phone = z.string().min(1, requiredErrorMessage);
const email = z.string().email();
const signature = z.string().min(1, requiredErrorMessage);
const signatureDate = dateObject;

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
