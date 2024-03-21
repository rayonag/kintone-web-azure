import { NextApiResponse } from 'next';

type Data = {
    res?: any;
};
type HandleNullOrEmptyProps = {
    res: NextApiResponse<Data>;
    errorMessage: string;
};
const handleNullOrEmpty: (props: HandleNullOrEmptyProps) => NextApiResponse<Data> = ({ res, errorMessage }) => {
    res.statusCode = 500;
    res.json({
        res: errorMessage
    });
    res.end();
    return res;
};
export default handleNullOrEmpty;
