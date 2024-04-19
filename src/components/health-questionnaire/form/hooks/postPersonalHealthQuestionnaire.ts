import postFormSubmission from '@/common/checklist/postFormSubmission';
import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';

const postPersonalHealthQuestionnaire = async (data: HealthQuestionnaireType, ref: string) => {
    try {
        const record = {
            //system
            ref: { value: data.ref },
            // 1
            name: { value: data.name },
            age: { value: data.age },
            height: { value: data.height },
            heightUnit: { value: data.heightUnit[0] },
            weight: { value: data.weight },
            weightUnit: { value: data.weightUnit[0] },

            // 2
            migranes: { value: data.migranes[0] },
            headInjury: { value: data.headInjury[0] },
            weakness: { value: data.weakness[0] },
            backProblems: { value: data.backProblems[0] },
            asthma: { value: data.asthma[0] },
            lossHearing: { value: data.lossHearing[0] },
            epilepsy: { value: data.epilepsy[0] },
            anxiety: { value: data.anxiety[0] },
            fatigue: { value: data.fatigue[0] },
            diabetes: { value: data.diabetes[0] },
            hemorrhoids: { value: data.hemorrhoids[0] },
            hepatitis: { value: data.hepatitis[0] },
            stroke: { value: data.stroke[0] },
            emphysema: { value: data.emphysema[0] },
            anemia: { value: data.anemia[0] },
            neckPain: { value: data.neckPain[0] },
            fainting: { value: data.fainting[0] },
            dizziness: { value: data.dizziness[0] },
            heartProblems: { value: data.heartProblems[0] },
            tuberculosis: { value: data.tuberculosis[0] },
            lossVision: { value: data.lossVision[0] },
            depression: { value: data.depression[0] },
            shortBreath: { value: data.shortBreath[0] },
            arthritis: { value: data.arthritis[0] },
            vomiting: { value: data.vomiting[0] },
            hiv: { value: data.hiv[0] },
            abnormalBleeding: { value: data.abnormalBleeding[0] },
            cancer: { value: data.cancer[0] },
            brokenBones: { value: data.brokenBones[0] },
            highBloodPressure: { value: data.lossVision[0] },

            // 3
            q1: { value: data.q1 },
            q2: { value: data.q2 },
            q3: { value: data.q3 },
            q4: { value: data.q4 },
            q5: { value: data.q5 },
            q6: { value: data.q6 }
        };
        const res = await fetch('/api/reference/postPersonalHealthQuestionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record) // Replace with your data
        });
        const res2 = await postFormSubmission(ref);
        console.log(res);
        if (res.ok) {
            return res;
        } else {
            alert('Something wrong. Could not save your answers.');
            return;
        }
    } catch (e) {
        console.log('Error on postToKintone', e);
    }
};
export default postPersonalHealthQuestionnaire;
