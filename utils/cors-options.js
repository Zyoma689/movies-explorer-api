const corsOptions = {
  origin: [
    'http://movies.ivart.nomoredomains.club',
    'https://api.movies.ivart.nomoredomains.club',
    'http://api.movies.ivart.nomoredomains.club',
    'https://api.movies.ivart.nomoredomains.club',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};

module.exports = corsOptions;
