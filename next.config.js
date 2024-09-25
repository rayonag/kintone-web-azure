/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self' https://f62c12b3.form.kintoneapp.com/;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    object-src 'none';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
const nextConfig = {
    reactStrictMode: true, // false for Vara.js double render issue
    output: 'standalone',
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, '')
                    }
                ]
            }
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.bridgesforpeace.com',
                port: '',
                pathname: '/wp-content/themes/bridges4peace/images/logo.jpg'
            }
        ]
    }
};

module.exports = nextConfig;
