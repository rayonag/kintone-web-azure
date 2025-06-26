import { FC, useEffect, useState } from 'react';
import { useWatch, Control, useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormType } from '../applicationForm/schema';
import Input from './Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DeleteCircleX from '@/components/icons/DeleteCircleX';

type ServiceTableProps = {
    errors: FieldErrors<ApplicationFormType>;
    register: UseFormRegister<ApplicationFormType>;
    control: Control<ApplicationFormType>;
    t: any;
};

const ServiceTable: FC<ServiceTableProps> = ({ errors, register, control, t }) => {
    const [openItem, setOpenItem] = useState<string>('item-0');
    const useServiceTable = useWatch({ control, name: 'serviceTable' });
    const { fields, append, remove } = useFieldArray({
        name: 'serviceTable',
        control
    });

    useEffect(() => {
        if (errors?.serviceTable) {
            const errorItem = (errors.serviceTable as any[]).findIndex(
                (error: Record<string, any> | undefined) => error && Object.keys(error).length > 0
            );
            if (errorItem > -1) {
                setOpenItem(`item-${errorItem}`);
                const accordionItem = document.getElementById(`service-item-${errorItem}`);
                if (accordionItem) {
                    accordionItem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [errors?.serviceTable]);

    const serviceLabel = (index: number): string => {
        const service = useServiceTable[index];
        const organizationName = service?.serviceOrganizationName || '';
        const startDate = service?.serviceStartDate || '';
        const endDate = service?.serviceEndDate || '';
        return `${organizationName} (${startDate} - ${endDate})`;
    };

    const appendRow = () => {
        append({
            serviceOrganizationName: '',
            serviceStartDate: '',
            serviceEndDate: '',
            serviceDuties: ''
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
            <div className="font-semibold italic mt-8 text-lg text-center">{t('serviceTable.title')}</div>
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                {fields.map((field, index) => {
                    if (fields.length == 0) appendRow();
                    return (
                        <AccordionItem
                            key={field.id}
                            value={`item-${index}`}
                            id={`service-item-${index}`}
                            className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}
                        >
                            <div className="flex items-center text-gray-800">
                                <>
                                    <AccordionTrigger>
                                        <label className="text-lg m-2 min-w-40">{serviceLabel(index)}</label>
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
                                                label={t('serviceTable.serviceOrganizationName')}
                                                register={register(`serviceTable.${index}.serviceOrganizationName`)}
                                                error={(errors?.serviceTable?.[index]?.serviceOrganizationName as any) || undefined}
                                            />
                                            <Input
                                                label={t('serviceTable.serviceStartDate')}
                                                register={register(`serviceTable.${index}.serviceStartDate`)}
                                                placeholder="Jan 2020 / Jan 02, 2020"
                                                error={(errors?.serviceTable?.[index]?.serviceStartDate as any) || undefined}
                                            />
                                            <Input
                                                label={t('serviceTable.serviceEndDate')}
                                                register={register(`serviceTable.${index}.serviceEndDate`)}
                                                placeholder="Jan 2020 / Jan 02, 2020"
                                                error={(errors?.serviceTable?.[index]?.serviceEndDate as any) || undefined}
                                            />
                                            <Input
                                                label={t('serviceTable.serviceDuties')}
                                                register={register(`serviceTable.${index}.serviceDuties`)}
                                                error={(errors?.serviceTable?.[index]?.serviceDuties as any) || undefined}
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

export default ServiceTable;
