export interface VolunteerApplicationMaster {
    year: kintone.fieldTypes.SingleLineText;
    office: kintone.fieldTypes.DropDown;
    password: kintone.fieldTypes.SingleLineText;
    email: kintone.fieldTypes.SingleLineText;
    commentNationalOffice: kintone.fieldTypes.MultiLineText;
    commentIsraelOffice: kintone.fieldTypes.MultiLineText;
    month: kintone.fieldTypes.DropDown;
    name: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.DropDown;

    documents: kintone.fieldTypes.CheckBox;
    documentsUSA: kintone.fieldTypes.CheckBox;
    reviewAbout: kintone.fieldTypes.CheckBox;
    checkList: kintone.fieldTypes.CheckBox;
    reviewFaq: kintone.fieldTypes.CheckBox;
    User_selection: kintone.fieldTypes.UserSelect;
}
export interface SavedVolunteerApplicationMaster extends VolunteerApplicationMaster {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    Updated_by: kintone.fieldTypes.Modifier;
    Created_by: kintone.fieldTypes.Creator;
    ref: kintone.fieldTypes.RecordNumber;
    Created_datetime: kintone.fieldTypes.CreatedTime;
    Updated_datetime: kintone.fieldTypes.UpdatedTime;
}
import { KintoneRecordField } from '@kintone/rest-api-client';
export type REST_VolunteerApplicationMaster = {
    year: KintoneRecordField.SingleLineText;
    office: KintoneRecordField.DropDown;
    password: KintoneRecordField.SingleLineText;
    email: KintoneRecordField.SingleLineText;
    commentNationalOffice: KintoneRecordField.MultiLineText;
    commentIsraelOffice: KintoneRecordField.MultiLineText;
    month: KintoneRecordField.DropDown;
    name: KintoneRecordField.SingleLineText;
    status: KintoneRecordField.DropDown;

    documents: KintoneRecordField.CheckBox;
    documentsUSA: KintoneRecordField.CheckBox;
    reviewAbout: KintoneRecordField.CheckBox;
    checkList: KintoneRecordField.CheckBox;
    reviewFaq: KintoneRecordField.CheckBox;
    User_selection: KintoneRecordField.UserSelect;
};
export type REST_SavedVolunteerApplicationMaster = REST_VolunteerApplicationMaster & {
    $id: KintoneRecordField.Id;
    $revision: KintoneRecordField.Revision;
    Updated_by: KintoneRecordField.Modifier;
    Created_by: KintoneRecordField.Creator;
    ref: KintoneRecordField.RecordNumber;
    Created_datetime: KintoneRecordField.CreatedTime;
    Updated_datetime: KintoneRecordField.UpdatedTime;
};