const path = require('path');

// Import our Express dependency
const express = require('express');


// Create a new server instance
const app = express();
// Port number we want to use on this server
const PORT = 3000;



// Custom logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};


// Add your code here

// Attach the logger middleware
app.use(logger);

//Attach the express.static middleware to your Express app, designating the static folder as the location for static assets:
app.use(express.static('static'));

const templatesPath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
    res.sendFile(path.join(templatesPath, 'index.html'));
  });
  
app.get('/company/about', (req, res) => {
  res.sendFile(path.join(templatesPath, 'about.html'));
});


app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(templatesPath, '404.html'));
});



// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));



