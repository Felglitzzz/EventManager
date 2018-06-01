import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import winston from 'winston';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index';
import swaggerDoc from './swagger.json';

require('dotenv').config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


// use body parser to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Versioning and Routes
app.use('/api/v1/', router);

// send index.html
app.use('/', express.static('dist-client'));
app.use('*', express.static('dist-client'));

// create my logger

export const log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// listen for requests
const port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, () => {
  log.info(`Hi there, magic happens on http://localhost:${port}`);
});

export default app;
