// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

export default () => {
  if (isDevelopment) {
    return 'eval';
  } if (!isDevelopment) {
    return 'nosources-source-map';
  }
};
