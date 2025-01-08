const express = require('express');

const app = express();
const PORT = 3000;
const expressWs = require('express-ws')(app);
//TODO: WebSockets

// expressWs(app);

const routes = require('./routes');
app.use(routes);

// app.use('/ws', websocketRouter);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));