import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';

const postToKintone = async (data: HealthQuestionnaireType) => {
    try {
        debugger;
        const record = {
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
            highBloodPressure: { value: data.lossVision[0] }
        };
        const res = await fetch('/api/reference/postPersonalHealthQuestionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record) // Replace with your data
        });
        console.log(res);
        // if (res.ok) {
        //     setCookie(null, 'auth', username.value, {
        //         maxAge: 7 * 24 * 60 * 60, // お好きな期限を
        //         path: '/'
        //     });
        //     router.push('/apply');
        // } else {
        //     console.log('Error: password not created');
        //     alert('Something wrong. Please start from the top.');
        //     router.push('/apply');
        //     return;
        // }
    } catch (e) {
        console.log('Error on creating password', e);
    }
};
export default postToKintone;
