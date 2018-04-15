import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/index';

require('dotenv').config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// use body parser to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Versioning and Routes
app.use('/api/v1/', router);

// send index.html
app.use('/', express.static('dist-client'));
app.use('*', express.static('dist-client'));

// listen for requests
const port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, () => {
  console.log(`Hi there, magic happens on http://localhost:${port}`);
});

export default app;
