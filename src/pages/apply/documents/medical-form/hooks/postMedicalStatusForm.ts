import handleCatch from '@/common/handleCatch';

type postMedicalStatusFormProps = {
    formData: any;
    applicationRef: string;
    userRef: string;
};
const postMedicalStatusForm: (props: postMedicalStatusFormProps) => any = async ({ formData, applicationRef, userRef }) => {
    try {
        // upload file to kintone and get filekey
        const res = await fetch('/api/reference/uploadFileKintone', {
            method: 'POST',
            body: formData
        });
        const fileKey = await res.json();
        if (!fileKey) throw new Error('Could not get a fileKey');

        // update kintone record: volunteer application form
        type ReqData = {
            userApplicationRef: string;
            userRef: string;
            field: string;
            fileKey: string;
        };
        const updateBody: ReqData = {
            userApplicationRef: applicationRef,
            userRef: userRef,
            field: 'medicalStatusForm',
            fileKey: fileKey.res
        };
        console.log('updateBody', updateBody);
        const resp = await fetch('/api/reference/updateFileKintone', {
            method: 'POST',
            body: JSON.stringify(updateBody)
        });
        if (res.ok && resp.ok) {
            return res;
        } else {
            alert('Something wrong. Could not upload your document.');
            return;
        }
    } catch (e) {
        handleCatch(e, { formData, applicationRef }, 'postMedicalStatusForm');
    }
};
export default postMedicalStatusForm;
