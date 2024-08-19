(function () {
    const radioFieldCode = [
        'sex',
        'maritalStatus',
        'hasFamilySupport',
        'healthCondition',
        'hasIllness',
        'hasHandicap',
        'doesSmoke',
        'canLift',
        'ifNoPosition',
        'hasDriverLicense',
        'hasLicenseMoreThanTwelveMonths',
        'hasConvictedCrime',
        'hasVisitedIsrael',
        'heavyDutyLicense',
        'hasFriendsInIsrael'
    ];
    const tableCodes = {
        Table: ['educationDegree', 'educationSchoolName', 'educationDate'],
        Table_2: ['serviceOrganizationName', 'serviceStartDate', 'serviceEndDate', 'serviceDuties']
    };
    fb.events.form.created = [
        function (state) {
            // get param from url
            const urlParams = new URLSearchParams(window.location.search);
            Object.keys(tableCodes).forEach((tableCode) => {
                //debugger;
                const tableValue = [];
                // repeat 10 times
                for (let i = 0; i <= 10; i++) {
                    const tableRowValue = {};
                    let value = '';
                    tableCodes[tableCode].forEach((code) => {
                        const param = `${tableCode}-${i}-${code}`;
                        value = urlParams.get(param);
                        tableRowValue[code] = { value: value || '' };
                    });
                    // TODO: better validation to continue
                    if (!tableRowValue[tableCodes[tableCode][0]].value) continue;
                    console.log('tableRowValue', tableRowValue);
                    tableValue.push({ value: tableRowValue });
                }
                console.log('tableValue', tableValue);
                state.record[tableCode].value = tableValue;
            });
            // return if prefilled form is loaded
            if (state.record['firstName'].value) return state;
            // else set default values for radio fields
            radioFieldCode.forEach(function (fieldCode) {
                state.record[fieldCode].value = '';
            });
            return state;
        }
    ];
    // fb.events.form.mounted = [
    // ];
    // fb.events.form.submit = [
    //     function (state) {
    //         return state;
    //     }
    // ];
    fb.events.finish.created = [
        function (state) {
            postMessage(state);
            return state;
        }
    ];
    // fb.events.finish.mounted = [
    // ];
    // fb.events.step.back = [
    // ];
    // fb.events.step.next = [
    // ];
})();

const postMessage = (state) => {
    const jsonmessage = JSON.stringify(state);
    window.parent.postMessage(jsonmessage, '*');
};

//formbridge
