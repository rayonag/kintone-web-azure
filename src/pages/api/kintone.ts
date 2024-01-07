import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const client = new KintoneRestAPIClient({
        baseUrl: "https://bfp.kintone.com",
        // Use password authentication
        auth: {
            username: process.env.KINTONE_USERNAME,
            password: process.env.KINTONE_PASSWORD,
        },
    });
    client.record
        .getRecords({ app: "223" })
        .then((resp) => {
            console.log(resp.records);
            res.status(200).json({ name: resp.records });
        })
        .catch((err) => {
            console.log(err);
        });
    //res.status(200).json({ name: "success?" });
}
