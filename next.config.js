const securityHeaders = [
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000'
    }
]

module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });
        return config
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes.
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/admin',
                destination: 'https://busrides.ghost.io/ghost',
                permanent: true,
            },
            {
                source: '/rss',
                destination: 'https://busrides.ghost.io/rss',
                permanent: true,
            },
            {
                source: '/fr/rss',
                destination: 'https://busrides.ghost.io/fr/rss',
                permanent: true,
            },
            {
                source: '/en/about',
                destination: '/en/en-about',
                permanent: true,
            },
            {
                source: '/fr/about',
                destination: '/fr/fr-about',
                permanent: true,
            }
        ]
    }
}
