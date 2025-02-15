// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';
import logError from '@/common/logError';
import { EmailNationalOffice, emailNationalOffice } from '../hooks/notification';

type Data = {
    name: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const data = req.body; // Access the request body
        const name = data.name;
        const email = data.email;
        const type = data.type;
        const message = data.message;
        const office = data.office as EmailNationalOffice | 'Australia';
        const to =
            office == 'Australia'
                ? type == 'Zealous'
                    ? emailNationalOffice['Australia_zealous']
                    : emailNationalOffice['Australia_main']
                : emailNationalOffice[office] == undefined
                ? 'intl.personnel@bridgesforpeace.com'
                : emailNationalOffice[office];
        const bcc = to == 'intl.personnel@bridgesforpeace.com' ? '' : 'intl.personnel@bridgesforpeace.com'; // bcc intl if not sent to intl
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: to, // Change to your recipient
            cc: '',
            bcc: bcc, // 'intl.personnel@bridgesforpeace.com'
            from: 'BFP Online Application<onlineapplication@bridgesforpeace.com>', // Change to your verified sender
            subject: '[Online Volunteer Application]New message from Contact Us Form',
            html: `<div>Name: ${name}</div><div>Email: ${email}</div><div>Message: ${message}</div>`
        };
        sgMail
            .send(msg)
            .then((e) => {
                res.status(200).json({ name: e });
            })
            .catch((e) => {
                logError(e, e.response.body.errors, 'contactUs');
                res.status(200).json({ name: e });
            });
    } else {
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}
