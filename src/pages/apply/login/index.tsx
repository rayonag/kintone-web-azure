import Layout_fadeIn from '@/styles/Layout_fadeIn_main';
import Link from 'next/link';

const Login: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Layout_fadeIn key="top">
                <div className="flex flex-col h-[95vh] justify-center ">
                    <div className="text-center text-3xl italic font-serif mb-10">Please select:</div>
                    <div className="flex">
                        <Link href="/apply/login/main" className="flex flex-col justify-center m-4 cursor-pointer">
                            <div
                                className="h-40 w-40 rounded-full hover:scale-110 transition-transform duration-500 ease-in-out"
                                style={{
                                    backgroundImage: "url('/images/bridges-logo-round.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="font-xl text-white text-center m-4 font-bold">・Long Term</div>{' '}
                            <div className="font-xl text-white text-center m-4 font-bold">・Short Term</div>
                        </Link>
                        <Link href="/apply/login/zealous" className="flex flex-col justify-center m-4">
                            <div
                                className="h-40 w-40 rounded-full hover:scale-110 transition-transform duration-500 ease-in-out"
                                style={{
                                    backgroundImage: "url('/images/zealous/zealous-logo-round.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="font-xl text-white text-center m-4 font-bold">・ZProject</div>
                            <div className="font-xl text-white text-center m-4 font-bold h-4"></div>
                        </Link>
                    </div>
                </div>
            </Layout_fadeIn>
        </div>
    );
};
export default Login;
