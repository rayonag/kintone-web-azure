import { Input, Select, Radio } from "./../components/FormComponents";
import Children from "../components/ChildrenTable";
import { Birthday } from "../components/Birthday";

export default function SecondPage(props: any) {
    const setPage = props.setPage;
    const errors = props.errors;
    const register = props.register;
    const trigger = props.trigger;
    const control = props.control;
    const useWatch = props.useWatch;
    const t = props.t;

    const fields = ["spouse", "children"];
    const validate = async () => {
        const isValids = await trigger(fields);
        console.log("isValid SecondPage: " + isValids);
        if (isValids) return true;
        else return false;
    };

    const isMarried = useWatch({ control, name: "spouse.maritalStatus" });
    const hasChild = useWatch({ control, name: "children.childStatus" });
    return (
        <>
            <div className="text-2xl font-bold my-10">
                <label>Family Information</label>
            </div>
            <div className="flex flex-wrap mb-6">
                <Select label="Marital Status" options={["Married", "Single", "Widowed", "Divorced"]} register={register("spouse.maritalStatus")} error={errors.spouse?.maritalStatus || undefined} />
                <div className={"flex flex-wrap md:mb-6 " + (isMarried == "Married" || "hidden")}>
                    <Input label="Spouse First Name" register={register("spouse.spouseFirstName")} error={errors.spouse?.spouseFirstName || undefined} />
                    <Input label="Spouse Family Name" register={register("spouse.spouseFamilyName")} error={errors.spouse?.spouseFamilyName || undefined} />
                </div>
            </div>
            <div className={"flex flex-wrap mb-6 " + (isMarried == "Married" || "hidden")}>
                <Select label="Spouse ID Type" options={["Teudat Zehut", "Teudat Oleh"]} register={register("spouse.spouseIDType")} error={errors.spouse?.spouseIDType || undefined} />
                <Input label="Spouse ID Number" register={register("spouse.spouseIDNumber")} error={errors.spouse?.spouseIDNumber || undefined} />
                <Birthday label="Spouse Date of Birth" register_day={register("spouse.spouseBirthday.day")} register_month={register("spouse.spouseBirthday.month")} register_year={register("spouse.spouseBirthday.year")} error={errors.spouse?.spouseBirthday || undefined} />
            </div>
            <div className="flex flex-wrap mb-6">
                <Radio label="Do you have any children?" options={["Yes", "No"]} register={register("children.childStatus")} error={errors.children?.childStatus || undefined} />
            </div>

            <div className="flex mt-5">
                <button className="btn" onClick={() => setPage(0)}>
                    Back
                </button>
                <button
                    className="btn"
                    onClick={async () => {
                        if (await validate()) setPage(2);
                    }}
                >
                    Next
                </button>
            </div>
        </>
    );
}
