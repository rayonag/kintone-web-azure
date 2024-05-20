export type Type = 'Long Term' | 'Short Term' | 'Zealous';
export type Status =
    | 'Applying'
    | 'Complete Application Form'
    | 'National Office Review'
    | 'Necessary Documents Submitted'
    | 'SDD Review'
    | 'Accepted'
    | 'Rejected';
export type NationalOffice = 'Australia' | 'Canada' | 'Japan' | 'New Zealand' | 'South Africa' | 'South Korea' | 'United Kingdom' | 'USA' | 'Other';
export type FormSubmission = Partial<['Application Form Completed', 'Personal Health Questionaire']>;
export type Documents = Partial<['Passport', 'Recent Photo', 'Medical Status Form', "Doctor's Letter"]>;
export type DocumentsUS = Partial<
    ['Passport', 'Recent Photo', 'Medical Status Form', "Doctor's Letter", 'Social Security Card', 'Criminal Check', 'Application Fee']
>;
