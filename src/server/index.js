// Dependencies
import express from 'express';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

// API
import api from './api';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true';


// Webpack Configuration
import webpackConfig from '../../webpack.config';

// Express app
const app = express();
const compiler = webpack(webpackConfig);
const port = process.env.NODE_PORT || 3000;

// Gzip Compression
if (!isDevelopment) {
  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');

    next();
  });
}

// Public static
app.use(express.static(path.join(__dirname, '../../public')));

// API Middleware
app.use('/api', api);

if (isDevelopment) {
  // Hot Module Replacement
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler));
} else {
  try {
    const serverRender = require('../../dist/server.js').default;

    app.use(serverRender());
  } catch (e) {
    throw e;
  }
}

// Listening
app.listen(port, err => {
  if (!err && isAnalyzer) {
    open(`http://localhost:${port}`);
  }
});
