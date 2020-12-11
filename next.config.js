module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });
        return config
    },
    async redirects() {
        return [
            {
                source: '/admin',
                destination: 'https://busrides.ghost.io/ghost',
                permanent: true,
            },
            {
                source: '/en/about',
                destination: '/en/en-about',
                permanent: true,
            }
        ]
    }
}