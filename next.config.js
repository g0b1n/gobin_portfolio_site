/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true, // ✅ Keep React Strict Mode enabled
};

module.exports = withBundleAnalyzer(nextConfig);
