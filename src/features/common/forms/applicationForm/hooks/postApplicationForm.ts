import postFormSubmission from '@/common/checklist/postFormSubmission';
import { ApplicationFormType } from '../schema';
import { VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { DateTime } from 'luxon';

const postApplicationForm = async (data: ApplicationFormType, ref: string | undefined) => {
    if (!ref) return undefined;
    const convertDate = (date: string) => {
        return DateTime.fromFormat(date, 'dd/MM/yyyy').toISODate();
    };
    const nullIfZero = (value: number) => (value === 0 ? null : value);
    try {
        const record: Partial<any> = {
            ref: { value: parseInt(data.ref) },
            office: { value: data.office.office },
            type: { value: data.type.type },
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
            ssnNumber: { value: data.office.ssnNumber },
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
            employProfession: { value: data.employProfession },
            employAccreditation: { value: data.employAccreditation },
            employTable: {
                type: 'SUBTABLE',
                value: data.employTable.map((emp, index) => ({
                    value: {
                        employName: { value: emp.employName },
                        employDate: { value: emp.employDate },
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
            refOtherName: { value: data.type.refOtherName },
            refOtherPhone: { value: data.type.refOtherPhone },
            refOtherEmail: { value: data.type.refOtherEmail },
            refOtherAddress: { value: data.type.refOtherAddress },
            refOtherRelationship: { value: data.type.refOtherRelationship },
            hasFriendsIsrael: { value: data.hasFriendsIsrael },
            hasFriendsIsraelExplain: { value: data.hasFriendsIsraelExplain },
            skillCarpentry: { value: nullIfZero(parseInt(data.skillCarpentry)) },
            skillConstruction: { value: nullIfZero(parseInt(data.skillConstruction)) },
            skillElectrical: { value: nullIfZero(parseInt(data.skillElectrical)) },
            skillForklift: { value: nullIfZero(parseInt(data.skillForklift)) },
            skillMechanic: { value: nullIfZero(parseInt(data.skillMechanic)) },
            skillRepair: { value: nullIfZero(parseInt(data.skillRepair)) },
            skillLaborer: { value: nullIfZero(parseInt(data.skillLaborer)) },
            skillWelding: { value: nullIfZero(parseInt(data.skillWelding)) },
            skillMasonry: { value: nullIfZero(parseInt(data.skillMasonry)) },
            skillPlumbing: { value: nullIfZero(parseInt(data.skillPlumbing)) },
            skillPainting: { value: nullIfZero(parseInt(data.skillPainting)) },
            skillWarehouseMaintenance: { value: nullIfZero(parseInt(data.skillWarehouseMaintenance)) },
            skillTransportation: { value: nullIfZero(parseInt(data.skillTransportation)) },
            skillWebsite: { value: nullIfZero(parseInt(data.skillWebsite)) },
            skillWebDesign: { value: nullIfZero(parseInt(data.skillWebDesign)) },
            skillIT: { value: nullIfZero(parseInt(data.skillIT)) },
            skillVideo: { value: nullIfZero(parseInt(data.skillVideo)) },
            skillComputerDesign: { value: nullIfZero(parseInt(data.skillComputerDesign)) },
            skillAdobePhotoshop: { value: nullIfZero(parseInt(data.skillAdobePhotoshop)) },
            skillAdobeInDesign: { value: nullIfZero(parseInt(data.skillAdobeInDesign)) },
            skillOtherProgram: { value: nullIfZero(parseInt(data.skillOtherProgram)) },
            skillJournalism: { value: nullIfZero(parseInt(data.skillJournalism)) },
            skillPublicSpeaking: { value: nullIfZero(parseInt(data.skillPublicSpeaking)) },
            skillFilmmaking: { value: nullIfZero(parseInt(data.skillFilmmaking)) },
            skillPhotography: { value: nullIfZero(parseInt(data.skillPhotography)) },
            skillAccounting: { value: nullIfZero(parseInt(data.skillAccounting)) },
            skillAdministration: { value: nullIfZero(parseInt(data.skillAdministration)) },
            skillBookkeeping: { value: nullIfZero(parseInt(data.skillBookkeeping)) },
            skillOperatingSystem: { value: nullIfZero(parseInt(data.skillOperatingSystem)) },
            skillSystem: { value: data.skillSystem },
            skillSoftware: { value: data.skillSoftware },
            skillOfficeSuite: { value: nullIfZero(parseInt(data.skillOfficeSuite)) },
            skillExcel: { value: nullIfZero(parseInt(data.skillExcel)) },
            skillTyping: { value: nullIfZero(parseInt(data.skillTyping)) },
            skillGoogleDrive: { value: nullIfZero(parseInt(data.skillGoogleDrive)) },
            skillSecretarial: { value: nullIfZero(parseInt(data.skillSecretarial)) },
            skillOrganizing: { value: nullIfZero(parseInt(data.skillOrganizing)) },
            skillLibrary: { value: nullIfZero(parseInt(data.skillLibrary)) },
            skillReception: { value: nullIfZero(parseInt(data.skillReception)) },
            skillProofreading: { value: nullIfZero(parseInt(data.skillProofreading)) },
            skillCopyEditing: { value: nullIfZero(parseInt(data.skillCopyEditing)) },
            skillTranslation: { value: nullIfZero(parseInt(data.skillTranslation)) },
            skillCounseling: { value: nullIfZero(parseInt(data.skillCounseling)) },
            skillMusicalInstrument: { value: nullIfZero(parseInt(data.skillMusicalInstrument)) },
            skillJanitorial: { value: nullIfZero(parseInt(data.skillJanitorial)) },
            skillCooking: { value: nullIfZero(parseInt(data.skillCooking)) },
            character1: { value: data.characters.character1 },
            character2: { value: data.characters.character2 },
            character3: { value: data.characters.character3 },
            character4: { value: data.characters.character4 },
            // step 10
            verify1: { value: data.verify1 ? ['Yes'] : ['No'] },
            verify2: { value: data.verify2 ? ['Yes'] : ['No'] },
            verify3: { value: data.verify3 ? ['Yes'] : ['No'] },
            verify4: { value: data.verify4 ? ['Yes'] : ['No'] },
            verify5: { value: data.verify5 ? ['Yes'] : ['No'] },
            verify6: { value: data.verify6 ? ['Yes'] : ['No'] },
            verify7: { value: data.verify7 ? ['Yes'] : ['No'] },
            signature: { value: data.signature },
            signatureDate: { value: convertDate(data.signatureDate) }
        };
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
