import getUserApplicationRef from '@/common/getUserApplicationRef';
import { ApplicationTypes } from '@/constants/applicationTypes';
import { NationalOffice } from '@/constants/nationalOffices';
import { create } from 'zustand';

type State = {
    username: string;
    name: string;
    knownAs: string;
    ref: string;
    applicationRef: string;
    returnRef: string;
    documents: string[];
    formSubmission: string[];
    nationalOffice: NationalOffice | null;
    applicationType: ApplicationTypes | null;
};

type Action = {
    initUser: (username: string, ref: string) => void;
    // updateUsername: (username: State['username']) => void;
    // updateName: (name: State['name']) => void;
    // updateRef: (ref: State['ref']) => void;
    // updateApplicationRef: (applicationRef: State['applicationRef']) => void;
    // updateReturnRef: (returnRef: State['returnRef']) => void;
    // updateDocuments: (documents: State['documents']) => void;
    // updateFormSubmission: (formSubmission: State['formSubmission']) => void;
    // updateNationalOffice: (nationalOffice: State['nationalOffice']) => void;
    // updateApplicationType: (applicationType: State['applicationType']) => void;
};

const useUserStore = create<State & Action>((set, get) => ({
    username: '',
    name: '',
    knownAs: '',
    ref: '',
    applicationRef: '',
    returnRef: '',
    documents: [],
    formSubmission: [],
    nationalOffice: null,
    applicationType: null,
    initUser: async (username, ref) => {
        if (!username || !ref) return;
        if (typeof window === 'undefined') return;
        if (get().username) return;
        const res = await fetch('/api/fetchUserKintone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });
        const user = await res.json();
        const userApplicationRef = await getUserApplicationRef({ ref: ref });
        set({
            username: username,
            ref: ref,
            name: user.name,
            knownAs: user.knownAs,
            applicationRef: userApplicationRef || undefined,
            returnRef: user.returnRef,
            documents: user.documents,
            formSubmission: user.formSubmission,
            nationalOffice: user.office as NationalOffice,
            applicationType: user.type
        });
    }
}));

export default useUserStore;
