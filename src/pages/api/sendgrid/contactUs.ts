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
        const message = data.message;
        const office = data.office as EmailNationalOffice;
        const to = emailNationalOffice[office] == undefined ? 'intl.personnel@bridgesforpeace.com' : emailNationalOffice[office];
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: to, // Change to your recipient
            cc: to == 'intl.personnel@bridgesforpeace.com' ? '' : 'intl.personnel@bridgesforpeace.com',
            bcc: '',
            from: 'BFP Noreply<noreply@bridgesforpeace.com>', // Change to your verified sender
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
