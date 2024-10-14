import { REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import React, { FC } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Line, Svg, Image } from '@react-pdf/renderer';
import { applicationFormPageStyle, historyOfTableStyle } from '../ViewHealthQuestionnaire';
import { REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { t } from '@/features/common/forms/healthQuestionnaire';

type AllProps = {
    record: any; //REST_SavedVolunteerApplicationForm;
};
const All: FC<AllProps> = ({ record }) => {
    const historyOf1 = [
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
        'anemia'
    ];
    const historyOf2 = [
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
    ];

    return (
        <Page style={applicationFormPageStyle.page} size="A4">
            <View style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30' }}>
                <Text style={applicationFormPageStyle.row}>
                    <Image src="/images/bridges-logo.png" style={{ width: '75px', height: '75px', margin: '20px' }} />
                    {'         '}
                    <Text style={applicationFormPageStyle.header}>PERSONAL HEALTH QUESTIONNAIRE</Text>
                </Text>
            </View>
            {/* Step 1 */}
            <View style={applicationFormPageStyle.details}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={applicationFormPageStyle.row}>
                        Name:{'  '}
                        <Text style={applicationFormPageStyle.underline}>{record['name'].value}</Text>
                        {'            '}
                        Age:{'  '}
                        <Text style={applicationFormPageStyle.underline}>{record['age'].value}</Text>
                    </Text>
                    <Text style={applicationFormPageStyle.row}>
                        Height:{'  '}
                        <Text style={applicationFormPageStyle.underline}>
                            {record['height'].value}
                            {'  '}
                            {record['heightUnit'].value}
                        </Text>
                        {'            '}
                        Weight:{'  '}
                        <Text style={applicationFormPageStyle.underline}>
                            {record['weight'].value}
                            {'  '}
                            {record['weightUnit'].value}
                        </Text>
                    </Text>
                </View>
                <Text style={applicationFormPageStyle.row}>Do you have a history of?</Text>
                <View style={historyOfTableStyle.table}>
                    <View style={historyOfTableStyle.tableColumn2}>
                        {historyOf1.map((skillName: any, index: number) => (
                            <>
                                {console.log(skillName, record[skillName])}
                                <View style={historyOfTableStyle.tableRow} key={index}>
                                    <Text style={historyOfTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={historyOfTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                    <View style={historyOfTableStyle.tableColumn2}>
                        {historyOf2.map((skillName: any, index: number) => (
                            <>
                                {console.log(skillName, record[skillName])}
                                <View style={historyOfTableStyle.tableRow} key={index}>
                                    <Text style={historyOfTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={historyOfTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}{' '}
                    </View>
                </View>
            </View>
            {/* Step 2 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.row}>
                    If you answered Yes to any of the above, please explain:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q1'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Prescription medications you are currently taking:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q2'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Allergies: (Medicines[drugs], Foods, Animals, or Pollens){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q3'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    List dates and purposes of any hospitalizations:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q4'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Is there any possibility that you are pregnant?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q5'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Are there any other health problems that you have at this time?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['q6'].value}</Text>
                </Text>
            </View>
        </Page>
    );
};

export default All;
