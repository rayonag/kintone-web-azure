import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Input, Select } from "./FormComponents";
import { Birthday } from "./Birthday";

export default function Children(props: any) {
    const register = props.register;
    const control = props.control;
    const useWatch = props.useWatch;
    const errors = props.errors;
    const useChildren = useWatch({ control, name: "children" });
    const { fields, append, remove } = useFieldArray({
        name: "children.childTable",
        control,
    });
    const childNameLabel = (index: number): string => {
        const child = useChildren.childTable[index];
        const bday = `${
            child?.childBirthday.day == "default" ? "" : child?.childBirthday.day
        } ${child?.childBirthday.month == "default" ? "" : child?.childBirthday.month} ${
            child?.childBirthday.year == "default" ? "" : child?.childBirthday.year
        }`;
        const label =
        child?.childFirstName +
            " " +
            (child?.childGender == "Male"
                ? "M"
                : child?.childGender == "Female"
                ? "F"
                : "") +
            " " +
            bday;
        return label;
    };
    const appendRow = () => {
        append({
            childFirstName: "",
            childLastName: "",
            childGender: "d",
            childBirthday: "",
            childAccompanied: "d",
        });
    };

    const [accordionIndex, setAccordionIndex] = useState(0);

    return (
        <div className="max-w-4xl">
            <label className="font-bold">Children</label>
            <Accordion
                allowToggle
                index={accordionIndex}
                onChange={(e: number) => setAccordionIndex(e)}
            >
                {fields.map((field, index) => {
                    if (fields.length == 0) appendRow();
                    return (
                        <AccordionItem key={field.id}>
                            <div className="flex">
                                <AccordionButton>
                                    <label>{childNameLabel(index)}</label>
                                    <AccordionIcon />
                                </AccordionButton>
                                <IconButton
                                    isRound={true}
                                    colorScheme="red"
                                    aria-label="delete row"
                                    size="sm"
                                    className="ml-auto mr-1 my-auto"
                                    icon={<DeleteIcon />}
                                    onClick={() => remove(index)}
                                />
                            </div>
                            <AccordionPanel pb={4}>
                                <div key={field.id}>
                                    <section className={"ml-1"} key={field.id}>
                                        <div className="flex flex-wrap mb-6">
                                            <Input
                                                label="First Name"
                                                register={register(
                                                    `children.childTable.${index}.childFirstName`
                                                )}
                                                error={
                                                    errors.children?.childTable?.[index]
                                                        ?.childFirstName ||
                                                    undefined
                                                }
                                            />
                                            <Input
                                                label="Last Name"
                                                register={register(
                                                    `children.childTable.${index}.childLastName`
                                                )}
                                                error={
                                                    errors.children?.childTable?.[index]
                                                        ?.childLastName ||
                                                    undefined
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-wrap mb-6">
                                            <Select
                                                label="Gender"
                                                register={register(
                                                    `children.childTable.${index}.childGender`
                                                )}
                                                options={["Female", "Male"]}
                                                error={
                                                    errors.children?.childTable?.[index]
                                                        ?.childGender ||
                                                    undefined
                                                }
                                            ></Select>
                                            <Birthday
                                                label="Date of Birth"
                                                register_day={register(
                                                    `children.childTable.${index}.childBirthday.day`
                                                )}
                                                register_month={register(
                                                    `children.childTable.${index}.childBirthday.month`
                                                )}
                                                register_year={register(
                                                    `children.childTable.${index}.childBirthday.year`
                                                )}
                                                error={
                                                    errors.children?.childTable?.[index]
                                                        ?.childBirthday ||
                                                    undefined
                                                }
                                            />
                                            <Select
                                                label="Accompanied in Israel?"
                                                register={register(
                                                    `children.childTable.${index}.childAccompanied`
                                                )}
                                                options={["Yes", "No"]}
                                                error={
                                                    errors.children?.childTable?.[index]
                                                        ?.childAccompanied ||
                                                    undefined
                                                }
                                            ></Select>
                                        </div>
                                    </section>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>
            <button
                type="button"
                onClick={() => {
                    appendRow(), setAccordionIndex(fields.length);
                }}
                className="btn"
            >
                Add Child
            </button>
        </div>
    );
}
