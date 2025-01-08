const express = require('express');
const app = express();

//import from routes file
const routes = require('./routes');

//attach routes to express application
app.use(routes);

// Port number we want to use on this server
const PORT = 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));