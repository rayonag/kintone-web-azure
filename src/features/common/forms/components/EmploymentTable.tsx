import { FC, useEffect, useState } from 'react';
import { useWatch, Control, useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormType } from '../applicationForm/schema';
import Input from './Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DeleteCircleX from '@/components/icons/DeleteCircleX';

type EmploymentTableProps = {
    errors: FieldErrors<ApplicationFormType>;
    register: UseFormRegister<ApplicationFormType>;
    control: Control<ApplicationFormType>;
    t: any;
};

const EmploymentTable: FC<EmploymentTableProps> = ({ errors, register, control, t }) => {
    const [openItem, setOpenItem] = useState<string>('item-0');
    const useEmploymentTable = useWatch({ control, name: 'employTable' });
    const { fields, append, remove } = useFieldArray({
        name: 'employTable',
        control
    });

    useEffect(() => {
        if (errors?.employTable) {
            const errorItem = (errors.employTable as any[]).findIndex(
                (error: Record<string, any> | undefined) => error && Object.keys(error).length > 0
            );
            if (errorItem > -1) {
                setOpenItem(`item-${errorItem}`);
                const accordionItem = document.getElementById(`employment-item-${errorItem}`);
                if (accordionItem) {
                    accordionItem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [errors?.employTable]);

    const employmentLabel = (index: number): string => {
        const employment = useEmploymentTable[index];
        const companyName = employment?.employName || '';
        const position = employment?.employDuties || '';
        const date = employment?.employDate || '';
        return `${companyName} - ${position} (${date})`;
    };

    const appendRow = () => {
        append({
            employDate: '',
            employName: '',
            employAddress: '',
            employDuties: '',
            employLeavingReason: ''
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
            <div className="font-semibold italic mt-8 text-lg text-center">{t('employTable.title')}</div>
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                {fields.map((field, index) => {
                    if (fields.length == 0) appendRow();
                    return (
                        <AccordionItem
                            key={field.id}
                            value={`item-${index}`}
                            id={`employment-item-${index}`}
                            className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}
                        >
                            <div className="flex items-center text-gray-800">
                                <>
                                    <AccordionTrigger>
                                        <label className="text-lg m-2 min-w-40">{employmentLabel(index)}</label>
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
                                                label={t('employTable.employDate')}
                                                register={register(`employTable.${index}.employDate`)}
                                                placeholder="Jan 2020 / Jan 02, 2020"
                                                error={(errors?.employTable?.[index]?.employDate as any) || undefined}
                                            />
                                            <Input
                                                label={t('employTable.employName')}
                                                register={register(`employTable.${index}.employName`)}
                                                placeholder={index === 0 ? 'Bills Plumbing' : ''}
                                                error={(errors?.employTable?.[index]?.employName as any) || undefined}
                                            />
                                            <Input
                                                label={t('employTable.employAddress')}
                                                register={register(`employTable.${index}.employAddress`)}
                                                placeholder={index === 0 ? '123 Main St. New York 45678' : ''}
                                                error={(errors?.employTable?.[index]?.employAddress as any) || undefined}
                                            />
                                            <Input
                                                label={t('employTable.employDuties')}
                                                register={register(`employTable.${index}.employDuties`)}
                                                placeholder={index === 0 ? 'Installer' : ''}
                                                error={(errors?.employTable?.[index]?.employDuties as any) || undefined}
                                            />
                                            <Input
                                                label={t('employTable.employLeavingReason')}
                                                register={register(`employTable.${index}.employLeavingReason`)}
                                                placeholder={index === 0 ? 'looking for a change.' : ''}
                                                error={(errors?.employTable?.[index]?.employLeavingReason as any) || undefined}
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

export default EmploymentTable;
