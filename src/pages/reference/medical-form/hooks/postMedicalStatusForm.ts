type postMedicalStatusFormProps = {
    formData: any;
};
const postMedicalStatusForm: (props: postMedicalStatusFormProps) => any = async ({ formData }) => {
    // if (formData.get('ref') == null) return alert('Something wrong. Could not upload your document. User not found');
    try {
        console.log('formData.get("attachment")', formData.get('attachment'));
        console.log('data', formData);
        // const res = await fetch('/api/reference/postMedicalStatusForm', {
        //     method: 'POST',
        //     body: formData
        // });
        const res = await fetch('/api/reference/uploadFileKintone', {
            method: 'POST',
            body: formData
        });
        console.log(res);
        if (res.ok) {
            return res;
        } else {
            alert('Something wrong. Could not upload your document.');
            return;
        }
    } catch (e) {
        console.log('Error on postMedicalStatusForm', e);
    }
};
export default postMedicalStatusForm;
