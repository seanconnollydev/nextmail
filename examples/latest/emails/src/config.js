const isProd = process.env.NODE_ENV === 'production';

export default {
  assetPrefix: isProd ? 'https://nextmail-latest.now.sh' : '',
};
