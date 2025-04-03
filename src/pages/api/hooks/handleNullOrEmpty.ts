import { NextApiResponse } from 'next';

type Data = {
    res?: any;
};
type HandleNullOrEmptyProps = {
    res: NextApiResponse<Data>;
    errorMessage: string;
};
const handleNullOrEmpty: (props: HandleNullOrEmptyProps) => NextApiResponse<Data> = ({ res, errorMessage }) => {
    res.status(500).json({
        res: errorMessage
    });
    return res.end();
};
export default handleNullOrEmpty;
