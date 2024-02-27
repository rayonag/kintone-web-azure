import { Input, Select, Radio } from "./../components/FormComponents";
import { Birthday } from "../components/Birthday";

export default function FirstPage (props: any) {
    const setPage = props.setPage;
    const errors = props.errors;
    const register = props.register;
    const trigger = props.trigger;
    const t = props.t;

    const fields = [
        "firstName",
        "lastName",
        "IDType",
        "IDNumber",
        "birthday",
        "gender",
        "originCity",
        "originCountry",
        "nativeLanguage",
        "phone",
        "email",
        "address1",
        "address2",
        "city",
        "zip",
    ];
    const validate = async () => {
        const isValids = await trigger(fields);
        console.log("isValid FirstPage: " + isValids);
        if (isValids) return true;
        else return false;
    };

    return (
        <>
            <div className="text-2xl font-bold my-10">
                <label>Personal Information</label>
            </div>
            <div className="flex flex-wrap mb-6">
                <Input
                    label={t("firstName")}
                    register={register("firstName")}
                    placeholder={t("firstName")}
                    error={errors.firstName || undefined}
                />
                <Input
                    label={t("lastName")}
                    register={register("lastName")}
                    error={errors.lastName || undefined}
                />
            </div>
            <div className="flex flex-wrap mb-6">
                <Select
                    label={t("IDType")}
                    options={["Teudat Zehut", "Teudat Oleh"]}
                    register={register("IDType")}
                    error={errors.IDType || undefined}
                />
                <Input
                    label={t("IDNumber")}
                    register={register("IDNumber")}
                    error={errors.IDNumber || undefined}
                />
            </div>
            {/* <label className="flex space-y-1"> */}
            {/* <FileUpload /> */}
            {/* <FileUpload /> */}
            {/* <FileUpload /> */}
            {/* </label> */}
            <label className="flex space-y-1 mb-6">
                <Birthday
                    label={t("birthday")}
                    register_day={register("birthday.day")}
                    register_month={register("birthday.month")}
                    register_year={register("birthday.year")}
                    error={errors.birthday || undefined}
                />
            </label>
            <div className="flex flex-wrap mb-6">
                <Radio
                    label={t("gender")}
                    options={["Female", "Male"]}
                    register={register("gender")}
                    error={errors.gender || undefined}
                />
            </div>
            <div className="flex flex-wrap mb-6">
                <Input
                    label={t("originCity")}
                    register={register("originCity")}
                    error={errors.originCity || undefined}
                />
                <Input
                    label={t("originCountry")}
                    register={register("originCountry")}
                    error={errors.originCountry || undefined}
                />
                <Select
                    label={t("nativeLanguage")}
                    options={[
                        "Hebrew",
                        "English",
                        "Russian",
                        "Spanish",
                        "French",
                        "Ukrainian",
                        "Other",
                    ]}
                    register={register("nativeLanguage")}
                    error={errors.nativeLanguage || undefined}
                />
            </div>

            <div className="text-2xl font-bold my-10">
                <label>Contact Information</label>
            </div>
            <div className="flex flex-wrap mb-6">
                <Input
                    label={t("phone")}
                    placeholder="052-1234-5678"
                    register={register("phone")}
                    error={errors.phone || undefined}
                />
                <Input
                    label={t("email")}
                    placeholder="example@mail.co.il"
                    register={register("email")}
                    error={errors.email || undefined}
                />
            </div>
            <div className="flex flex-wrap mb-6">
                <Input
                    label={t("address1")}
                    placeholder="Street Name, House No."
                    register={register("address1")}
                    error={errors.address1 || undefined}
                />
                <Input
                    label={t("address2")}
                    placeholder="Company, Apartment, Building, etc."
                    register={register("address2")}
                    error={errors.address2 || undefined}
                />
            </div>
            <div className="flex flex-wrap mb-6">
                <Input
                    label={t("city")}
                    register={register("city")}
                    error={errors.city || undefined}
                />
                <Input
                    label={t("zip")}
                    register={register("zip")}
                    error={errors.zip || undefined}
                />
            </div>

            <button
                onClick={async () => {
                    const valid = await validate();
                    if (valid) setPage(1);
                }}
                className="bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
            >
                {t("next")}
            </button>
        </>
    );
};
