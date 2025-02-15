'use client';

import { Document, StyleSheet } from '@react-pdf/renderer';

import applicationForm_en from '@/features/common/forms/applicationForm/i18n/translations/en.json';
import common_en from '@/libs/i18n/common/en.json';
import Page1 from './pages/All';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';

type PDFProps = {
    record: REST_VolunteerApplicationForm | null | undefined;
};
export default function PDF(props: PDFProps) {
    //const mockRecord = record.record;
    const record = props.record;
    if (!record) return null;
    const tStore = { ...applicationForm_en, ...common_en };
    const getNestedProperty = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const t = (key: string) => getNestedProperty(tStore, key);
    return (
        <Document>
            <Page1 record={record} />
        </Document>
    );
}

export const characterStrengthsTableStyle = {
    table: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        borderStyle: 'solid',
        marginBottom: 20,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableColumn25: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableRow: {
        margin: '',
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCell20: {
        width: '20%',
        textAlign: 'center',
        textDecoration: 'underline',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        backgroundColor: 'rgb(241,244,255)',
        marginBottom: 5,
        marginRight: 5,
        fontWeight: 'bold'
    },
    tableCell80: {
        width: '80%',
        paddingTop: 5,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'flex-end',
        borderLeftWidth: 0,
        borderTopWidth: 0
    }
} as const;
export const skillInventoryTableStyle = {
    table: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        borderStyle: 'solid',
        marginBottom: 20,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableColumn2: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableRow: {
        margin: '',
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCell20: {
        width: '20%',
        textAlign: 'center',
        textDecoration: 'underline',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        backgroundColor: 'rgb(241,244,255)',
        marginBottom: 5,
        marginRight: 5,
        fontWeight: 'bold'
    },
    tableCell80: {
        width: '80%',
        paddingTop: 5,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'flex-end',
        borderLeftWidth: 0,
        borderTopWidth: 0
    }
} as const;
export const applicationFormPageStyle = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: 'Helvetica'
        // fontFamily: 'NotoSansJP'
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 20,
        color: 'rgb(39,40,115)',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold'
    },
    sectionTitle: {
        fontSize: 14,
        marginTop: 10,
        color: 'rgb(39,40,115)',
        marginBottom: 10,
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Bold'
    },
    row: { marginBottom: 5 },
    details: {
        marginBottom: 30
    },
    underline: {
        textDecoration: 'underline',
        backgroundColor: 'rgb(241,244,255)',
        // padding: 5, // not working
        marginBottom: 30,
        fontWeight: 'bold'
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemsTable: {
        display: 'flex',
        width: 'auto',
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableColHeader3: {
        width: '33%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCol3: {
        width: '33%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },
    tableColHeader4: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCol4: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },
    tableColHeader5: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCol5: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },
    textVertical: {
        flexDirection: 'column'
    },
    company: {
        marginTop: 10
    }
});
