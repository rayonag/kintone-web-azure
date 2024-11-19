import React, { FC } from 'react';
import { Page, Text, View, Image } from '@react-pdf/renderer';
import { applicationFormPageStyle, characterStrengthsTableStyle, skillInventoryTableStyle } from '../ViewApplicationForm';

import { t } from '@/features/common/forms/applicationForm';

type AllProps = {
    record: any; //REST_SavedVolunteerApplicationForm;
};
const All: FC<AllProps> = ({ record }) => {
    const skillsA = [
        'skillCarpentry',
        'skillConstruction',
        'skillElectrical',
        'skillForklift',
        'skillMechanic',
        'skillRepair',
        'skillLaborer',
        'skillWelding',
        'skillMasonry',
        'skillPlumbing',
        'skillPainting',
        'skillWarehouseMaintenance',
        'skillTransportation',
        'hasHeavyLicense'
    ];
    const skillsB = [
        'skillWebsite',
        'skillWebDesign',
        'skillIT',
        'skillVideo',
        'skillComputerDesign',
        'skillAdobePhotoshop',
        'skillAdobeInDesign',
        'skillOtherProgram',
        'skillJournalism',
        'skillPublicSpeaking',
        'skillFilmmaking',
        'skillPhotography'
    ];
    const skillsC = [
        'skillAccounting',
        'skillAdministration',
        'skillBookkeeping',
        'skillOperatingSystem',
        // 'skillSystem',
        // 'skillSoftware',
        'skillOfficeSuite',
        'skillExcel',
        'skillTyping',
        'skillGoogleDrive',
        'skillSecretarial',
        'skillOrganizing',
        'skillLibrary',
        'skillReception'
    ];
    const skillsD = ['skillProofreading', 'skillCopyEditing', 'skillTranslation'];
    const skillsE = ['skillCounseling', 'skillMusicalInstrument', 'skillJanitorial', 'skillCooking'];

    return (
        <Page style={applicationFormPageStyle.page} size="A4">
            <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Text style={applicationFormPageStyle.row}>
                    <Image src="/images/bridges-logo.png" style={{ width: '75px', height: '75px', margin: '20px' }} />
                    {'         '}
                    <Text style={applicationFormPageStyle.header}>VOLUNTEER APPLICATION FORM</Text>
                </Text>
            </View>
            {/* Step 1 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>1. PERSONAL INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>
                    Full name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>
                        {record['firstName'].value}
                        {'  '}
                        {record['middleName'].value && record['middleName'].value + '  '}
                        {record['lastName'].value}
                    </Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Permanent street/PO Box address:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['street'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['city'].value}</Text>
                    {'  '}
                    Zip/postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['zip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['state'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['country'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['phone'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['email'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Passport #:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportNumber'].value}</Text>
                    {'  '}
                    SSN/ID #:(if applicable){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['ssnNumber'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Passport expiration: (Day/Month/Year){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportExpiration'].value}</Text>
                    {'  '}
                    Issuing country{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportIssued'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Age: {'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['age'].value}</Text>
                    {'  '}
                    Date of birth: (Day/Month/Year){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['birthday'].value}</Text>
                    {'  '}
                    Sex:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['sex'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Full name of spouse (if applicable):{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['spouseFullName'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Full names of children (if applicable). Include ages and if they will be accompanying you to Israel:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['childrenNames'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you have the full support of your family in this endeavor?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasFamilySupport'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please explain:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasFamilySupportExplain'].value}</Text>
                </Text>
            </View>
            {/* Step 2 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>2. HEALTH INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Please provide a completed health questionnaire for each dependent accompanying you.</Text>
                <Text style={applicationFormPageStyle.row}>
                    Condition of your health:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['healthCondition'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Have you had any serious illness or injury?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['seriousInjury'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If so, briefly give the date, nature and extent:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['seriousInjuryExplain'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you have a physical handicap?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasHandicap'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If yes, please describe briefly:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasHandicapExplain'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you smoke?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['doSmoke'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Can you lift 33 lbs (15kg)? (required for certain positions){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['canLift33lbs'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Personal doctor:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['personalDoctor'].value}</Text>
                    {'  '}
                    Doctor's Phone #{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['personalDoctorPhone'].value}</Text>
                </Text>
            </View>
            {/* Step 3 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>3. EMERGENCY CONTACT INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Emergency Contact: </Text>
                <Text style={applicationFormPageStyle.row}>
                    Name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyName'].value}</Text>
                    {'  '}
                    Relationship:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyRelationship'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    PO Box/street:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyStreet'].value}</Text>
                    {'  '}
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCity'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyState'].value}</Text>
                    {'  '}
                    Zip/Postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyZip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell Phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyPhone'].value}</Text>
                    {'  '}
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCountry'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyEmail'].value}</Text>
                </Text>
            </View>
            {/* Step 4 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>4. SERVICE WITH BRIDGES FOR PEACE</Text>
                <Text style={applicationFormPageStyle.row}>
                    Briefly describe your purpose and motivation in applying to become a BFP volunteer in Israel:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['describeMotivation'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    In which area would you like to service in BFP:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['areaInterested'].value.join(', ')}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    What other area would you like to serve in? (If "other" selected){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['otherAreaInterested'].value}</Text>
                </Text>
                {/* zealous specific */}
                {record['type'].value === 'Zealous' ? (
                    <></>
                ) : (
                    <>
                        <Text style={applicationFormPageStyle.row}>
                            Minimum availability:{'  '}
                            <Text style={applicationFormPageStyle.underline}>{record['minAvailability'].value}</Text>
                            {'  '}
                            Maximum availability:{'  '}
                            <Text style={applicationFormPageStyle.underline}>{record['maxAvailability'].value}</Text>
                        </Text>
                        <Text style={applicationFormPageStyle.row}>
                            Preferred start date(s): (Day/Month/Year) Option 1:{'  '}
                            <Text style={applicationFormPageStyle.underline}>{record['preferredStartDate'].value}</Text>
                            {'  '}
                            Option 2:{'  '}
                            <Text style={applicationFormPageStyle.underline}>{record['preferredStartDate2'].value}</Text>
                        </Text>
                    </>
                )}
            </View>
            {/* Step 5 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>5. PERSONAL HISTORY</Text>
                <Text style={applicationFormPageStyle.row}>
                    <Text style={{ fontWeight: 'bold' }}>EDUCATION AND TRAINING:</Text> List secondary and post-secondary schools attended. List most
                    recent first.
                </Text>
                <View style={applicationFormPageStyle.itemsTable}>
                    <View style={applicationFormPageStyle.tableRow}>
                        <Text style={applicationFormPageStyle.tableColHeader3}>Name of school or university</Text>
                        <Text style={applicationFormPageStyle.tableColHeader3}>Degree/Certification</Text>
                        <Text style={applicationFormPageStyle.tableColHeader3}>Date</Text>
                    </View>
                    {record['educationTable'].value.map((item: any, index: number) => (
                        <>
                            {item.value['educationSchoolName'].value === '' &&
                            item.value['educationDegree'].value === '' &&
                            item.value['educationDate'].value === '' &&
                            index !== 0 ? null : (
                                <View style={applicationFormPageStyle.tableRow} key={index}>
                                    <Text style={applicationFormPageStyle.tableCol3}>{item.value['educationSchoolName'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol3}>{item.value['educationDegree'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol3}>{item.value['educationDate'].value}</Text>
                                </View>
                            )}
                        </>
                    ))}
                </View>
                <Text style={applicationFormPageStyle.row}>
                    <Text style={{ fontWeight: 'bold' }}>EDUCATION AND TRAINING:</Text> List secondary and post-secondary schools attended. List most
                    recent first.
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Profession/vocation:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['employProfession'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Accreditation/clergy/licenses held:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['employAccreditation'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please list all employers for whom you have worked in the past ten years, beginning with your current employer.
                </Text>
                <View style={applicationFormPageStyle.itemsTable}>
                    <View style={applicationFormPageStyle.tableRow}>
                        <Text style={applicationFormPageStyle.tableColHeader5}>Date of Employment</Text>
                        <Text style={applicationFormPageStyle.tableColHeader5}>Name</Text>
                        <Text style={applicationFormPageStyle.tableColHeader5}>Address</Text>
                        <Text style={applicationFormPageStyle.tableColHeader5}>Duties</Text>
                        <Text style={applicationFormPageStyle.tableColHeader5}>Reason for Leaving</Text>
                    </View>
                    {record['employTable'].value.map((item: any, index: number) => (
                        <>
                            {!item.value['employDate'].value &&
                            !item.value['employName'].value &&
                            !item.value['employAddress'].value &&
                            !item.value['employDuties'].value &&
                            !item.value['employLeavingReason'].value &&
                            index !== 0 ? null : (
                                <View style={applicationFormPageStyle.tableRow} key={index}>
                                    <Text style={applicationFormPageStyle.tableCol5}>{item.value['employDate'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol5}>{item.value['employName'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol5}>{item.value['employAddress'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol5}>{item.value['employDuties'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol5}>{item.value['employLeavingReason'].value}</Text>
                                </View>
                            )}
                        </>
                    ))}
                </View>
                <Text style={applicationFormPageStyle.row}>
                    Please describe your hobbies and interests:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hobby'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please list which clubs,societies,lodges or other organizations you belong to:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['clubs'].value}</Text>
                </Text>
                <View style={applicationFormPageStyle.itemsTable}>
                    <View style={applicationFormPageStyle.tableRow}>
                        <Text style={applicationFormPageStyle.tableColHeader4}>Name of organization</Text>
                        <Text style={applicationFormPageStyle.tableColHeader4}>Start of service</Text>
                        <Text style={applicationFormPageStyle.tableColHeader4}>End of service</Text>
                        <Text style={applicationFormPageStyle.tableColHeader4}>Duties</Text>
                    </View>
                    {record['serviceTable'].value.map((item: any, index: number) => (
                        <>
                            {item.value['serviceOrganizationName'].value === '' &&
                            item.value['serviceStartDate'].value === '' &&
                            item.value['serviceEndDate'].value === '' &&
                            item.value['serviceDuties'].value === '' &&
                            index !== 0 ? null : (
                                <View style={applicationFormPageStyle.tableRow} key={index}>
                                    <Text style={applicationFormPageStyle.tableCol4}>{item.value['serviceOrganizationName'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol4}>{item.value['serviceStartDate'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol4}>{item.value['serviceEndDate'].value}</Text>
                                    <Text style={applicationFormPageStyle.tableCol4}>{item.value['serviceDuties'].value}</Text>
                                </View>
                            )}
                        </>
                    ))}
                </View>
                <Text style={applicationFormPageStyle.row}>
                    Do you have a valid driver's license?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasDriverLicense'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Have you held your license for more than 12 months?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasLicenseMoreThanTwelveMonths'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Give details of your driving violations, if any:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['drivingViolation'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Have you ever convicted of a crime other than a traffic violation?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasConvictedTrafficAccident'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If so, provide the date and nature of the charge:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasTrafficAccidentExplain'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Have you visited Israel in the past?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasVisitedIsrael'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please list dates:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasVisitedIsraelDates'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    List foreign countries you have visited for one month or longer:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['listForeignCountries'].value}</Text>
                </Text>
            </View>
            {/* Step 6 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>6. CHRISTIAN BACKGROUND AND EXPERIENCE</Text>
                <Text style={applicationFormPageStyle.row}>
                    Please provide the name of your church, its religious affiliation and number of years attended:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['churchName'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Give a brief summary of your Christian experience:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['christianExperience'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Give a brief summary of your involvement or desired involvement in developing Christian-Jewish understanding:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['christianJewishUnderstanding'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please describe your interest in Israel:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['interestIsrael'].value}</Text>
                </Text>
            </View>
            {/* Step 7 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>7. SKILLS INVENTORY</Text>
                <Text style={applicationFormPageStyle.row}>
                    Listed below are various areas of experience useful to BFP Jerusalem. Read through the list, marking 1 through 5 to the left of
                    the skill, with 1 indicating little experience and 5 representing extensive in that area. A blank space signifies no experience at
                    all in a particular area.
                </Text>
                <Text style={applicationFormPageStyle.row}>1 - Little experience 3 - Moderate experience 5 - Extensive experience</Text>
                <Text style={applicationFormPageStyle.row}></Text>
                <View style={skillInventoryTableStyle.table}>
                    <View style={skillInventoryTableStyle.tableColumn2}>
                        <Text style={skillInventoryTableStyle.tableColHeader}>A. TRADE SKILLS</Text>
                        {skillsA.map((skillName: any, index: number) => (
                            <>
                                <View style={skillInventoryTableStyle.tableRow} key={index}>
                                    <Text style={skillInventoryTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={skillInventoryTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}
                        <Text style={skillInventoryTableStyle.tableColHeader}>B. COMMUNICATION</Text>
                        {skillsB.map((skillName: any, index: number) => (
                            <>
                                <View style={skillInventoryTableStyle.tableRow} key={index}>
                                    <Text style={skillInventoryTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={skillInventoryTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                    <View style={skillInventoryTableStyle.tableColumn2}>
                        <Text style={skillInventoryTableStyle.tableColHeader}>C. ADMINISTRATIVE/BUSINESS</Text>
                        {skillsC.map((skillName: any, index: number) => (
                            <>
                                <View style={skillInventoryTableStyle.tableRow} key={index}>
                                    <Text style={skillInventoryTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={skillInventoryTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                                {/* TODO: add this back in 
                                {skillName == 'skillOperatingSystem' && (
                                    <View style={skillInventoryTableStyle.tableRow} key={index}>
                                        {['SAP', 'QuickBooks', 'Software Development'].map((systemName: any, i: number) => (
                                            <Text style={skillInventoryTableStyle.tableCell20} key={i}>
                                                {record['skillSystem'].value?.includes(systemName) ? '✅' : '🔲' + ' ' + systemName}
                                            </Text>
                                        ))}
                                    </View>
                                )}*/}
                            </>
                        ))}{' '}
                        {/* TODO: add operating system here?
                        <View style={skillInventoryTableStyle.tableRow}>
                            <Text style={skillInventoryTableStyle.tableCell20}>{record['skillSystem'].value?.join(', ') || ' '}</Text>
                            <Text style={skillInventoryTableStyle.tableCell80}>{t('skillSystem.title')}</Text>
                        </View> */}
                        <Text style={skillInventoryTableStyle.tableColHeader}>D. TRANSLATION/LINGUISTICS</Text>
                        {skillsD.map((skillName: any, index: number) => (
                            <>
                                <View style={skillInventoryTableStyle.tableRow} key={index}>
                                    <Text style={skillInventoryTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={skillInventoryTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}
                        <Text style={skillInventoryTableStyle.tableColHeader}>E. GENERAL SKILLS</Text>
                        {skillsE.map((skillName: any, index: number) => (
                            <>
                                <View style={skillInventoryTableStyle.tableRow} key={index}>
                                    <Text style={skillInventoryTableStyle.tableCell20}>{record[skillName].value || ' '}</Text>
                                    <Text style={skillInventoryTableStyle.tableCell80}>{t(skillName)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                </View>
                <Text style={applicationFormPageStyle.row}>
                    Please list all foreign languages you know and the proficiency with which you can read, write and speak them:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['skillForeignLanguage'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please describe your specific computer skills, experience and proficiency, for example technical background, training, programs,
                    and software:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['skillComputer'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    List any special training or abilities you possess that you think would contribute to your role as a BFP volunteer, for example
                    leadership, music, art, administrative ability or biblical training:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['skillSpecialTraining'].value}</Text>
                </Text>
            </View>
            {/* Step 8 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>8. CHARACTER STRENGTHS</Text>
                <Text style={applicationFormPageStyle.row}>
                    Read through the list of words or phrases below and mark(X) only those that describe a consistent character trait of yours.
                </Text>
                <View style={characterStrengthsTableStyle.table}>
                    <View style={characterStrengthsTableStyle.tableColumn25}>
                        {Object.keys(t('character1.options')).map((key: any, index: number) => (
                            <>
                                <View style={characterStrengthsTableStyle.tableRow} key={index}>
                                    <Text style={characterStrengthsTableStyle.tableCell20}>
                                        {record['character1'].value?.includes(t(`character1.options.${key}`)) ? 'X' : ' '}
                                    </Text>
                                    <Text style={characterStrengthsTableStyle.tableCell80}>{t(`character1.options.${key}`)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                    <View style={characterStrengthsTableStyle.tableColumn25}>
                        {Object.keys(t('character2.options')).map((key: any, index: number) => (
                            <>
                                <View style={characterStrengthsTableStyle.tableRow} key={index}>
                                    <Text style={characterStrengthsTableStyle.tableCell20}>
                                        {record['character2'].value?.includes(t(`character2.options.${key}`)) ? 'X' : ' '}
                                    </Text>
                                    <Text style={characterStrengthsTableStyle.tableCell80}>{t(`character2.options.${key}`)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                    <View style={characterStrengthsTableStyle.tableColumn25}>
                        {Object.keys(t('character3.options')).map((key: any, index: number) => (
                            <>
                                <View style={characterStrengthsTableStyle.tableRow} key={index}>
                                    <Text style={characterStrengthsTableStyle.tableCell20}>
                                        {record['character3'].value?.includes(t(`character3.options.${key}`)) ? 'X' : ' '}
                                    </Text>
                                    <Text style={characterStrengthsTableStyle.tableCell80}>{t(`character3.options.${key}`)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                    <View style={characterStrengthsTableStyle.tableColumn25}>
                        {Object.keys(t('character4.options')).map((key: any, index: number) => (
                            <>
                                <View style={characterStrengthsTableStyle.tableRow} key={index}>
                                    <Text style={characterStrengthsTableStyle.tableCell20}>
                                        {record['character4'].value?.includes(t(`character4.options.${key}`)) ? 'X' : ' '}
                                    </Text>
                                    <Text style={characterStrengthsTableStyle.tableCell80}>{t(`character4.options.${key}`)}</Text>
                                </View>
                            </>
                        ))}
                    </View>
                </View>
            </View>
            {/* Step 9 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>9. REFERENCES</Text>
                <Text style={applicationFormPageStyle.row}>
                    For references, please provide us with the names, addresses and phone numbers of an employer, a pastor or spiritual advisor, a
                    friend and one other person. Please do not use immediate family members (either by blood or marriage) as references. We will
                    forward evaluation forms to these references. Kindly notify them that the form will be sent.
                </Text>
                <Text style={applicationFormPageStyle.row}>Pastor or spiritual advisor:</Text>
                <Text style={applicationFormPageStyle.row}>
                    <Text style={applicationFormPageStyle.underline}>{record['refPastorName'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refPastorAddress'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refPastorPhone'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refPastorEmail'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>Employer:</Text>
                <Text style={applicationFormPageStyle.row}>
                    <Text style={applicationFormPageStyle.underline}>{record['refEmployerName'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refEmployerAddress'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refEmployerPhone'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refEmployerEmail'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>Friend:</Text>
                <Text style={applicationFormPageStyle.row}>
                    <Text style={applicationFormPageStyle.underline}>{record['refFriendName'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refFriendAddress'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refFriendPhone'].value}</Text>
                    {',  '}
                    <Text style={applicationFormPageStyle.underline}>{record['refFriendEmail'].value}</Text>
                </Text>
                {record['type'].value == 'Short Term' || (
                    <>
                        {' '}
                        <Text style={applicationFormPageStyle.row}>Other (please clarify):</Text>
                        <Text style={applicationFormPageStyle.row}>
                            <Text style={applicationFormPageStyle.underline}>{record['refOtherName'].value}</Text>
                            {',  '}
                            <Text style={applicationFormPageStyle.underline}>{record['refOtherAddress'].value}</Text>
                            {',  '}
                            <Text style={applicationFormPageStyle.underline}>{record['refOtherPhone'].value}</Text>
                            {',  '}
                            <Text style={applicationFormPageStyle.underline}>{record['refOtherEmail'].value}</Text>
                            {',  '}
                            <Text style={applicationFormPageStyle.underline}>{record['refOtherRelationship'].value}</Text>
                        </Text>
                    </>
                )}
                <Text style={applicationFormPageStyle.row}>
                    Do you have friends or contacts in Israel?:
                    <Text style={applicationFormPageStyle.underline}>{record['hasFriendsIsrael'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If yes, please list below their names and organizations:
                    <Text style={applicationFormPageStyle.underline}>{record['hasFriendsIsraelExplain'].value}</Text>
                </Text>
            </View>
            {/* Step 10 */}
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>10. SIGNATURES</Text>
                <Text style={applicationFormPageStyle.row}>Please check the appropriate boxes and sign this application.</Text>
                <Text style={applicationFormPageStyle.row}>
                    I authorize BFP to contact listed references for information regarding this application.{' '}
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I authorize the listed references to furnish any information requested in this application.
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I acknowledge my responsibility to provide my round-trip transportation and all living expenses while serving with BFP.
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I acknowledge that I must have valid health insurance coverage while serving with BFP in Israel. It is my responsibility to
                    provide proof of coverage prior to my arrival in Israel.
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I have read and agree to the following BFP position papers:1. Doctrinal Statement 2. Mission Statement 3. Goals 4. Evangelism
                    Statement 5. Messianic Jewish Statement
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I acknowledge that any visa granted to me through BFP is issued according to BFP’s legal standing with the Government of Israel
                    and on the basis of its good reputation since its establishment in 1976. I furthermore acknowledge that any such visa is granted
                    solely for the purpose of volunteering with BFP and I will leave Israel upon termination of my time of voluntary service with BFP.
                    I recognize that should I fail to do so, this could have legal ramifications for BFP.
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    I hereby certify that I have verified all the information given above, and that it is true and correct. Should I be accepted and
                    placed as a volunteer in Israel, I agree to place myself under the authority of BFP during my term of service, and to abide by
                    accepted Christian standards of conduct and BFP organizational purposes. I understand that should I act otherwise, I will be
                    requested to leave Israel and return home immediately.
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.row}>
                    Applicant's Signature:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['signature'].value}</Text>
                    {'  '}
                    Date:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['signatureDate'].value}</Text>
                </Text>
            </View>
        </Page>
    );
};

export default All;
