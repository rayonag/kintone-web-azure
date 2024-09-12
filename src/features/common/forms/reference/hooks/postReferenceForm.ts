import postFormSubmission from '@/common/checklist/postFormSubmission';
import { ReferenceFormType } from '../schema';
import logError from '@/common/logError';
import { DateTime } from 'luxon';

const postReferenceForm = async (data: ReferenceFormType) => {
    const convertDate = (date: string) => {
        return DateTime.fromFormat(date, 'dd/MM/yyyy').toISODate();
    };
    const nullIfZero = (value: number) => (value === 0 ? null : value);
    try {
        const record = {
            // system
            ref: { value: data.ref },
            office: { value: data.office },
            // 1
            applicantName: { value: data.applicantName },
            refereeName: { value: data.refereeName },
            relationship: { value: data.relationship },
            relationshipExplain: { value: data.relationshipExplain || '' },
            // 2
            indicationDesire: { value: data.indicationDesire },
            indicationDesireExplain: { value: data.indicationDesireExplain || '' },
            doctrinalPoint: { value: data.doctrinalPoint || '' },
            ethics: { value: data.ethics },
            ethicsExplain: { value: data.ethicsExplain || '' },
            comeAcross: { value: data.comeAcross },
            rateFollowInstructions: { value: data.rateFollowInstructions },
            rateAttitude: { value: data.rateAttitude },
            rateVocation: { value: data.rateVocation },
            demonstratedServantHeart: { value: data.demonstratedServantHeart || '' },
            dealtProblem: { value: data.dealtProblem || '' },
            familyRelationship: { value: data.familyRelationship || '' },
            guest: { value: data.guest },
            guestExplain: { value: data.guestExplain || '' },
            showInterest: { value: data.showInterest },
            showInterestComment: { value: data.showInterestComment || '' },
            christianJewishRelations: { value: data.christianJewishRelations },
            christianJewishRelationsComment: { value: data.christianJewishRelationsComment || '' },
            aptitudes: { value: data.aptitudes || '' },
            // 3
            traitPhysicalCondition: { value: data.traitPhysicalCondition },
            traitEmotionalStability: { value: data.traitEmotionalStability },
            traitSelfDiscipline: { value: data.traitSelfDiscipline },
            traitFinancialStewardship: { value: data.traitFinancialStewardship },
            traitSelflessness: { value: data.traitSelflessness },
            traitFriendliness: { value: data.traitFriendliness },
            traitSocialAcceptability: { value: data.traitSocialAcceptability },
            traitServanthood: { value: data.traitServanthood },
            traitLeadership: { value: data.traitLeadership },
            traitTeamwork: { value: data.traitTeamwork },
            traitJudgment: { value: data.traitJudgment },
            traitPersonalAppearance: { value: data.traitPersonalAppearance },
            traitWorkmanship: { value: data.traitWorkmanship },
            traitFollowingOrders: { value: data.traitFollowingOrders },
            traitSensitivity: { value: data.traitSensitivity },
            traitAdaptability: { value: data.traitAdaptability },
            traitIndustry: { value: data.traitIndustry },
            traitPerseverance: { value: data.traitPerseverance },
            traitOrderliness: { value: data.traitOrderliness },
            traitPersonalBibleStudy: { value: data.traitPersonalBibleStudy },
            traitPersonalPrayerLife: { value: data.traitPersonalPrayerLife },
            traitTeachableSpirit: { value: data.traitTeachableSpirit },
            character1: { value: data.characters.character1 },
            character2: { value: data.characters.character2 },
            character3: { value: data.characters.character3 },
            character4: { value: data.characters.character4 },

            // 4
            standpoint: { value: data.standpoint },
            recommend: { value: data.recommend },
            address: { value: data.address },
            phone: { value: data.phone },
            email: { value: data.email },
            signature: { value: data.signature },
            signatureDate: { value: convertDate(data.signatureDate) }
        };

        const res = await fetch('/api/reference/postReferenceForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record) // Replace with your data
        });

        //const res2 = await postFormSubmission(ref);

        if (res.ok) {
            return res;
        } else {
            alert('Something wrong. Could not save your answers.');
            return;
        }
    } catch (e) {
        logError(e, data, 'postReferenceForm');
    }
};

export default postReferenceForm;
