const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
// const upload = multer({ dest: '../uploads/' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

// const templateFolder = path.join(__dirname, '..', '..', 'templates');

const templatesPath = path.join(__dirname, 'templates');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
  res.sendFile(path.join(templatesPath, 'form.html'));
});


app.post('/send', upload.single('myImage'), (req, res) => {
// console.log(req.body);
//notifyEmail, notifySMS, notifyNone, 
  const { senderFirstName, senderLastName, recipientFirstName, recipientLastName, myMessage, notifyMethod, myEmail, myPhoneNumber, myCardNumber, myExpiration, myCCV, myAmount, myCheckbox, myImage } = req.body;
  const fullName = `${recipientFirstName} ${recipientLastName}`;
  // console.log(`method: ${notifyMethod}`);

  // console.log(`Received full name: ${fullName}`);
  // console.log(`Received first name: ${recipientFirstName}`);
  // console.log(`Received last name: ${recipientLastName}`);
  // console.log(`Constructed full name: ${fullName.toLowerCase()}`);

  if (fullName.toLowerCase() === 'stuart dent' || fullName.toLowerCase() === 'stu dent') {
    console.log('Redirecting to error.html');
    return errorRes(res);
  } 

  const errors = {};
  if (!senderFirstName) {
    errors.senderFirstName = 'Sender\'s first name must exist.';
  }
  if (!senderLastName) {
    errors.senderLastName = 'Sender\'s last name must exist.';
  }
  if (!recipientFirstName) {
    errors.recipientFirstName = 'Recipient\'s first name must exist.';
  }
  if (!recipientLastName) {
    errors.recipientLastName = 'Recipient\'s last name must exist.';
  }
  if (!myMessage || myMessage.length < 10) {
    errors.myMessage = 'Message must exist and be at least 10 characters long.';
  }
  //The email field is optional unless "Notify recipient" is set to "Email"
  if(notifyMethod === 'email' && (!myEmail || !myEmail.includes('@'))) {
    errors.myEmail = 'Email must be valid.';
  }
  if (notifyMethod === 'sms' && (!myPhoneNumber || myPhoneNumber.length !== 10 || isNaN(myPhoneNumber))) {
    errors.myPhoneNumber = 'Phone number must be exactly 10 digits long.';
  }
  
  if (!myCardNumber || myCardNumber.length !== 16 || isNaN(myCardNumber)) {
    errors.myCardNumber = 'Card number must be exactly 16 digits long.';
  }

  //myExpiration must not be expired
  const today = new Date();
  const [month, year] = myExpiration.split('/');
  const expirationDate = new Date(`20${year}`, month - 1);
  
  if (!myExpiration || expirationDate < today) {
    errors.myExpiration = 'Expiration must be a chosen date that\'s not expired.';
  }

  if (!myCCV || (myCCV.length !== 3 && myCCV.length !== 4)|| isNaN(myCCV)) {
    errors.myCCV = 'CCV must be 3-4 digits long.';
  }
  if (!myAmount || isNaN(myAmount)) {
    errors.myAmount = 'Amount must be a number.';
  }
  if (!myCheckbox) {
    errors.myCheckbox = 'Checkbox must be checked.';
  }

  //The image file cannot be larger than 200kb
  if (req.file && req.file.size > 200000) {
    errors.myImage = 'File size cannot be larger than 200KB.';
  } 
  
  // console.log(req.body);
  // console.log(req.file);
  // res.sendFile(path.join(templatesPath, 'received.html'));
  
  
  // console.log(errors);
  // if (Object.keys(errors).length > 0) {
  //   return errorRes(res);
  // }
  // console.log("errors: " + Object.keys(errors).length);
if (Object.keys(errors).length === 0) {
    return successRes(res);
  }
  // return successRes(res);
  return;
  // const validateRegistration = require('./formValidation');

  // if (!validateRegistration(req.body)){
  //   console.log("error");
  //   res.status(400).sendFile(path.join(templateFolder, 'error.html'))
  // } else {
  //   console.log("success");
  //   res.sendFile(path.join(templateFolder, 'success.html'))
  // }
});


const successRes = (res) => {
  console.log('Redirecting to success.html');
  res.sendFile(path.join(templatesPath, 'success.html'), (err) => {
    if (err) {
      console.error('Error sending success.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
};

const errorRes = (res) => {
  res.sendFile(path.join(templatesPath, 'error.html'), (err) => {
    if (err) {
      console.error('Error sending error.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
