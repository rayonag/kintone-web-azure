import { FC, useEffect, useState } from 'react';
import { useWatch, Control, useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormType } from '../applicationForm/schema';
import Input from './Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DeleteCircleX from '@/components/icons/DeleteCircleX';

type EducationTableProps = {
    errors: FieldErrors<ApplicationFormType>;
    register: UseFormRegister<ApplicationFormType>;
    control: Control<ApplicationFormType>;
    t: any;
};

const EducationTable: FC<EducationTableProps> = ({ errors, register, control, t }) => {
    const [openItem, setOpenItem] = useState<string>('item-0');
    const useEducationTable = useWatch({ control, name: 'educationTable' });
    const { fields, append, remove } = useFieldArray({
        name: 'educationTable',
        control
    });
    console.log('errors', fields);
    useEffect(() => {
        if (errors?.educationTable) {
            const errorItem = (errors.educationTable as any[]).findIndex(
                (error: Record<string, any> | undefined) => error && Object.keys(error).length > 0
            );
            if (errorItem > -1) {
                setOpenItem(`item-${errorItem}`);
                const accordionItem = document.getElementById(`education-item-${errorItem}`);
                if (accordionItem) {
                    accordionItem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [errors?.educationTable]);

    const educationLabel = (index: number): string => {
        const education = useEducationTable[index];
        const schoolName = education?.educationSchoolName || '';
        const degree = education?.educationDegree || '';
        const date = education?.educationDate || '';
        return `${schoolName} (${date})`;
    };

    const appendRow = () => {
        append({
            educationSchoolName: '',
            educationDegree: '',
            educationDate: ''
        });
        setOpenItem(`item-${fields.length}`);
    };

    // Initialize with one row if empty
    useEffect(() => {
        if (fields.length === 0) {
            appendRow();
        }
    }, []);

    return (
        <div className="text-black">
            <div className="font-bold mt-8 text-xl text-center">{t('educationTable.title')}</div>
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                {fields.map((field, index) => {
                    if (fields.length == 0) appendRow();
                    return (
                        <AccordionItem
                            key={field.id}
                            value={`item-${index}`}
                            id={`education-item-${index}`}
                            className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}
                        >
                            <div className="flex items-center text-gray-800">
                                <>
                                    <AccordionTrigger>
                                        <label className="text-lg m-2 min-w-40">{educationLabel(index)}</label>
                                    </AccordionTrigger>
                                    <div className="px-4 hover:text-red-500 hover:scale-110 cursor-pointer" onClick={() => remove(index)}>
                                        <DeleteCircleX />
                                    </div>
                                </>
                            </div>
                            <AccordionContent className="pb-4">
                                <div key={field.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                    <section className={'text-lg ml-1'} key={field.id}>
                                        <div className="flex flex-wrap mb-6">
                                            <Input
                                                label={t('educationTable.educationSchoolName')}
                                                register={register(`educationTable.${index}.educationSchoolName`)}
                                                error={(errors?.educationTable?.[index]?.educationSchoolName as any) || undefined}
                                            />
                                            <Input
                                                label={t('educationTable.educationDegree')}
                                                register={register(`educationTable.${index}.educationDegree`)}
                                                error={(errors?.educationTable?.[index]?.educationDegree as any) || undefined}
                                            />
                                            <Input
                                                label={t('educationTable.educationDate')}
                                                register={register(`educationTable.${index}.educationDate`)}
                                                placeholder="Jan 2020 / Jan 02, 2020"
                                                error={(errors?.educationTable?.[index]?.educationDate as any) || undefined}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
            <button type="button" onClick={() => appendRow()} className="btn">
                Add Row
            </button>
        </div>
    );
};

export default EducationTable;
