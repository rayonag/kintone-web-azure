import NotificationDocument from '@/common/react-email/emails/Notification-document';
import { render } from '@react-email/render';
import React from 'react';
import sgMail from '@sendgrid/mail';
import logError from '@/common/logError';
import { REST_SavedOnlineVolunteerApplication, REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';

export type NecessaryDocuments = keyof typeof necessaryDocuments;
const necessaryDocuments = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    criminalCheck: 'Criminal Check',
    criminalCheckApostille: 'Criminal Check Apostille'
};
export type NecessaryDocumentsUSA = keyof typeof necessaryDocumentsUSA;
const necessaryDocumentsUSA = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    criminalCheck: 'Criminal Check',
    criminalCheckApostille: 'Criminal Check Apostille',
    ssn: 'Social Security Card'
};
export type NecessaryDocumentsShortTerm = keyof typeof necessaryDocumentsShortTerm;
const necessaryDocumentsShortTerm = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter"
};

export type EmailNationalOffice = keyof typeof emailNationalOffice;
export const emailNationalOffice = {
    // add National Office email
    Australia_main: 'rneil.au@bridgesforpeace.com',
    Australia_zealous: 'aprilpatane.nat@gmail.com',
    Canada: 'trevorf@bfpcan.org',
    Japan: 'ronaga@bridgesforpeace.com',
    'New Zealand': 'emather.nz@bridgesforpeace.com',
    'South Africa': 'volunteers@bridgesforpeace.co.za',
    'South Korea': 'ronaga@bridgesforpeace.com',
    'United Kingdom': 'ronaga@bridgesforpeace.com',
    USA: 'lschoeman@bfpusa.org',
    Other: 'intl.personnel@bridgesforpeace.com'
} as const;

export type SubmitType = 'documentSubmission' | 'applicationSubmission' | 'healthQuestionnaireSubmission';

type Updated =
    | 'passport'
    | 'recentPhoto'
    | 'medicalStatusForm'
    | 'doctorLetter'
    | 'application'
    | 'healthQuestionnaire'
    | 'criminalCheck'
    | 'criminalCheckApostille'
    | 'ssn';
export const updated = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    application: 'Online Application',
    healthQuestionnaire: 'Health Questionnaire',
    criminalCheck: 'Criminal Check',
    criminalCheckApostille: 'Criminal Check Apostille',
    ssn: 'Social Security Card'
};
export const notificationApplicationUpdated = async (
    res: any,
    updatedField: Updated,
    record: REST_SavedOnlineVolunteerApplication,
    submitType: SubmitType
) => {
    try {
        const name = record['name'].value;
        const office = record['office'].value as EmailNationalOffice | 'Australia';
        const documents = record['documents'].value;
        const this_necessaryDocuments =
            record['office'].value === 'USA'
                ? necessaryDocumentsUSA
                : record['type'].value === 'Short Term'
                ? necessaryDocumentsShortTerm
                : necessaryDocuments;
        if (!office) throw new Error('Invalid office');
        // return if documentSubmission and not complete
        if (submitType === 'documentSubmission' && documents.length < Object.keys(this_necessaryDocuments).length) {
            res.status(200).json({ resp2: 'not complete' });
            return;
        }
        const to =
            office == 'Australia'
                ? record['type'].value == 'Zealous'
                    ? emailNationalOffice['Australia_zealous']
                    : emailNationalOffice['Australia_main']
                : emailNationalOffice[office] == undefined
                ? 'intl.personnel@bridgesforpeace.com'
                : emailNationalOffice[office];
        const mailTitle =
            submitType === 'documentSubmission'
                ? `[Online Application] Document submitted by ${name} (${documents.length}/${Object.keys(this_necessaryDocuments).length})`
                : submitType === 'applicationSubmission'
                ? `[Online Application] New application submitted by ${name}`
                : submitType === 'healthQuestionnaireSubmission'
                ? `[Online Application] Health Questionnaire submitted by ${name}`
                : `[Online Application] Document submitted by ${name}`;
        const mailBody = `${name} submitted ${updated[updatedField]}`;
        const cc = ''; //'intl.personnel@bridgesforpeace.com'; // add SDD email
        //const bcc = data.bcc;
        const mailHTML = render(<NotificationDocument mailBody={mailBody} applicationRef={record['$id'].value} />);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: to, // Change to your recipient
            from: 'BFP Online Application<onlineapplication@bridgesforpeace.com>', // Change to your verified sender
            cc: cc,
            bcc: '',
            subject: mailTitle,
            html: mailHTML
        };
        sgMail
            .send(msg)
            .then((e) => {
                res.status(200).json({ resp2: e });
                return;
            })
            .catch((e) => {
                logError(e, e.response.body.errors, 'notificationApplicationUpdated');
                res.status(200).json({ resp2: e });
                return;
            });
    } catch (e) {
        logError(e, record, 'notificationApplicationUpdated');
        res.status(200).json({ resp2: e });
    }
};
export default notificationApplicationUpdated;

export const notificationReferenceSubmitted = async (res: any, record: REST_SavedOnlineVolunteerApplication) => {
    try {
        const name = record['name'].value;
        const office = record['office'].value as EmailNationalOffice;
        if (!office) throw new Error('Invalid office');
        const to = emailNationalOffice[office];
        const mailTitle = `[Online Application] All Reference Forms submitted for ${name}`;
        const mailBody = `The Reference Forms are all submitted for ${name}`;
        const cc = ''; //'intl.personnel@bridgesforpeace.com'; // add SDD email?
        // const bcc = 'ronaga@bridgesforpeace.com';
        const mailHTML = render(<NotificationDocument mailBody={mailBody} applicationRef={record['$id'].value} />);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: to, // Change to your recipient
            from: 'BFP Online Application<onlineapplication@bridgesforpeace.com>', // Change to your verified sender
            cc: cc,
            bcc: 'ronaga@bridgesforpeace.com', // TODO: delete later
            subject: mailTitle,
            html: mailHTML
        };
        sgMail
            .send(msg)
            .then((e) => {
                res.status(200).json({ resp2: e });
                return;
            })
            .catch((error) => {
                res.status(200).json({ resp2: error });
                return;
            });
    } catch (e) {
        logError(e, record, 'notificationApplicationUpdated');
        res.status(200).json({ resp2: e });
    }
};
