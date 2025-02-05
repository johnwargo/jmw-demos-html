/*********************************************************
 * John Wargo's Demos site
 *********************************************************/

(function () {
  console.log("Initializing JavaScript code");
  // Add event listeners
  document.getElementById('btnJSONBody').addEventListener('click', callJSONBody, false);
  document.getElementById('btnCert2Arduino').addEventListener('click', launchCert2Arduino, false);
  document.getElementById('btnGoodreads').addEventListener('click', launchGoodreads, false);
})();

// ********************************************************
// JSON Body Function
// ********************************************************
function callJSONBody(event) {
  const targetHost = 'https://us-east1-jmw-demos.cloudfunctions.net/jsonbody';
  let responseCode;

  event.preventDefault();

  console.log('Calling JSON Body cloud function');

  const param1 = document.getElementById('param1').value.trim();
  const param2 = document.getElementById('param2').value.trim();

  const body = JSON.stringify({param1, param2});
  console.log(`Body: ${body}`);

  const fetchOptions = {
    method: 'POST', // or 'PUT'
    headers: {'Content-Type': 'application/json'},
    body
  }

  fetch(targetHost, fetchOptions)
    .then(response => {
      responseCode = response.status;
      console.log(`Response Code: ${response.status}`);
      console.log(response);
      return response.text();
    })
    .then(text => {
      // Handle the JSON data returned by the server
      console.log(`Response: ${text}`);
      if (responseCode === 200) {
        Swal.fire({
          icon: 'success',
          text: text,
          confirmButtonText: 'Excellent!'
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: text,
          confirmButtonText: 'Try Again'
        });
      }
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        text: error.message,
        confirmButtonText: 'huh?'
      });
    });
}

// ********************************************************
// Cert2Arduino
// ********************************************************
function launchCert2Arduino() {
  console.log('Launching Cert2Arduino');
  window.open('https://cert2arduino.netlify.app/', '_blank');
}

// ********************************************************
// Goodreads Page Adjuster
// ********************************************************
function launchGoodreads() {
  console.log('Launching Goodreads');
  window.open('https://goodreads-page-adjuster.netlify.app/', '_blank');
}
