module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'preodemo.gumlet.io',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/challenge/menu",
        destination: "https://cdn-dev.preoday.com/challenge/menu",
      },
    ];
  },
  async headers() {
    return [
      {
        // Define as regras de CORS para a sua aplicação
        source: "/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Ou a origem específica que você deseja permitir
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
