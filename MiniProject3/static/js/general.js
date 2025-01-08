import validateForm from './formValidation.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const radioButtons = document.querySelectorAll('input[name="notifyMethod"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', toggleContactFields);
    });
    toggleContactFields(); // Initialize the email field state


    const expirationInput = document.getElementById('myExpiration');
    const today = new Date().toISOString().split('T')[0];
    expirationInput.setAttribute('min', today);

    const myImage = document.getElementById('myImage');
    const previewImage = document.getElementById('previewImage');

    function previewSelectedImage() {
      const file = myImage.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    myImage.addEventListener('change', previewSelectedImage);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate the form
      if (!validateFileSize() || !validateForm(e)) {
        return;
      }

      // Submit the form
      const formData = new FormData(form);
      fetch('send', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert('Form submitted successfully!');
        })
        // .catch(error => {
        //   console.error('Error:', error);
        //   alert('An error occurred while submitting the form.');
        // });
    });
    console.log(form);
  });

  function validateFileSize() {
    const fileInput = document.getElementById('myImage');
    const file = fileInput.files[0];
    const maxSize = 200 * 1024; // 200KB in bytes

    if (file && file.size > maxSize) {
      alert('File size cannot be larger than 200KB.');
      fileInput.value = ''; // Clear the file input
      return false;
    }
    return true;
  }

  function toggleContactFields() {
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const emailNotify = document.getElementById('emailNotify');
    const phoneNotify = document.getElementById('phoneNotify');


    if (emailNotify && emailNotify.checked) {
      emailField.disabled = false;
      phoneField.disabled = true;
    } else if (phoneNotify && phoneNotify.checked) {
      emailField.disabled = true;
      phoneField.disabled = false;
    }
  }

  
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('/send', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.text(); // Expect HTML response
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(html => {
    document.open();
    document.write(html);
    document.close();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});