// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import sgMail from "@sendgrid/mail";

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const msg = {
        to: "onaga.ray@gmail.com", // Change to your recipient
        from: "ronaga@bridgesforpeace.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
    res.status(200).json({ name: "success" });
}
