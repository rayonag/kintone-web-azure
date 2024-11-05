import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const { theme } = this.props.__NEXT_DATA__.props.pageProps;

        return (
            <Html>
                <Head>
                    {theme && (
                        <style>
                            {`
                                :root {
                                    --background-start-rgb: ${theme.startColor};
                                    --background-end-rgb: ${theme.endColor};
                                    --btn-bg-color: ${theme.btnBgColor};
                                    --btn-border-color: ${theme.btnBorderColor};
                                    --btn-hover-bg-color: ${theme.btnHoverBgColor};
                                    --btn-hover-border-color: ${theme.btnHoverBorderColor};
                                }
                            `}
                        </style>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
