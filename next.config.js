const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
    experimental: {},
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    images: {
        dangerouslyAllowSVG: true,
        domains: ['vercel.com', 'avatars.githubusercontent.com'],
    },
};
