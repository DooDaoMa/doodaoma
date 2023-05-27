/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doodaoma-images.s3.ap-southeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'widgets.astronomyapi.com',
      },
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
      },
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
      },
    ],
  },
}

module.exports = nextConfig
