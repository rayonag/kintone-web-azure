import { TFunction } from 'i18next';
import { FC, useState } from 'react';
import { Control, FieldError, useFieldArray, useFormContext, UseFormRegister } from 'react-hook-form';
import { ApplicationFormType } from '../applicationForm/schema';

// TODO: redo this component
// type TableProps = {
//     name: string;
//     label: string;
//     register: UseFormRegister<any>;
//     control: Control<any>;
//     fieldKeys: string[];
//     error: FieldError | undefined;
//     optional?: boolean;
//     t: any;
// };
// const Table: FC<TableProps> = ({ label, register, error, optional, control, name, fieldKeys, t }) => {
//     debugger;
//     const { fields, append, remove } = useFieldArray({ control, name });
//     return (
//         <label className="flex flex-col justify-center my-2 w-40 me-5 grow md:max-w-sm text-black">
//             <div className="font-semibold mb-1 ">{label}</div>
//             {fields.map((field, index) => {
//                 const isFirstField = index === 0;
//                 return (
//                     <div className="flex" key={`${field['value']}${index}`}>
//                         {fieldKeys.map((key) => {
//                             return (
//                                 <div>
//                                     <label>{t(`${name}.${key}`)}</label>
//                                     <input defaultValue={field[key]} {...register(`items.${index}.${key}`)} />
//                                 </div>
//                             );
//                         })}
//                         <span onClick={() => (isFirstField ? append({}) : remove(index))}>{isFirstField ? '行を追加' : '削除'}</span>
//                     </div>
//                 );
//             })}
//             <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
//         </label>
//     );
// };
// export default Table;

// type EducationTableProps = {
//     label: string;
//     register: UseFormRegister<ApplicationFormType>;
//     control: Control<ApplicationFormType>;
//     fieldKeys: string[];
//     error?: FieldError | undefined;
//     optional?: boolean;
//     t: any;
// };
// export const EducationTable: FC<EducationTableProps> = ({ label, register, error, optional, control, fieldKeys, t }) => {
//     debugger;
//     const { fields, append, remove } = useFieldArray({ control, name: 'educationTable' });
//     const { getValues, setValue } = useFormContext<ApplicationFormType>();

//     const handleAppend = () => {
//         const currentValues = getValues('educationTable');
//         append({});
//         setValue('educationTable', [...currentValues, {}]);
//     };

//     const handleRemove = (index: number) => {
//         const currentValues = getValues('educationTable');
//         remove(index);
//         setValue(
//             'educationTable',
//             currentValues.filter((_: any, i: number) => i !== index)
//         );
//     };
//     return (
//         <label className="flex flex-col justify-center my-2 w-full text-black">
//             <div className="font-semibold mb-1">{t('educationTable.title')}</div>
//             <div className="mb-1">{t('educationTable.description')}</div>
//             <div className="overflow-x-auto">
//                 <table className="w-full table-auto">
//                     <thead>
//                         <tr>
//                             <th style={{ width: '33%' }}>{t('educationTable.educationSchoolName')}</th>
//                             <th style={{ width: '23%' }}>{t('educationTable.educationDegree')}</th>
//                             <th style={{ width: '10%' }}>{t('educationTable.educationDate')}</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {fields.map((field, index) => {
//                             const isFirstField = index === 0;
//                             return (
//                                 <tr key={field.id}>
//                                     <td>
//                                         <input className="border p-2" {...register(`educationTable.${index}.educationSchoolName`)} />
//                                     </td>
//                                     <td>
//                                         <input className="border p-2" {...register(`educationTable.${index}.educationDegree`)} />
//                                     </td>
//                                     <td>
//                                         <input
//                                             placeholder="DD/MM/YYYY"
//                                             className="border p-2"
//                                             {...register(`educationTable.${index}.educationDate`)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <span onClick={() => (isFirstField ? handleAppend() : handleRemove(index))}>
//                                             {isFirstField ? 'Add' : 'Delete'}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
//         </label>
//     );
// };

// type ServiceTableProps = {
//     name: string;
//     label: string;
//     register: UseFormRegister<any>;
//     control: Control<ApplicationFormType>;
//     fieldKeys: string[];
//     error: FieldError | undefined;
//     optional?: boolean;
//     t: any;
// };
// export const ServiceTable: FC<ServiceTableProps> = ({ label, register, error, optional, control, name, fieldKeys, t }) => {
//     debugger;
//     const { fields, append, remove } = useFieldArray({ control, name });
//     return (
//         <label className="flex flex-col justify-center my-2 w-full overflow-x-auto text-black">
//             <div className="font-semibold mb-1">{t('educationTable.title')}</div>
//             <div className="mb-1">{t('educationTable.description')}</div>
//             <table className="min-w-full">
//                 <thead>
//                     <tr>
//                         <th>{t('educationTable.educationSchoolName')}</th>
//                         <th>{t('educationTable.educationDegree')}</th>
//                         <th>{t('educationTable.educationDate')}</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {fields.map((field, index) => {
//                         const isFirstField = index === 0;
//                         return (
//                             <tr key={`${field['value']}${index}`}>
//                                 <td>
//                                     <input className="border p-2" {...register(`educationTable.${index}.educationSchoolName`)} />
//                                 </td>
//                                 <td>
//                                     <input className="border p-2" {...register(`educationTable.${index}.educationDegree`)} />
//                                 </td>
//                                 <td>
//                                     <input placeholder="DD/MM/YYYY" className="border p-2" {...register(`educationTable.${index}.educationDate`)} />
//                                 </td>
//                                 <td>
//                                     <span onClick={() => (isFirstField ? append({}) : remove(index))}>{isFirstField ? 'Add' : 'Delete'}</span>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
//         </label>
//     );
// };
