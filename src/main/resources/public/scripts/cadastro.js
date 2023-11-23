
//CONSTS
const sessionStorageName = 'userData';
const nextPageHtml = '/outras/telainicial.html';

//STATIC GLOBAL ELEMENTS
const form = document.getElementById('cadastro-form');
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const nameInput = nameElement.value;
    const passwordInput = passwordElement.value;

    console.log(nameInput.trim());
    if (nameInput.trim() !== '' || passwordInput.trim() !== ''){
        sendAuth(nameInput, passwordInput);
    } 
})

function sendAuth() {
    //to keep consistency we will send a JSON instead of FORM DATA, 
    //although the code for formData is still here for use
    /*const serverRequestData = new FormData(form);*/

    //for security purposes it might be better do encrypt the data before sending
    const serverRequestData = {
        name: nameElement.value,
        email: emailElement.value,
        password: passwordElement.value
    };
    
    console.log(serverRequestData);
    //authentification will be done with a 'POST' and auth token.
    //a lot of the typical JWT is not being used for now so its 100% non secure
    //and serves only as prototype
    fetch('/cadastro-user', {
        method: "POST", // You can use GET or POST, depending on your server's implementation.
        body: JSON.stringify(serverRequestData),
        headers: {
            "Content-Type": "application/json"
            //for form body there is no need for Content-Type header
        }
    })
        .then(response => {
            console.log(response.status);
            switch (response.status){
                case 200: //sucessful
                    alert("Sucessfuly created new account");
                    window.location.href = '/index.html';
                    break;
                case 401: //expected unathorized response
                    alert("Login already exists");
                    break;
                default: 
                    console.error("Updated: message might have been sent, but the server cant send response back");    

            }
        })
}

