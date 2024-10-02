import { REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import React, { FC } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Line, Svg, Image } from '@react-pdf/renderer';
import { applicationFormPageStyle } from '../ViewApplicationForm';
import { REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { t } from '@/features/common/forms/applicationForm';

type Page1Props = {
    record: any; //REST_SavedVolunteerApplicationForm;
};
const Page1: FC<Page1Props> = ({ record }) => {
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
        'skillWebDesign'
        // 'skillIT',
        // 'skillVideo',
        // 'skillComputerDesign',
        // 'skillAdobePhotoshop',
        // 'skillAdobeInDesign',
        // 'skillOtherPrograms',
        // 'skillJournalism',
        // 'skillPublicSpeaking',
        // 'skillFilmmaking',
        // 'skillPhotography'
    ];
    const skillsC = [
        'skillAccounting',
        'skillAdministration'
        // 'skillBookkeeping',
        // 'skillOperatingSystems',
        // 'skillSystem',
        // 'skillSoftware',
        // 'skillOfficeSuite',
        // 'skillExcel',
        // 'skillTyping',
        // 'skillGoogleDrive',
        // 'skillSecretarial',
        // 'skillOrganizing',
        // 'skillLibrary',
        // 'skillReception'
    ];
    const skillsD = ['skillProofreading', 'skillCopyEditing', 'skillTranslation'];
    const skillsE = [
        'skillCounseling',
        'skillMusicalInstrument',
        'skillJanitorial',
        'skillCooking',
        'skillForeignLanguage',
        'skillComputer',
        'skillSpecialTraining'
    ];
    return (
        <Page style={applicationFormPageStyle.page} size="A4">
            {/* <Svg height="210" width="1000">
                <Line x1="0" y1="0" x2="1000" y2="0" strokeWidth={2} stroke="rgb(255,0,0)" />
                <Image src="/images/Bridges logo.jpg" style={applicationFormPageStyle.underline} />
            </Svg> */}
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
                </Text>{' '}
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
                <Text style={applicationFormPageStyle.row}>
                    <Text>A. TRADE SKILLS</Text>
                    {skillsA.map((skillName: any, index: number) => (
                        <Text key={index}>
                            <Text style={applicationFormPageStyle.underline}>{record[skillName].value || ' '}</Text>
                            <Text style={applicationFormPageStyle.tableCol5}>{t(skillName)}</Text>
                        </Text>
                    ))}
                    <View style={applicationFormPageStyle.textVertical}>
                        <Text>B. COMMUNICATION</Text>
                        {skillsB.map((skillName: any, index: number) => (
                            <View key={index}>
                                <Text style={applicationFormPageStyle.underline}>{record[skillName]?.value || ' '}</Text>
                                <Text style={applicationFormPageStyle.tableCol5}>{t(skillName)}</Text>
                            </View>
                        ))}
                    </View>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    <View style={applicationFormPageStyle.textVertical}>
                        <Text>C. ADMINISTRATIVE/BUSINESS</Text>
                        {skillsC.map((skillName: any, index: number) => (
                            <View key={index}>
                                <Text style={applicationFormPageStyle.underline}>{record[skillName]?.value || ' '}</Text>
                                <Text style={applicationFormPageStyle.tableCol5}>{t(skillName)}</Text>
                            </View>
                        ))}
                    </View>
                </Text>
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
        </Page>
    );
};

export default Page1;
