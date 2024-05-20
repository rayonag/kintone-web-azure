export const NationalOffices = [
    'Australia',
    'Canada',
    'Japan',
    'New Zealand',
    'South Africa',
    'South Korea',
    'United Kingdom',
    'USA',
    'Other'
] as const;
export type NationalOffice = (typeof NationalOffices)[number];
