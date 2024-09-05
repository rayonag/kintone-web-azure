import { email_Japan, email_SouthAfrica } from '@/common/env';
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
    criminalCheck: 'Criminal Check'
};
export type NecessaryDocumentsUSA = keyof typeof necessaryDocumentsUSA;
const necessaryDocumentsUSA = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    criminalCheck: 'Criminal Check',
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
    Australia: 'ronaga@bridgesforpeace.com',
    Canada: 'bettyw@bfpcan.org',
    Japan: 'ronaga@bridgesforpeace.com',
    'New Zealand': 'ronaga@bridgesforpeace.com',
    'South Africa': 'ronaga@bridgesforpeace.com',
    'South Korea': 'ronaga@bridgesforpeace.com',
    'United Kingdom': 'ronaga@bridgesforpeace.com',
    USA: 'lschoeman@bfpusa.org',
    Other: 'ronaga@bridgesforpeace.com'
} as const;

export type SubmitType = 'documentSubmission' | 'applicationSubmission' | 'healthQuestionnaireSubmission';

type Updated = 'passport' | 'recentPhoto' | 'medicalStatusForm' | 'doctorLetter' | 'application' | 'healthQuestionnaire' | 'criminalCheck' | 'ssn';
export const updated = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    application: 'Online Application',
    healthQuestionnaire: 'Health Questionnaire',
    criminalCheck: 'Criminal Check',
    ssn: 'Copy of Social Security Card'
};
export const notificationApplicationUpdated = async (res: any, updatedField: Updated, record: any, submitType: SubmitType) => {
    try {
        const name = record['name'].value;
        const office = record['office'].value as EmailNationalOffice;
        const documents = record['documents'].value;
        const this_necessaryDocuments =
            record['office'].value === 'USA'
                ? necessaryDocumentsUSA
                : record['type'].value === 'Short Term'
                ? necessaryDocumentsShortTerm
                : necessaryDocuments;
        if (!office) throw new Error('Invalid office');
        const to = emailNationalOffice[office] == undefined ? 'intl.personnel@bridgesforpeace.com' : emailNationalOffice[office];
        const mailTitle =
            submitType === 'documentSubmission'
                ? `[Online Application] Document submitted by ${name} (${documents.length}/${Object.keys(this_necessaryDocuments).length})`
                : submitType === 'applicationSubmission'
                ? `[Online Application] New application submitted by ${name}`
                : submitType === 'healthQuestionnaireSubmission'
                ? `[Online Application] Health Questionnaire submitted by ${name}`
                : `[Online Application] Document submitted by ${name}`;
        const mailBody = `${name} submitted ${updated[updatedField]}`;
        const cc = 'intl.personnel@bridgesforpeace.com'; // add SDD email
        //const bcc = data.bcc;
        const mailHTML = render(<NotificationDocument mailBody={mailBody} applicationRef={record['$id'].value} />);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: to, // Change to your recipient
            from: 'BFP Noreply<noreply@bridgesforpeace.com>', // Change to your verified sender
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
        const mailTitle = `[Online Application] Reference Form submitted for ${name}`;
        const mailBody = `There is new Reference Form submitted for ${name}`;
        const cc = 'onaga.ray@gmail.com'; //'intl.personnel@bridgesforpeace.com'; // add SDD email
        //const bcc = data.bcc;
        const mailHTML = render(<NotificationDocument mailBody={mailBody} applicationRef={record['$id'].value} />);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: ['noreply@bridgesforpeace.com', to], // Change to your recipient
            from: 'BFP Noreply<noreply@bridgesforpeace.com>', // Change to your verified sender
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
            .catch((error) => {
                console.log('error', error.response.body.errors);
                res.status(200).json({ resp2: error });
                return;
            });
    } catch (e) {
        logError(e, record, 'notificationApplicationUpdated');
        res.status(200).json({ resp2: e });
    }
};
