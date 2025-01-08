const path = require("path");

// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();
// Port number we want to use on this server
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const templatesPath = path.join(__dirname, "templates");

app.get('/', (req, res) => {
    res.sendFile(path.join(templatesPath, 'form.html'));
});

app.get('/submit/get', (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(templatesPath, 'received.html'));
});

app.post('/submit/post/url', (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(templatesPath, 'received.html'));
});

app.post('/submit/post/multipart', upload.none(), (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(templatesPath, 'received.html'));
});

app.post('/submit/post/file', upload.single('myfile'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.sendFile(path.join(templatesPath, 'received.html'));
});

// Handle file uploads
app.post('/submit/post/files', upload.fields([
    {name: 'myfile1'},
    {name: 'myfile2'}
    ]), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.sendFile(path.join(templatesPath, 'received.html'));
  });

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));