'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { record } from '../mockRecord';
import { ApplicationFormFields } from '../../forms/applicationForm/schema';

import applicationForm_en from '@/features/common/forms/applicationForm/i18n/translations/en.json';
import common_en from '@/libs/i18n/common/en.json';
import Page1 from './pages/Page1';

// Font.register({
//     family: 'NotoSansJP',
//     fonts: [
//         {
//             src: '../fonts/NotoSansJP-Regular.ttf'
//         },
//         {
//             src: '../fonts/NotoSansJP-Bold.ttf',
//             fontWeight: 'bold'
//         }
//     ]
// });

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

export default function PDF() {
    const mockRecord = record.record;
    const tStore = { ...applicationForm_en, ...common_en };
    const getNestedProperty = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const t = (key: string) => getNestedProperty(tStore, key);
    console.log('t', t);
    console.log('t(firstName)', t('firstName'));
    return (
        <Document>
            <Page1 record={mockRecord} />
        </Document>
    );
}
