import Image from 'next/image';
import Link from 'next/link';

const Example_SSCard = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">
                Please upload a clear image of the Social Security Card
                <Image src="/uploads/sscard-requirement.jpg" alt="Social Security Card" width={500} height={500} />
                <div className="flex justify-center">
                    <Link href="/apply/documents/recent-photo" className="btn">
                        Back
                    </Link>
                </div>
            </section>
        </div>
    );
};
export default Example_SSCard;
