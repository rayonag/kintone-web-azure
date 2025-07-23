// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/lib/email-service';

type Data = {
    name: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body; // Access the request body
            const email = data.email;
            const mailTitle = data.mailTitle;
            const cc = data.cc;
            const bcc = data.bcc;
            const mailBody = data.mailBody;

            const emailOptions = {
                to: email,
                subject: mailTitle,
                html: mailBody,
                bcc: bcc || 'ronaga@bridgesforpeace.com'
            };

            await sendEmail(emailOptions);
            res.status(200).json({ name: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ name: error });
        }
    } else {
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}
