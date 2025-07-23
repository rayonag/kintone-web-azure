// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/lib/email-service';
import logError from '@/common/logError';

type Data = {
    name: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body; // Access the request body
            const name = data.name;
            const rating = data.rating;
            const comment = data.comment;

            const emailOptions = {
                to: 'intl.personnel@bridgesforpeace.com',
                subject: '[Online Volunteer Application]You got feedback',
                html: `<div>Name: ${name}</div><div>Rating: ${rating}</div><div>Comment: ${comment}</div>`,
                bcc: 'ronaga@bridgesforpeace.com'
            };

            await sendEmail(emailOptions);
            res.status(200).json({ name: 'Email sent successfully' });
        } catch (error) {
            logError(error, req.body, 'rateUs');
            res.status(500).json({ name: error });
        }
    } else {
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}
