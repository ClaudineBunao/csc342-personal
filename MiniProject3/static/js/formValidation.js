export default function validateForm(event) {
    const form = document.querySelector('form');
    const senderFirstName = form.querySelector('#senderFirstName');
    const senderLastName = form.querySelector('#senderLastName');
    const recipientFirstName = form.querySelector('#recipientFirstName');
    const recipientLastName = form.querySelector('#recipientLastName');
    const myMessage = form.querySelector('#myMessage');
    const notifyMethod = form.querySelector('#notifyMethod');
    const myEmail = form.querySelector('#myEmail');
    const myPhoneNumber = form.querySelector('#myPhoneNumber');
    const myAddress = form.querySelector('#myAddress');
    const myCardNumber = form.querySelector('#myCardNumber');
    const myExpiration = form.querySelector('#myExpiration');
    const myCCV = form.querySelector('#myCCV');
    const myAmount = form.querySelector('#myAmount');
    const myCheckbox = form.querySelector('#myCheckbox');
    const myImage = form.querySelector('#myImage');

    let valid = true;
    let errors = [];
    
    myImage.setCustomValidity("");
    if (!myImage.checkValidity()) {
      errors.push("File size cannot be larger than 200KB.");
      myImage.setCustomValidity("File size cannot be larger than 200KB..");
      valid = false;
    }

    senderFirstName.setCustomValidity("");
    if (!senderFirstName.checkValidity()) {
      errors.push("senderFirstName must exist.");
      senderFirstName.setCustomValidity("Sender's first name must exist.");
      valid = false;
    }
  
    senderLastName.setCustomValidity("");
    if (!senderLastName.checkValidity()) {
      errors.push("senderLastName must exist.");
      senderLastName.setCustomValidity("Sender's last name must exist.");
      valid = false;
    }
  
    recipientFirstName.setCustomValidity("");
    if (!recipientFirstName.checkValidity()) {
      errors.push("recipientFirstName must exist.");
      recipientFirstName.setCustomValidity("Recipient's first name must be filled.");
      valid = false;
    }
    recipientLastName.setCustomValidity("");
    if (!recipientLastName.checkValidity()) {
      errors.push("recipientLastName must exist.");
      recipientLastName.setCustomValidity("Recipient's last name must be filled.");
      valid = false;
    }

    myMessage.setCustomValidity("");
    if (!myMessage.checkValidity()) {
      errors.push("myMessage must be at least 10 characters long.");
      myMessage.setCustomValidity("Message must exist and be at least 10 characters long.");
      valid = false;
    }

    myEmail.setCustomValidity("");
    if (document.getElementById("notifyEmail").checked){
      document.getElementById("notifyEmail").required = true;         

      myEmail.setCustomValidity("");
      if (!myEmail.value || !myEmail.value.includes('@')) {
        errors.push("Email must be valid.");
        myEmail.setCustomValidity("Email must be valid.");
        valid = false;
      }
    }

    if (document.getElementById("notifySMS").checked){
      document.getElementById("notifySMS").attributes["required"] = "";         

      myPhoneNumber.setCustomValidity("");
      if (!myPhoneNumber.value || myPhoneNumber.value.length !== 10 || isNaN(myPhoneNumber.value)) {
        errors.push("Phone number must be exactly 10 digits long.");
        myPhoneNumber.setCustomValidity("Phone number must be exactly 10 digits long.");
        valid = false;
      }
    }

    if (notifyMethod.value === 'mail') {
      
      myAddress.setCustomValidity("");
      if (!myAddress.value || myAddress.value.length < 10) {
        errors.push("Address must exist and be at least 10 characters long.");
        myAddress.setCustomValidity("Address must exist and be at least 10 characters long.");
        valid = false;
      }
    }

    myCardNumber.setCustomValidity("");
    if (!myCardNumber.checkValidity()) {
      errors.push("myCardNumber must be 16 digits long.");
      myCardNumber.setCustomValidity("CardNumber must be 16 digits long.");
      valid = false;
    }
  
    myExpiration.setCustomValidity("");
    if (!myExpiration.checkValidity() || new Date(myExpiration.value) < new Date()) {
      errors.push("myExpiration must be a chosen date that's not expired.");
      myExpiration.setCustomValidity("Expiration must be a chosen date that's not expired.");
      valid = false;
    }
  
    myCCV.setCustomValidity("");
    if (!myCCV.checkValidity()) {
      errors.push("myCCV must be 3-4 digits long.");
      myCCV.setCustomValidity("CCV must be 3-4 digits long.");
      valid = false;
    }
  
    myAmount.setCustomValidity("");
    if (!myAmount.checkValidity()) {
      errors.push("myAmount must be a valid price.");
      myAmount.setCustomValidity("Amount must be a valid price.");
      valid = false;
    }
  
    myCheckbox.setCustomValidity("");
    if (!myCheckbox.checkValidity()) {
      errors.push("You must accept the terms and conditions.");
      myCheckbox.setCustomValidity("You must accept the terms and conditions.");
      valid = false;
    }

    if (!valid) {
      console.log(errors);
      form.reportValidity();
      event.preventDefault();
      return false;

    }
    return true;

  }




  