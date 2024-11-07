/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
    default-src 'self' http://localhost:3000/;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    object-src 'none';
    frame-src 'self' blob:;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    ${isDev ? "img-src 'self' data: http://localhost:3000/;" : "img-src 'self' data: "}
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
