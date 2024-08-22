import postFormSubmission from '@/common/checklist/postFormSubmission';
import { ApplicationFormType } from '../schema';

const postApplicationForm = async (data: ApplicationFormType, ref: string) => {
    try {
        // const record = {
        //     // system
        //     ref: { value: data.ref },
        //     office: { value: [{ code: data.office }] },
        //     // 1
        //     firstName: { value: data.firstName },
        //     middleName: { value: data.middleName },
        //     lastName: { value: data.lastName },
        //     street: { value: data.street },
        //     city: { value: data.city },
        //     state: { value: data.state },
        //     zip: { value: data.zip },
        //     country: { value: data.country },
        //     phone: { value: data.phone },
        //     email: { value: data.email },
        //     passport: { value: data.passport },
        //     passportExpiration: { value: data.passportExpiration },
        //     passportIssued: { value: data.passportIssued },
        //     age: { value: data.age },
        //     birthDay: { value: data.birthDay },
        //     birthMonth: { value: data.birthMonth },
        //     birthYear: { value: data.birthYear },
        //     ssn: { value: data.ssn },
        //     sex: { value: data.sex },
        //     maritalStatus: { value: data.maritalStatus },
        //     children: { value: data.children },
        //     hasFamilySupport: { value: data.hasFamilySupport },
        //     hasFamilySupportExplain: { value: data.hasFamilySupportExplain },
        //     // 2
        //     healthCondition: { value: data.healthCondition },
        //     seriousInjury: { value: data.seriousInjury },
        //     seriousInjuryExplain: { value: data.seriousInjuryExplain },
        //     hasHandicap: { value: data.hasHandicap },
        //     hasHandicapExplain: { value: data.hasHandicapExplain },
        //     doSmoke: { value: data.doSmoke },
        //     canLift33lbs: { value: data.canLift33lbs },
        //     personalDoctor: { value: data.personalDoctor },
        //     personalDoctorPhone: { value: data.personalDoctorPhone },
        //     // 3
        //     emergencyName: { value: data.emergencyName },
        //     emergencyRelationship: { value: data.emergencyRelationship },
        //     emergencyStreet: { value: data.emergencyStreet },
        //     emergencyCity: { value: data.emergencyCity },
        //     emergencyState: { value: data.emergencyState },
        //     emergencyZip: { value: data.emergencyZip },
        //     emergencyPhone: { value: data.emergencyPhone },
        //     emergencyCountry: { value: data.emergencyCountry },
        //     emergencyEmail: { value: data.emergencyEmail },
        //     // 4
        //     describeMotivation: { value: data.describeMotivation },
        //     areaInterested: { value: data.areaInterested },
        //     otherAreaInterested: { value: data.otherAreaInterested },
        //     minAvailability: { value: data.minAvailability },
        //     maxAvailability: { value: data.maxAvailability },
        //     preferredStartDate: { value: data.preferredStartDate },
        //     preferredStartDate2: { value: data.preferredStartDate2 },
        //     ifNoPosition: { value: data.ifNoPosition },
        //     // 5
        //     educationSchoolName: { value: data.educationSchoolName },
        //     educationDegree: { value: data.educationDegree },
        //     educationDate: { value: data.educationDate },
        //     employProfessional: { value: data.employProfessional },
        //     employAccreditation: { value: data.employAccreditation },
        //     employHistory: { value: data.employHistory },
        //     hobby: { value: data.hobby },
        //     clubs: { value: data.clubs },
        //     serviceOrganizationName: { value: data.serviceOrganizationName },
        //     serviceStartDate: { value: data.serviceStartDate },
        //     serviceEndDate: { value: data.serviceEndDate },
        //     serviceDuties: { value: data.serviceDuties },
        //     hasDriverLicense: { value: data.hasDriverLicense },
        //     hasHeldLicense12Months: { value: data.hasHeldLicense12Months },
        //     drivingViolation: { value: data.drivingViolation },
        //     hasConvictedTrafficAccident: { value: data.hasConvictedTrafficAccident },
        //     hasTrafficAccidentExplain: { value: data.hasTrafficAccidentExplain },
        //     hasVisitedIsrael: { value: data.hasVisitedIsrael },
        //     hasVisitedIsraelDates: { value: data.hasVisitedIsraelDates },
        //     listForeignCountries: { value: data.listForeignCountries },
        //     // 6
        //     churchName: { value: data.churchName },
        //     christianExperience: { value: data.christianExperience },
        //     christianJewishUnderstanding: { value: data.christianJewishUnderstanding },
        //     interestIsrael: { value: data.interestIsrael },
        //     // 7
        //     skillCarpentry: { value: data.skillCarpentry },
        //     skillConstruction: { value: data.skillConstruction },
        //     skillElectrical: { value: data.skillElectrical },
        //     skillForklift: { value: data.skillForklift },
        //     skillMechanic: { value: data.skillMechanic },
        //     skillRepair: { value: data.skillRepair },
        //     skillLaborer: { value: data.skillLaborer },
        //     skillWelding: { value: data.skillWelding },
        //     skillMasonry: { value: data.skillMasonry },
        //     skillPlumbing: { value: data.skillPlumbing },
        //     skillPainting: { value: data.skillPainting },
        //     skillWarehouseMaintenance: { value: data.skillWarehouseMaintenance },
        //     skillTransportation: { value: data.skillTransportation },
        //     hasHeavyLicense: { value: data.hasHeavyLicense },
        //     skillWebsite: { value: data.skillWebsite },
        //     skillWebDesign: { value: data.skillWebDesign },
        //     skillIT: { value: data.skillIT },
        //     skillVideo: { value: data.skillVideo },
        //     skillComputerDesign: { value: data.skillComputerDesign },
        //     skillAdobePhotoshop: { value: data.skillAdobePhotoshop },
        //     skillAdobeInDesign: { value: data.skillAdobeInDesign },
        //     skillOtherPrograms: { value: data.skillOtherPrograms },
        //     skillJournalism: { value: data.skillJournalism },
        //     skillPublicSpeaking: { value: data.skillPublicSpeaking },
        //     skillFilmmaking: { value: data.skillFilmmaking },
        //     skillPhotography: { value: data.skillPhotography },
        //     skillAccounting: { value: data.skillAccounting },
        //     skillAdministration: { value: data.skillAdministration },
        //     skillBookkeeping: { value: data.skillBookkeeping },
        //     skillOperatingSystems: { value: data.skillOperatingSystems },
        //     skillSystem: { value: data.skillSystem },
        //     skillSoftware: { value: data.skillSoftware },
        //     skillOfficeSuite: { value: data.skillOfficeSuite },
        //     skillExcel: { value: data.skillExcel },
        //     skillTyping: { value: data.skillTyping },
        //     skillGoogleDrive: { value: data.skillGoogleDrive },
        //     skillSecretarial: { value: data.skillSecretarial },
        //     skillOrganizing: { value: data.skillOrganizing },
        //     skillLibrary: { value: data.skillLibrary },
        //     skillReception: { value: data.skillReception },
        //     skillProofreading: { value: data.skillProofreading },
        //     skillCopyEditing: { value: data.skillCopyEditing },
        //     skillTranslation: { value: data.skillTranslation },
        //     skillCounseling: { value: data.skillCounseling },
        //     skillMusicalInstrument: { value: data.skillMusicalInstrument },
        //     skillJanitorial: { value: data.skillJanitorial },
        //     skillCooking: { value: data.skillCooking },
        //     skillForeignLanguage: { value: data.skillForeignLanguage },
        //     skillComputer: { value: data.skillComputer },
        //     skillSpecialTraining: { value: data.skillSpecialTraining },
        //     // 8
        //     character1: { value: data.character1 },
        //     character2: { value: data.character2 },
        //     character3: { value: data.character3 },
        //     character4: { value: data.character4 },
        //     // 9
        //     refPasterName: { value: data.refPasterName },
        //     refPasterAddress: { value: data.refPasterAddress },
        //     refPasterPhone: { value: data.refPasterPhone },
        //     refPasterEmail: { value: data.refPasterEmail },
        //     refEmployerName: { value: data.refEmployerName },
        //     refEmployerAddress: { value: data.refEmployerAddress },
        //     refEmployerPhone: { value: data.refEmployerPhone },
        //     refEmployerEmail: { value: data.refEmployerEmail },
        //     refFriendName: { value: data.refFriendName },
        //     refFriendAddress: { value: data.refFriendAddress },
        //     refFriendPhone: { value: data.refFriendPhone },
        //     refFriendEmail: { value: data.refFriendEmail },
        //     refOtherName: { value: data.refOtherName },
        //     refOtherAddress: { value: data.refOtherAddress },
        //     refOtherPhone: { value: data.refOtherPhone },
        //     refOtherEmail: { value: data.refOtherEmail },
        //     refOtherRelationship: { value: data.refOtherRelationship },
        //     hasFriendsIsrael: { value: data.hasFriendsIsrael },
        //     hasFriendsIsraelExplain: { value: data.hasFriendsIsraelExplain },
        //     // 10
        //     verify: { value: data.verify }
        // };
        // const res = await fetch('/api/reference/postPersonalHealthQuestionnaire', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(record) // Replace with your data
        // });
        // const res2 = await postFormSubmission(ref);
        // console.log(res);
        // if (res.ok) {
        //     return res;
        // } else {
        //     alert('Something wrong. Could not save your answers.');
        //     return;
        // }
    } catch (error) {
        console.error('Error posting personal health questionnaire:', error);
        alert('An error occurred while submitting your answers.');
    }
};
export default postApplicationForm;
