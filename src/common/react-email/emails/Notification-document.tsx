import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text, Hr } from '@react-email/components';
import React, { FC } from 'react';

interface NotificationDocumentProps {
    mailBody?: string;
    applicationRef?: string;
}

export const NotificationDocument: FC<NotificationDocumentProps> = ({ mailBody, applicationRef }) => {
    return (
        <Html>
            <Head></Head>
            <Preview>Go to the record details</Preview>
            <Body
                style={{
                    backgroundColor: '#fcfcfc',
                    fontFamily:
                        "Meiryo, 'Hiragino Kaku Gothic ProN', 'MS PGothic', 'Lucida Grande', 'Lucida Sans Unicode', Arial, Verdana, sans-serif",
                    lineHeight: 1.3,
                    fontSize: '14px',
                    width: '100%',
                    display: 'flex',
                    color: '#666'
                }}
            >
                <div
                    style={{
                        padding: '10px 32px',
                        width: '500px',
                        margin: '0 auto',
                        background: 'url(https://static-y.kintone.com/contents/k/image/ntf/bg_198x198.png) left top repeat'
                    }}
                >
                    <table className="" style={{ width: '100%', justifyContent: 'space-between' }}>
                        <tbody>
                            <tr>
                                <td style={{ alignContent: 'center' }}>
                                    <img
                                        id="gaia-ntfmail-logo-img"
                                        className="w-145 h-26"
                                        src="https://static-y.kintone.com/contents/k/image/ntf/mail-logo/logo_us_20180227.png"
                                        alt="Kintone"
                                    />
                                </td>
                                <td style={{ textAlign: 'end' }}>
                                    <div className="text">Bridges for Peace</div>
                                    <Link href="bfp.kintone.com">bfp.kintone.com</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Hr style={{ borderTop: '1px solid lightgray' }} />

                    <Heading style={{ fontSize: '1rem', marginTop: '2rem' }}>[Kintone] Volunteer Online Application</Heading>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <div style={{ background: 'white', width: '700px', height: '100px', padding: '5%', fontWeight: 'bold' }}>
                            <div style={{ marginBottom: '60px' }}>{mailBody}</div>
                            <Link href={`https://bfp.kintone.com/k/16/show#record=${applicationRef}`}>Go to the record details</Link>
                        </div>
                    </div>
                    <Hr style={{ borderTop: '1px solid lightgray' }} />
                </div>
            </Body>
        </Html>
    );
};

export default NotificationDocument;
