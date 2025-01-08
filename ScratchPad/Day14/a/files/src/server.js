const path = require('path');
// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();

app.use(express.static('public'));

const templateFolder = path.join(__dirname, '..', 'templates');

app.get('/', (req, res) => {
  res.sendFile(path.join(templateFolder, 'index.html'));
});

//import the HowlDAO
const HowlDAO = require('./db/HowlDAO');

app.get('/howls', (req, res) => {
  HowlDAO.getHowls()
    .then(howls => {
      res.json(howls);  //respond to our request send array of howls obj as JSON as the body of the file
    });
});

// Port number we want to use on this server
const PORT = 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));