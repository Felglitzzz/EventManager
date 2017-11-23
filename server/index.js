import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

//use body parser to parse requests
app.use(bodyParser.json());

//catch-all route
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));

//listen for requests
const port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, (err) =>{
    if (err) console.log(err);
    console.log('listening on port 1991');
});

export default app;