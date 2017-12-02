import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/index';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// use body parser to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Routes
app.use('/api/v1/', router);

// listen for requests
const port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, () => {
  console.log(`Hi there, check me out on http://localhost:${port}`);
});

export default app;
