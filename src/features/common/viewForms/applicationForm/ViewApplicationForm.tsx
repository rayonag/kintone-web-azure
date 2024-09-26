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
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 'bold',
        padding: 5
    },
    tableCol: {
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

const data = [
    {
        title: '発注日',
        value: '2024/4/01',
        items: [
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            },
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            },
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            },
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            },
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            },
            {
                name: 'サンプル1',
                surface: '1',
                thickness: '式',
                width: '10,000',
                length: '10,000'
            }
        ]
    }
];
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
            {/* <Page style={styles.page} size="A4">
                <View>
                    <Text style={styles.header}>VOLUNTEER APPLICATION FORM</Text>
                </View>
                <View style={styles.details}>
                    {ApplicationFormFields[1].map((field, index) => (
                        <View style={styles.detailItem} key={index}>
                            <View style={styles.textVertical}>
                                <Text>{t(field) || ''}</Text>
                                <Text>{mockRecord[field]?.value}</Text>
                            </View>
                        </View>
                    ))}
                    {data.map((detail, index) => (
                        <View style={styles.detailItem} key={index}>
                            <View style={styles.textVertical}>
                                <Text>株式会社〇〇</Text>
                                <Text>〇〇 御中</Text>
                            </View>
                            <View>
                                <Text>発行日{detail.value}</Text>
                                <View style={styles.company}>
                                    <Text>株式会社〇〇</Text>
                                    <Text>東京都〇〇〇〇〇〇〇〇〇〇</Text>
                                    <Text>TEL：00-0000-0000</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <View>
                    <View style={styles.itemsTable}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>概要</Text>
                            <Text style={styles.tableColHeader}>数量</Text>
                            <Text style={styles.tableColHeader}>単位</Text>
                            <Text style={styles.tableColHeader}>単価</Text>
                            <Text style={styles.tableColHeader}>金額</Text>
                        </View>
                        {data[0].items.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCol}>{item.name}</Text>
                                <Text style={styles.tableCol}>{item.surface}</Text>
                                <Text style={styles.tableCol}>{item.thickness}</Text>
                                <Text style={styles.tableCol}>{item.width}</Text>
                                <Text style={styles.tableCol}>{item.length}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page> */}
        </Document>
    );
}
