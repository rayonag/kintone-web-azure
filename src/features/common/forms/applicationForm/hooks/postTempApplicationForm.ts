import { DateTime } from 'luxon';
import { ApplicationFormType } from '../schema';
import logError from '@/common/logError';

const postTempApplicationForm = async (data: ApplicationFormType, ref: string | undefined, step: number, isTemporary?: boolean) => {
    if (!data || !ref || !step) return undefined;

    const convertDate = (date: string) => {
        return DateTime.fromFormat(date, 'dd/MM/yyyy').toISODate();
    };

    const convertDateObject = (dateObj: { day?: string; month?: string; year?: string } | undefined) => {
        if (!dateObj || !dateObj.day || !dateObj.month || !dateObj.year) return '';
        const date = DateTime.fromObject({
            day: parseInt(dateObj.day),
            month: parseInt(dateObj.month),
            year: parseInt(dateObj.year)
        });
        return date.isValid ? date.toISODate() : '';
    };

    const nullIfZero = (value: number) => (value === 0 ? null : value);
    try {
        const record = (() => {
            switch (step) {
                case 1:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        office: { value: data.office.office },
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
                        datePassportIssued: { value: convertDateObject(data.datePassportIssued) },
                        passportExpiration: { value: convertDateObject(data.passportExpiration) },
                        age: { value: parseInt(data.age) },
                        birthday: { value: convertDateObject(data.birthday) },
                        ssnNumber: { value: data.office.ssnNumber },
                        sex: { value: data.sex },
                        maritalStatus: { value: data.spouse.maritalStatus },
                        spouseFullName: { value: data.spouse.spouseFullName },
                        childrenNames: { value: data.childrenNames },
                        hasFamilySupport: { value: data.hasFamilySupport },
                        hasFamilySupportExplain: { value: data.hasFamilySupportExplain }
                    };
                case 2:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        healthCondition: { value: data.healthCondition },
                        seriousInjury: { value: data.seriousInjury },
                        seriousInjuryExplain: { value: data.seriousInjuryExplain },
                        hasHandicap: { value: data.hasHandicap },
                        hasHandicapExplain: { value: data.hasHandicapExplain },
                        doSmoke: { value: data.doSmoke },
                        canLift33lbs: { value: data.canLift33lbs },
                        personalDoctor: { value: data.personalDoctor },
                        personalDoctorPhone: { value: data.personalDoctorPhone }
                    };
                case 3:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        emergencyName: { value: data.emergencyName },
                        emergencyRelationship: { value: data.emergencyRelationship },
                        emergencyStreet: { value: data.emergencyStreet },
                        emergencyCity: { value: data.emergencyCity },
                        emergencyState: { value: data.emergencyState },
                        emergencyZip: { value: data.emergencyZip },
                        emergencyPhone: { value: data.emergencyPhone },
                        emergencyCountry: { value: data.emergencyCountry },
                        emergencyEmail: { value: data.emergencyEmail }
                    };
                case 4:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        describeMotivation: { value: data.describeMotivation },
                        areaInterested: { value: data.areaInterested },
                        otherAreaInterested: { value: data.otherAreaInterested },
                        minAvailability: { value: data.minAvailability },
                        maxAvailability: { value: data.maxAvailability },
                        preferredStartDate: { value: convertDateObject(data.preferredStartDate) },
                        preferredStartDate2: { value: convertDateObject(data.preferredStartDate2) },
                        ifNoPosition: { value: data.ifNoPosition }
                    };
                case 5:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        educationTable: {
                            type: 'SUBTABLE',
                            value: data.educationTable.map((edu) => ({
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
                            value: data.employTable.map((emp) => ({
                                value: {
                                    employName: { value: emp.employName },
                                    employDate: { value: emp.employDate },
                                    employDuties: { value: emp.employDuties },
                                    employAddress: { value: emp.employAddress },
                                    employLeavingReason: { value: emp.employLeavingReason }
                                }
                            }))
                        },
                        hobby: { value: data.hobby },
                        clubs: { value: data.clubs },
                        serviceTable: {
                            type: 'SUBTABLE',
                            value: data.serviceTable.map((service) => ({
                                value: {
                                    serviceOrganizationName: { value: service.serviceOrganizationName },
                                    serviceStartDate: { value: service.serviceStartDate },
                                    serviceEndDate: { value: service.serviceEndDate },
                                    serviceDuties: { value: service.serviceDuties }
                                }
                            }))
                        },
                        hasDriverLicense: { value: data.hasDriverLicense },
                        hasLicenseMoreThanTwelveMonths: { value: data.hasLicenseMoreThanTwelveMonths },
                        drivingViolation: { value: data.drivingViolation },
                        hasConvictedTrafficAccident: { value: data.hasConvictedTrafficAccident },
                        hasTrafficAccidentExplain: { value: data.hasTrafficAccidentExplain },
                        hasVisitedIsrael: { value: data.hasVisitedIsrael },
                        hasVisitedIsraelDates: { value: data.hasVisitedIsraelDates },
                        listForeignCountries: { value: data.listForeignCountries }
                    };
                case 6:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        churchName: { value: data.churchName },
                        christianExperience: { value: data.christianExperience },
                        christianJewishUnderstanding: { value: data.christianJewishUnderstanding },
                        interestIsrael: { value: data.interestIsrael }
                    };
                case 7:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
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
                        hasHeavyLicense: { value: data.hasHeavyLicense },
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
                        skillForeignLanguage: { value: data.skillForeignLanguage },
                        skillComputer: { value: data.skillComputer },
                        skillSpecialTraining: { value: data.skillSpecialTraining }
                    };
                case 8:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        character1: { value: data.characters.character1 },
                        character2: { value: data.characters.character2 },
                        character3: { value: data.characters.character3 },
                        character4: { value: data.characters.character4 }
                    };
                case 9:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        refPastorName: { value: data.refPastorName },
                        refPastorAddress: { value: data.refPastorAddress },
                        refPastorPhone: { value: data.refPastorPhone },
                        refPastorEmail: { value: data.refPastorEmail },
                        refEmployerName: { value: data.refEmployerName },
                        refEmployerAddress: { value: data.refEmployerAddress },
                        refEmployerPhone: { value: data.refEmployerPhone },
                        refEmployerEmail: { value: data.refEmployerEmail },
                        refFriendName: { value: data.refFriendName },
                        refFriendAddress: { value: data.refFriendAddress },
                        refFriendPhone: { value: data.refFriendPhone },
                        refFriendEmail: { value: data.refFriendEmail },
                        refOtherName: { value: data.type.refOtherName },
                        refOtherAddress: { value: data.type.refOtherAddress },
                        refOtherPhone: { value: data.type.refOtherPhone },
                        refOtherEmail: { value: data.type.refOtherEmail },
                        refOtherRelationship: { value: data.type.refOtherRelationship },
                        hasFriendsIsrael: { value: data.hasFriendsIsrael },
                        hasFriendsIsraelExplain: { value: data.hasFriendsIsraelExplain }
                    };
                case 10:
                    if (isTemporary) {
                        return {
                            currentStep: { value: step },
                            ref: { value: parseInt(data.ref) }
                        };
                    } else
                        return {
                            currentStep: { value: 'Complete' },
                            ref: { value: parseInt(data.ref) }
                        };
                default:
                    return {};
            }
        })();
        const body = {
            record: record
        };
        const res = await fetch('/api/application/postTempApplicationForm', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return res;
        } else {
            throw new Error('Failed to add Kintone record');
        }
    } catch (error) {
        logError(error, data, 'postTempApplicationForm');
        console.error('Error submitting application form:', error);
    }
};

export default postTempApplicationForm;
