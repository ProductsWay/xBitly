const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
    experimental: {
        // https://nextjs.org/blog/next-12-2#edge-server-rendering-experimental
        runtime: 'experimental-edge',
    },
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    images: {
        dangerouslyAllowSVG: true,
        domains: ['vercel.com', 'avatars.githubusercontent.com'],
    },
};
