import { NationalOffice } from '@/constants/nationalOffices';
import { create } from 'zustand';

type State = {
    username: string;
    name: string;
    ref: string;
    applicationRef: string;
    returnRef: string;
    documents: string[];
    formSubmission: string[];
    nationalOffice: NationalOffice | null;
    applicationType: string;
};

type Action = {
    initUser: () => void;
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
    ref: '',
    applicationRef: '',
    returnRef: '',
    documents: [],
    formSubmission: [],
    nationalOffice: null,
    applicationType: '',
    initUser: async () => {
        if (typeof window === 'undefined') return;
        if (get().username) return;
        set({ username: 'Raymond' });
        // const response = await fetch('/api/user');
        // const data = await response.json();
        // set(data);
    }
    // updateUsername: (username) => set({ username }),
    // updateName: (name) => set({ name }),
    // updateRef: (ref) => set({ ref }),
    // updateApplicationRef: (applicationRef) => set({ applicationRef }),
    // updateReturnRef: (returnRef) => set({ returnRef }),
    // updateDocuments: (documents) => set({ documents }),
    // updateFormSubmission: (formSubmission) => set({ formSubmission }),
    // updateNationalOffice: (nationalOffice) => set({ nationalOffice }),
    // updateApplicationType: (applicationType) => set({ applicationType
}));

export default useUserStore;
