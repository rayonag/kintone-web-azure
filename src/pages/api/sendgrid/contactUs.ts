// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/lib/email-service';
import logError from '@/common/logError';
import { EmailNationalOffice, emailNationalOffice } from '../hooks/notification';

type Data = {
    name: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
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

            const emailOptions = {
                to: to,
                subject: '[Online Volunteer Application]New message from Contact Us Form',
                html: `<div>Name: ${name}</div><div>Email: ${email}</div><div>Message: ${message}</div>`,
                bcc: bcc
            };

            await sendEmail(emailOptions);
            res.status(200).json({ name: 'Email sent successfully' });
        } catch (error) {
            logError(error, req.body, 'contactUs');
            res.status(500).json({ name: error });
        }
    } else {
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}
