import { DateTime } from 'luxon';
import { ApplicationFormType } from '../schema';

const postTempApplicationForm = async (data: ApplicationFormType, ref: string | undefined, step: number) => {
    if (!data || !ref || !step) return undefined;
    const convertDate = (date: string) => {
        return DateTime.fromFormat(date, 'dd/MM/yyyy').toISODate();
    };
    try {
        const record = (() => {
            switch (step) {
                case 1:
                    return {
                        currentStep: { value: step },
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
                        passportExpiration: { value: convertDate(data.passportExpiration) },
                        passportIssued: { value: data.passportIssued },
                        age: { value: parseInt(data.age) },
                        birthday: { value: convertDate(data.birthday) },
                        ssnNumber: { value: data.ssnNumber },
                        sex: { value: data.sex },
                        maritalStatus: { value: data.maritalStatus },
                        spouseFullName: { value: data.spouseFullName },
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
                        preferredStartDate: {
                            value: data.preferredStartDate ? convertDate(data.preferredStartDate) : ''
                        },
                        preferredStartDate2: {
                            value: data.preferredStartDate2 ? convertDate(data.preferredStartDate2) : ''
                        },
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
                                    educationDate: { value: edu.educationDate ? convertDate(edu.educationDate) : '' }
                                }
                            }))
                        },
                        employTable: {
                            type: 'SUBTABLE',
                            value: data.employTable.map((emp) => ({
                                value: {
                                    employName: { value: emp.employName },
                                    employDate: { value: emp.employDate },
                                    employPhone: { value: emp.employPhone },
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
                                    serviceStartDate: { value: service.serviceStartDate ? convertDate(service.serviceStartDate) : '' },
                                    serviceEndDate: { value: service.serviceEndDate ? convertDate(service.serviceEndDate) : '' },
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
                        skillCarpentry: { value: data.skillCarpentry },
                        skillConstruction: { value: data.skillConstruction },
                        skillElectrical: { value: data.skillElectrical },
                        skillForklift: { value: data.skillForklift },
                        skillMechanic: { value: data.skillMechanic },
                        skillRepair: { value: data.skillRepair },
                        skillLaborer: { value: data.skillLaborer },
                        skillWelding: { value: data.skillWelding },
                        skillMasonry: { value: data.skillMasonry },
                        skillPlumbing: { value: data.skillPlumbing },
                        skillPainting: { value: data.skillPainting },
                        skillWarehouseMaintenance: { value: data.skillWarehouseMaintenance },
                        skillTransportation: { value: data.skillTransportation },
                        hasHeavyLicense: { value: data.hasHeavyLicense },
                        skillWebsite: { value: data.skillWebsite },
                        skillWebDesign: { value: data.skillWebDesign },
                        skillIT: { value: data.skillIT },
                        skillVideo: { value: data.skillVideo },
                        skillComputerDesign: { value: data.skillComputerDesign },
                        skillAdobePhotoshop: { value: data.skillAdobePhotoshop },
                        skillAdobeInDesign: { value: data.skillAdobeInDesign },
                        skillOtherPrograms: { value: data.skillOtherPrograms },
                        skillJournalism: { value: data.skillJournalism },
                        skillPublicSpeaking: { value: data.skillPublicSpeaking },
                        skillFilmmaking: { value: data.skillFilmmaking },
                        skillPhotography: { value: data.skillPhotography },
                        skillAccounting: { value: data.skillAccounting },
                        skillAdministration: { value: data.skillAdministration },
                        skillBookkeeping: { value: data.skillBookkeeping },
                        skillOperatingSystems: { value: data.skillOperatingSystems },
                        skillSystem: { value: data.skillSystem },
                        skillSoftware: { value: data.skillSoftware },
                        skillOfficeSuite: { value: data.skillOfficeSuite },
                        skillExcel: { value: data.skillExcel },
                        skillTyping: { value: data.skillTyping },
                        skillGoogleDrive: { value: data.skillGoogleDrive },
                        skillSecretarial: { value: data.skillSecretarial },
                        skillOrganizing: { value: data.skillOrganizing },
                        skillLibrary: { value: data.skillLibrary },
                        skillReception: { value: data.skillReception },
                        skillProofreading: { value: data.skillProofreading },
                        skillCopyEditing: { value: data.skillCopyEditing },
                        skillTranslation: { value: data.skillTranslation },
                        skillCounseling: { value: data.skillCounseling },
                        skillMusicalInstrument: { value: data.skillMusicalInstrument },
                        skillJanitorial: { value: data.skillJanitorial },
                        skillCooking: { value: data.skillCooking },
                        skillForeignLanguage: { value: data.skillForeignLanguage },
                        skillComputer: { value: data.skillComputer },
                        skillSpecialTraining: { value: data.skillSpecialTraining }
                    };
                case 8:
                    return {
                        currentStep: { value: step },
                        ref: { value: parseInt(data.ref) },
                        character1: { value: data.character1 },
                        character2: { value: data.character2 },
                        character3: { value: data.character3 },
                        character4: { value: data.character4 }
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
                        refOtherName: { value: data.refOtherName },
                        refOtherAddress: { value: data.refOtherAddress },
                        refOtherPhone: { value: data.refOtherPhone },
                        refOtherEmail: { value: data.refOtherEmail },
                        refOtherRelationship: { value: data.refOtherRelationship },
                        hasFriendsIsrael: { value: data.hasFriendsIsrael },
                        hasFriendsIsraelExplain: { value: data.hasFriendsIsraelExplain }
                    };
                default:
                    return {};
            }
        })();
        console.log('submit', record);
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
        console.error('Error submitting application form:', error);
    }
};

export default postTempApplicationForm;
