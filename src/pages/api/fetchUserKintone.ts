import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    ok: boolean;
    name?: any;
    ref?: any;
    username?: any;
    password?: any;
    checkList?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const username = data.username;
            const client = new KintoneRestAPIClient({
                baseUrl: "https://bfp.kintone.com",
                // Use password authentication
                auth: {
                    username: process.env.KINTONE_USERNAME,
                    password: process.env.KINTONE_PASSWORD,
                },
            });
            const recordArray = await client.record.getAllRecords({ app: "121", condition: `email="${username}"` });
            if (recordArray.length == 0) res.status(501).json({ ok: false });
            else {
                if (recordArray.length > 1) console.log("Found more than one user with the same email."); // TODO: add verification

                const user = recordArray[0];
                // type guard
                if (typeof user["$id"].value !== "string") {
                    res.status(505);
                    return;
                }
                console.log(user);

                res.status(200).json({
                    ok: true,
                    name: user["name"],
                    ref: user["ref"],
                    username: user["email"],
                    checkList: user["checkList"],
                });
            }
        } catch (e: any) {
            console.log(e.errors);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}