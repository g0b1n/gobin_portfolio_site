/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    // enables the analyzer only when ANALYZE env variable is et to 'true'
    enabled: process.env.ANALYZE === 'true'
})
const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
