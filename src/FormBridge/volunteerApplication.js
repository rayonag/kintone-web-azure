(function () {
    // fb.events.form.created = [
    // ];
    // fb.events.form.mounted = [
    // ];
    fb.events.form.submit = [
        function (state) {
            postMessage(state);
            return state;
        }
    ];
    // fb.events.finish.created = [
    //     function (state) {
    //         return state;
    //     }
    // ];
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
