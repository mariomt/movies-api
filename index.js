const express = require('express');
const app = express();
const { config } = require('./config');
const moviesApi = require('./routes/movies.js');

const { 
  logErrors, 
  wrapErrors, 
  errorHandler 
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// bodyparser
app.use(express.json());

moviesApi(app);

// Catch 404 error
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port,()=>{
  console.log('listenig http://localhost:'+config.port);
})