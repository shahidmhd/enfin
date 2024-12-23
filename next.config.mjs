/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REDIS_CONNECTION_URL: process.env.REDIS_CONNECTION_URL,
    },
};

export default nextConfig;
