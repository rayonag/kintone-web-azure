// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

type Data = {
    name: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const data = req.body; // Access the request body
        const name = data.name;
        const rating = data.rating;
        const comment = data.comment;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: 'intl.personnel@bridgesforpeace.com', // Change to your recipient
            cc: 'ronaga@bridgesforpeace.com',
            from: 'BFP Noreply<noreply@bridgesforpeace.com>', // Change to your verified sender
            subject: '[Online Volunteer Application]You got feedback',
            html: `<div>Name: ${name}</div><div>Rating: ${rating}</div><div>Comment: ${comment}</div>`
        };
        sgMail
            .send(msg)
            .then((e) => {
                res.status(200).json({ name: e });
            })
            .catch((error) => {
                res.status(200).json({ name: error });
            });
    } else {
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}
