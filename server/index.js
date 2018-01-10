import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack'; // eslint-disable-line
import webpackMiddleware from 'webpack-dev-middleware'; // eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import router from './routes/index';
import config from '../webpack.config.dev';

// Set up the express app
const app = express();
const webpackConfig = webpack(config);

app.use(webpackMiddleware(webpackConfig, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// Log requests to the console.
app.use(logger('dev'));

// use body parser to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Versioning and Routes
app.use('/api/v1/', router);

// send index.html
app.get('/*', (req, res) => res.sendFile(
  path.join(__dirname, '../client/src/index.html')
)); //eslint-disable-line

// listen for requests
const port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, () => {
  console.log(`Hi there, check me out on http://localhost:${port}`);
});

export default app;
