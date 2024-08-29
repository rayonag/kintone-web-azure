import postFormSubmission from '@/common/checklist/postFormSubmission';
import { ApplicationFormType } from '../schema';
import { VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { DateTime } from 'luxon';

const postApplicationForm = async (data: ApplicationFormType, ref: string | undefined) => {
    if (!ref) return undefined;
    try {
        const record: Partial<any> = {
            ref: { value: parseInt(data.ref) },
            office: { value: data.office },
            firstName: { value: data.firstName },
            middleName: { value: data.middleName },
            lastName: { value: data.lastName },
            street: { value: data.street },
            city: { value: data.city },
            state: { value: data.state },
            zip: { value: data.zip },
            country: { value: data.country },
            phone: { value: data.phone },
            email: { value: data.email },
            passportNumber: { value: data.passportNumber },
            passportExpiration: { value: DateTime.fromFormat(data.passportExpiration, 'dd/MM/yyyy').toISODate() },
            passportIssued: { value: data.passportIssued },
            age: { value: parseInt(data.age) },
            birthday: { value: DateTime.fromFormat(data.birthday, 'dd/MM/yyyy').toISODate() },
            ssnNumber: { value: data.ssnNumber },
            sex: { value: data.sex },
            maritalStatus: { value: data.maritalStatus },
            childrenNames: { value: data.childrenNames },
            hasFamilySupport: { value: data.hasFamilySupport },
            hasFamilySupportExplain: { value: data.hasFamilySupportExplain },
            healthCondition: { value: data.healthCondition },
            seriousInjury: { value: data.seriousInjury },
            seriousInjuryExplain: { value: data.seriousInjuryExplain },
            hasHandicap: { value: data.hasHandicap },
            hasHandicapExplain: { value: data.hasHandicapExplain },
            doSmoke: { value: data.doSmoke },
            canLift33lbs: { value: data.canLift33lbs },
            personalDoctor: { value: data.personalDoctor },
            personalDoctorPhone: { value: data.personalDoctorPhone },
            emergencyName: { value: data.emergencyName },
            emergencyRelationship: { value: data.emergencyRelationship },
            emergencyStreet: { value: data.emergencyStreet },
            emergencyCity: { value: data.emergencyCity },
            emergencyState: { value: data.emergencyState },
            emergencyZip: { value: data.emergencyZip },
            emergencyPhone: { value: data.emergencyPhone },
            emergencyCountry: { value: data.emergencyCountry },
            emergencyEmail: { value: data.emergencyEmail },
            describeMotivation: { value: data.describeMotivation },
            areaInterested: { value: data.areaInterested },
            otherAreaInterested: { value: data.otherAreaInterested },
            minAvailability: { value: data.minAvailability },
            maxAvailability: { value: data.maxAvailability },
            preferredStartDate: { value: data.preferredStartDate ? DateTime.fromFormat(data.preferredStartDate, 'dd/MM/yyyy').toISODate() : '' },
            preferredStartDate2: { value: data.preferredStartDate2 ? DateTime.fromFormat(data.preferredStartDate2, 'dd/MM/yyyy').toISODate() : '' },
            ifNoPosition: { value: data.ifNoPosition },
            educationTable: {
                type: 'SUBTABLE',
                value: data.educationTable.map((edu, index) => ({
                    value: {
                        educationSchoolName: { value: edu.educationSchoolName },
                        educationDegree: { value: edu.educationDegree },
                        educationDate: { value: edu.educationDate }
                    }
                }))
            },
            employTable: {
                type: 'SUBTABLE',
                value: data.employTable.map((emp, index) => ({
                    value: {
                        employName: { value: emp.employName },
                        employDate: { value: emp.employDate },
                        employPhone: { value: '' },
                        employDuties: { value: emp.employDuties },
                        employAddress: { value: emp.employAddress },
                        employLeavingReason: { value: emp.employLeavingReason }
                    }
                }))
            },
            serviceTable: {
                type: 'SUBTABLE',
                value: data.serviceTable.map((service, index) => ({
                    value: {
                        serviceOrganizationName: { value: service.serviceOrganizationName },
                        serviceStartDate: { value: service.serviceStartDate },
                        serviceEndDate: { value: service.serviceEndDate },
                        serviceDuties: { value: service.serviceDuties }
                    }
                }))
            },
            hobby: { value: data.hobby },
            clubs: { value: data.clubs },
            hasDriverLicense: { value: data.hasDriverLicense },
            hasLicenseMoreThanTwelveMonths: { value: data.hasLicenseMoreThanTwelveMonths },
            drivingViolation: { value: data.drivingViolation },
            hasConvictedTrafficAccident: { value: data.hasConvictedTrafficAccident },
            hasTrafficAccidentExplain: { value: data.hasTrafficAccidentExplain },
            hasVisitedIsrael: { value: data.hasVisitedIsrael },
            hasVisitedIsraelDates: {
                value: data.hasVisitedIsraelDates ? DateTime.fromFormat(data.hasVisitedIsraelDates, 'dd/MM/yyyy').toISODate() : ''
            },
            listForeignCountries: { value: data.listForeignCountries },
            churchName: { value: data.churchName },
            christianExperience: { value: data.christianExperience },
            christianJewishUnderstanding: { value: data.christianJewishUnderstanding },
            interestIsrael: { value: data.interestIsrael },
            hasHeavyLicense: { value: data.hasHeavyLicense },
            skillForeignLanguage: { value: data.skillForeignLanguage },
            skillComputer: { value: data.skillComputer },
            skillSpecialTraining: { value: data.skillSpecialTraining },
            refPastorName: { value: data.refPastorName },
            refPastorPhone: { value: data.refPastorPhone },
            refPastorEmail: { value: data.refPastorEmail },
            refPastorAddress: { value: data.refPastorAddress },
            refEmployerName: { value: data.refEmployerName },
            refEmployerPhone: { value: data.refEmployerPhone },
            refEmployerEmail: { value: data.refEmployerEmail },
            refEmployerAddress: { value: data.refEmployerAddress },
            refFriendName: { value: data.refFriendName },
            refFriendPhone: { value: data.refFriendPhone },
            refFriendEmail: { value: data.refFriendEmail },
            refFriendAddress: { value: data.refFriendAddress },
            refOtherName: { value: data.refOtherName },
            refOtherPhone: { value: data.refOtherPhone },
            refOtherEmail: { value: data.refOtherEmail },
            refOtherAddress: { value: data.refOtherAddress },
            refOtherRelationship: { value: data.refOtherRelationship },
            hasFriendsIsrael: { value: data.hasFriendsIsrael },
            hasFriendsIsraelExplain: { value: data.hasFriendsIsraelExplain },
            skillCarpentry: { value: parseInt(data.skillCarpentry) },
            skillConstruction: { value: parseInt(data.skillConstruction) },
            skillElectrical: { value: parseInt(data.skillElectrical) },
            skillForklift: { value: parseInt(data.skillForklift) },
            skillMechanic: { value: parseInt(data.skillMechanic) },
            skillRepair: { value: parseInt(data.skillRepair) },
            skillLaborer: { value: parseInt(data.skillLaborer) },
            skillWelding: { value: parseInt(data.skillWelding) },
            skillMasonry: { value: parseInt(data.skillMasonry) },
            skillPlumbing: { value: parseInt(data.skillPlumbing) },
            skillPainting: { value: parseInt(data.skillPainting) },
            skillWarehouseMaintenance: { value: parseInt(data.skillWarehouseMaintenance) },
            skillTransportation: { value: parseInt(data.skillTransportation) },
            skillWebsite: { value: parseInt(data.skillWebsite) },
            skillWebDesign: { value: parseInt(data.skillWebDesign) },
            skillIT: { value: parseInt(data.skillIT) },
            skillVideo: { value: parseInt(data.skillVideo) },
            skillComputerDesign: { value: parseInt(data.skillComputerDesign) },
            skillAdobePhotoshop: { value: parseInt(data.skillAdobePhotoshop) },
            skillAdobeInDesign: { value: parseInt(data.skillAdobeInDesign) },
            skillOtherProgram: { value: parseInt(data.skillOtherPrograms) },
            skillJournalism: { value: parseInt(data.skillJournalism) },
            skillPublicSpeaking: { value: parseInt(data.skillPublicSpeaking) },
            skillFilmmaking: { value: parseInt(data.skillFilmmaking) },
            skillPhotography: { value: parseInt(data.skillPhotography) },
            skillAccounting: { value: parseInt(data.skillAccounting) },
            skillAdministration: { value: parseInt(data.skillAdministration) },
            skillBookkeeping: { value: parseInt(data.skillBookkeeping) },
            skillOperatingSystem: { value: parseInt(data.skillOperatingSystems) },
            skillSystem: { value: [] }, //TODO
            skillSoftware: { value: [] }, //TODO
            skillOfficeSuite: { value: parseInt(data.skillOfficeSuite) },
            skillExcel: { value: parseInt(data.skillExcel) },
            skillTyping: { value: parseInt(data.skillTyping) },
            skillGoogleDrive: { value: parseInt(data.skillGoogleDrive) },
            skillSecretarial: { value: parseInt(data.skillSecretarial) },
            skillOrganizing: { value: parseInt(data.skillOrganizing) },
            skillLibrary: { value: parseInt(data.skillLibrary) },
            skillReception: { value: parseInt(data.skillReception) },
            skillProofreading: { value: parseInt(data.skillProofreading) },
            skillCopyEditing: { value: parseInt(data.skillCopyEditing) },
            skillTranslation: { value: parseInt(data.skillTranslation) },
            skillCounseling: { value: parseInt(data.skillCounseling) },
            skillMusicalInstrument: { value: parseInt(data.skillMusicalInstrument) },
            skillJanitorial: { value: parseInt(data.skillJanitorial) },
            skillCooking: { value: parseInt(data.skillCooking) },
            character1: { value: data.character1 },
            character2: { value: data.character2 },
            character3: { value: data.character3 },
            character4: { value: data.character4 }
        };
        console.log('submit', record);
        const body = {
            record: record
        };
        const res = await fetch('/api/application/postApplicationForm', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return res;
        } else {
            throw new Error('Failed to add Kintone record');
        }
    } catch (error) {
        console.error('Error submitting application form:', error);
    }
};

export default postApplicationForm;
