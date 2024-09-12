import { TFunction } from 'i18next';

type Translation = TFunction<'translation', undefined>;

export const YesNo = (t: Translation) => ({
    Yes: t('yesNo.Yes'),
    No: t('yesNo.No')
});

export const Rate = (t: Translation) => ({
    Strong: t('rate.strong'),
    'Above average': t('rate.aboveAverage'),
    Average: t('rate.average'),
    'Below average': t('rate.belowAverage'),
    Weak: t('rate.weak')
});

export const Traits = (t: Translation) => ({
    5: '5',
    4: '4',
    3: '3',
    2: '2',
    1: '1',
    X: 'X'
});
export const Relationship = (t: Translation) => ({
    Pastor: t('relationship.options.pastor'),
    Friend: t('relationship.options.friend'),
    Employer: t('relationship.options.employer'),
    Professor: t('relationship.options.professor'),
    Other: t('relationship.options.other')
});

export const IndicationDesire = (t: Translation) => ({
    'A desire for travel, adventure or cultural development': t('indicationDesire.options.travel'),
    'Escape from difficult personal, family or work situation': t('indicationDesire.options.escape'),
    'None of the above': t('indicationDesire.options.none')
});

export const Character1 = (t: Translation) => ({
    'Take charge': t('character1.options.takeCharge'),
    Determined: t('character1.options.determined'),
    Bold: t('character1.options.bold'),
    Firm: t('character1.options.firm'),
    Purposeful: t('character1.options.purposeful'),
    Assertive: t('character1.options.assertive'),
    Enterprising: t('character1.options.enterprising'),
    Leader: t('character1.options.leader'),
    Competitive: t('character1.options.competitive'),
    'Decision maker': t('character1.options.decisionMaker'),
    'Self-reliant': t('character1.options.selfReliant'),
    Adventurous: t('character1.options.adventurous'),
    'Goal-driven': t('character1.options.goalDriven'),
    'Enjoy a challenge': t('character1.options.enjoyChallenge')
});

export const Character2 = (t: Translation) => ({
    Visionary: t('character2.options.visionary'),
    'Take risks': t('character2.options.takeRisk'),
    Energetic: t('character2.options.energetic'),
    Motivator: t('character2.options.motivator'),
    'Like variety': t('character2.options.likeVariety'),
    Promoter: t('character2.options.promoter'),
    'Fun-loving': t('character2.options.funLoving'),
    Verbal: t('character2.options.verbal'),
    Creative: t('character2.options.creative'),
    'Enjoy change': t('character2.options.enjoyChange'),
    'Group-oriented': t('character2.options.groupOriented'),
    'Avoid details': t('character2.options.avoidDetails'),
    'Mix easily': t('character2.options.mixEasily'),
    'Open to new ideas': t('character2.options.openToNewIdeas')
});

export const Character3 = (t: Translation) => ({
    Loyal: t('character3.options.loyal'),
    'Even-keeled': t('character3.options.evenKeeled'),
    'Non-demanding': t('character3.options.nonDemanding'),
    'Avoid conflict': t('character3.options.avoidConflict'),
    Optimistic: t('character3.options.optimistic'),
    'Enjoy routine': t('character3.options.enjoyRoutine'),
    'Good listener': t('character3.options.goodListener'),
    'Enjoy deep Relationships': t('character3.options.enjoyDeepRelationships'),
    Adaptable: t('character3.options.adaptable'),
    Sympathetic: t('character3.options.sympathetic'),
    Thoughtful: t('character3.options.thoughtful'),
    Tolerant: t('character3.options.tolerant'),
    Nurturing: t('character3.options.nurturing'),
    Patient: t('character3.options.patient')
});

export const Character4 = (t: Translation) => ({
    Deliberate: t('character4.options.deliberate'),
    Controlled: t('character4.options.controlled'),
    Reserved: t('character4.options.reserved'),
    Practical: t('character4.options.practical'),
    Orderly: t('character4.options.orderly'),
    Discerning: t('character4.options.discerning'),
    Predictable: t('character4.options.predictable'),
    Factual: t('character4.options.factual'),
    Inquisitive: t('character4.options.inquisitive'),
    Detailed: t('character4.options.detailed'),
    Analytical: t('character4.options.analytical'),
    Persistent: t('character4.options.persistent'),
    Scheduled: t('character4.options.scheduled'),
    Precise: t('character4.options.precise')
});
