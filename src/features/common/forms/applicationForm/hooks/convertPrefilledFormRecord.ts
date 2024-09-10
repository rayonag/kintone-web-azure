import { SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm.js';
import { ApplicationFormType } from '../schema.js';
import { DateTime } from 'luxon';

const convertPrefilledFormRecord = (record: SavedVolunteerApplicationForm, setValue: any): Partial<ApplicationFormType> => {
    const convertedForm: Partial<ApplicationFormType> = {};
    // type for office.office
    const addFieldIfValid = (key: keyof ApplicationFormType | any, value: any) => {
        if (value !== undefined && value !== null && value !== '') {
            setValue(key, value);
        }
    };

    const convertDate = (isoDate: string) => {
        if (!isoDate) {
            return '';
        }
        return DateTime.fromISO(isoDate).toFormat('dd/MM/yyyy');
    };

    addFieldIfValid('ref', record.ref.value);
    addFieldIfValid('office.office', record.office.value);
    addFieldIfValid('firstName', record.firstName.value);
    addFieldIfValid('middleName', record.middleName.value);
    addFieldIfValid('lastName', record.lastName.value);
    addFieldIfValid('street', record.street.value);
    addFieldIfValid('city', record.city.value);
    addFieldIfValid('state', record.state.value);
    addFieldIfValid('zip', record.zip.value);
    addFieldIfValid('country', record.country.value);
    addFieldIfValid('phone', record.phone.value);
    addFieldIfValid('email', record.email.value);
    addFieldIfValid('passportNumber', record.passportNumber.value);
    addFieldIfValid('passportExpiration', convertDate(record.passportExpiration.value));
    addFieldIfValid('passportIssued', record.passportIssued.value);
    addFieldIfValid('age', record.age.value);
    addFieldIfValid('birthday', convertDate(record.birthday.value));
    addFieldIfValid('office.ssnNumber', record.ssnNumber.value);
    addFieldIfValid('sex', record.sex.value);
    addFieldIfValid('maritalStatus', record.maritalStatus.value);
    addFieldIfValid('spouseFullName', record.spouseFullName.value);
    addFieldIfValid('childrenNames', record.childrenNames.value);
    addFieldIfValid('hasFamilySupport', record.hasFamilySupport.value);
    addFieldIfValid('hasFamilySupportExplain', record.hasFamilySupportExplain.value);
    addFieldIfValid('healthCondition', record.healthCondition.value);
    addFieldIfValid('seriousInjury', record.seriousInjury.value);
    addFieldIfValid('seriousInjuryExplain', record.seriousInjuryExplain.value);
    addFieldIfValid('hasHandicap', record.hasHandicap.value);
    addFieldIfValid('hasHandicapExplain', record.hasHandicapExplain.value);
    addFieldIfValid('doSmoke', record.doSmoke.value);
    addFieldIfValid('canLift33lbs', record.canLift33lbs.value);
    addFieldIfValid('personalDoctor', record.personalDoctor.value);
    addFieldIfValid('personalDoctorPhone', record.personalDoctorPhone.value);
    addFieldIfValid('emergencyName', record.emergencyName.value);
    addFieldIfValid('emergencyRelationship', record.emergencyRelationship.value);
    addFieldIfValid('emergencyStreet', record.emergencyStreet.value);
    addFieldIfValid('emergencyCity', record.emergencyCity.value);
    addFieldIfValid('emergencyState', record.emergencyState.value);
    addFieldIfValid('emergencyZip', record.emergencyZip.value);
    addFieldIfValid('emergencyPhone', record.emergencyPhone.value);
    addFieldIfValid('emergencyCountry', record.emergencyCountry.value);
    addFieldIfValid('emergencyEmail', record.emergencyEmail.value);
    addFieldIfValid('describeMotivation', record.describeMotivation.value);
    addFieldIfValid('areaInterested', record.areaInterested.value);
    addFieldIfValid('otherAreaInterested', record.otherAreaInterested.value);
    addFieldIfValid('minAvailability', record.minAvailability.value);
    addFieldIfValid('maxAvailability', record.maxAvailability.value);
    addFieldIfValid('preferredStartDate', convertDate(record.preferredStartDate.value));
    addFieldIfValid('preferredStartDate2', convertDate(record.preferredStartDate2.value));
    addFieldIfValid('ifNoPosition', record.ifNoPosition.value);
    addFieldIfValid(
        'educationTable',
        record.educationTable.value.map((edu: any) => ({
            educationSchoolName: edu.value.educationSchoolName.value,
            educationDegree: edu.value.educationDegree.value,
            educationDate: convertDate(edu.value.educationDate.value)
        }))
    );
    addFieldIfValid(
        'employTable',
        record.employTable.value.map((emp: any) => ({
            employName: emp.value.employName.value,
            employDate: emp.value.employDate.value,
            employDuties: emp.value.employDuties.value,
            employAddress: emp.value.employAddress.value,
            employLeavingReason: emp.value.employLeavingReason.value
        }))
    );
    addFieldIfValid('employProfession', record.employProfession.value);
    addFieldIfValid('employAccreditation', record.employAccreditation.value);
    addFieldIfValid('hobby', record.hobby.value);
    addFieldIfValid('clubs', record.clubs.value);
    addFieldIfValid(
        'serviceTable',
        record.serviceTable.value.map((service: any) => ({
            serviceOrganizationName: service.value.serviceOrganizationName.value,
            serviceStartDate: convertDate(service.value.serviceStartDate.value),
            serviceEndDate: convertDate(service.value.serviceEndDate.value),
            serviceDuties: service.value.serviceDuties.value
        }))
    );
    addFieldIfValid('hasDriverLicense', record.hasDriverLicense.value);
    addFieldIfValid('hasLicenseMoreThanTwelveMonths', record.hasLicenseMoreThanTwelveMonths.value);
    addFieldIfValid('drivingViolation', record.drivingViolation.value);
    addFieldIfValid('hasConvictedTrafficAccident', record.hasConvictedTrafficAccident.value);
    addFieldIfValid('hasTrafficAccidentExplain', record.hasTrafficAccidentExplain.value);
    addFieldIfValid('hasVisitedIsrael', record.hasVisitedIsrael.value);
    addFieldIfValid('hasVisitedIsraelDates', record.hasVisitedIsraelDates.value);
    addFieldIfValid('listForeignCountries', record.listForeignCountries.value);
    addFieldIfValid('churchName', record.churchName.value);
    addFieldIfValid('christianExperience', record.christianExperience.value);
    addFieldIfValid('christianJewishUnderstanding', record.christianJewishUnderstanding.value);
    addFieldIfValid('interestIsrael', record.interestIsrael.value);
    addFieldIfValid('skillCarpentry', record.skillCarpentry.value);
    addFieldIfValid('skillConstruction', record.skillConstruction.value);
    addFieldIfValid('skillElectrical', record.skillElectrical.value);
    addFieldIfValid('skillForklift', record.skillForklift.value);
    addFieldIfValid('skillMechanic', record.skillMechanic.value);
    addFieldIfValid('skillRepair', record.skillRepair.value);
    addFieldIfValid('skillLaborer', record.skillLaborer.value);
    addFieldIfValid('skillWelding', record.skillWelding.value);
    addFieldIfValid('skillMasonry', record.skillMasonry.value);
    addFieldIfValid('skillPlumbing', record.skillPlumbing.value);
    addFieldIfValid('skillPainting', record.skillPainting.value);
    addFieldIfValid('skillWarehouseMaintenance', record.skillWarehouseMaintenance.value);
    addFieldIfValid('skillTransportation', record.skillTransportation.value);
    addFieldIfValid('hasHeavyLicense', record.hasHeavyLicense.value);
    addFieldIfValid('skillWebsite', record.skillWebsite.value);
    addFieldIfValid('skillWebDesign', record.skillWebDesign.value);
    addFieldIfValid('skillIT', record.skillIT.value);
    addFieldIfValid('skillVideo', record.skillVideo.value);
    addFieldIfValid('skillComputerDesign', record.skillComputerDesign.value);
    addFieldIfValid('skillAdobePhotoshop', record.skillAdobePhotoshop.value);
    addFieldIfValid('skillAdobeInDesign', record.skillAdobeInDesign.value);
    addFieldIfValid('skillOtherPrograms', record.skillOtherProgram.value);
    addFieldIfValid('skillJournalism', record.skillJournalism.value);
    addFieldIfValid('skillPublicSpeaking', record.skillPublicSpeaking.value);
    addFieldIfValid('skillFilmmaking', record.skillFilmmaking.value);
    addFieldIfValid('skillPhotography', record.skillPhotography.value);
    addFieldIfValid('skillAccounting', record.skillAccounting.value);
    addFieldIfValid('skillAdministration', record.skillAdministration.value);
    addFieldIfValid('skillBookkeeping', record.skillBookkeeping.value);
    addFieldIfValid('skillOperatingSystems', record.skillOperatingSystem.value);
    addFieldIfValid('skillSystem', record.skillSystem.value);
    addFieldIfValid('skillSoftware', record.skillSoftware.value);
    addFieldIfValid('skillOfficeSuite', record.skillOfficeSuite.value);
    addFieldIfValid('skillExcel', record.skillExcel.value);
    addFieldIfValid('skillTyping', record.skillTyping.value);
    addFieldIfValid('skillGoogleDrive', record.skillGoogleDrive.value);
    addFieldIfValid('skillSecretarial', record.skillSecretarial.value);
    addFieldIfValid('skillOrganizing', record.skillOrganizing.value);
    addFieldIfValid('skillLibrary', record.skillLibrary.value);
    addFieldIfValid('skillReception', record.skillReception.value);
    addFieldIfValid('skillProofreading', record.skillProofreading.value);
    addFieldIfValid('skillCopyEditing', record.skillCopyEditing.value);
    addFieldIfValid('skillTranslation', record.skillTranslation.value);
    addFieldIfValid('skillCounseling', record.skillCounseling.value);
    addFieldIfValid('skillMusicalInstrument', record.skillMusicalInstrument.value);
    addFieldIfValid('skillJanitorial', record.skillJanitorial.value);
    addFieldIfValid('skillCooking', record.skillCooking.value);
    addFieldIfValid('skillForeignLanguage', record.skillForeignLanguage.value);
    addFieldIfValid('skillComputer', record.skillComputer.value);
    addFieldIfValid('skillSpecialTraining', record.skillSpecialTraining.value);
    addFieldIfValid('character1', record.character1.value);
    addFieldIfValid('character2', record.character2.value);
    addFieldIfValid('character3', record.character3.value);
    addFieldIfValid('character4', record.character4.value);
    addFieldIfValid('refPastorName', record.refPastorName.value);
    addFieldIfValid('refPastorAddress', record.refPastorAddress.value);
    addFieldIfValid('refPastorPhone', record.refPastorPhone.value);
    addFieldIfValid('refPastorEmail', record.refPastorEmail.value);
    addFieldIfValid('refEmployerName', record.refEmployerName.value);
    addFieldIfValid('refEmployerAddress', record.refEmployerAddress.value);
    addFieldIfValid('refEmployerPhone', record.refEmployerPhone.value);
    addFieldIfValid('refEmployerEmail', record.refEmployerEmail.value);
    addFieldIfValid('refFriendName', record.refFriendName.value);
    addFieldIfValid('refFriendAddress', record.refFriendAddress.value);
    addFieldIfValid('refFriendPhone', record.refFriendPhone.value);
    addFieldIfValid('refFriendEmail', record.refFriendEmail.value);
    addFieldIfValid('refOtherName', record.refOtherName.value);
    addFieldIfValid('refOtherAddress', record.refOtherAddress.value);
    addFieldIfValid('refOtherPhone', record.refOtherPhone.value);
    addFieldIfValid('refOtherEmail', record.refOtherEmail.value);
    addFieldIfValid('refOtherRelationship', record.refOtherRelationship.value);
    addFieldIfValid('hasFriendsIsrael', record.hasFriendsIsrael.value);
    addFieldIfValid('hasFriendsIsraelExplain', record.hasFriendsIsraelExplain.value);

    return convertedForm;
};

export default convertPrefilledFormRecord;
