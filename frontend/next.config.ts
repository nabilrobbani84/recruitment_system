import path from 'path';
import { Configuration } from 'webpack';

module.exports = {
  webpack: (config: Configuration) => {
    config.resolve.alias['@app'] = path.resolve(__dirname, 'src/app');
    return config;
  },
};
