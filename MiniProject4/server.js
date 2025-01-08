const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./src/APIRoutes');
const frontendRoutes = require('./src/frontendRoutes');
const routes = require('./src/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "static" directory
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/static', express.static(path.join(__dirname, 'static')));

// Mount API routes under the /api base route
app.use('/api', apiRoutes);

app.use('/', frontendRoutes);

app.use('/', routes);

// Port number
const PORT = process.env.PORT || 3000;

// Start the app up
app.listen(PORT, () => console.log(`Howler is listening on port ${PORT}`));
