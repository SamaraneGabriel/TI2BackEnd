/* Use a <forms> input field to send login information to server through a fetch, then
 * handle response accordingly. User tokens are used to confirm that the user is already logged
 * 
 * Token is only supposed to be used to indicate valid login, and must be sent whole.
 * For bare minimum of security, the token must contain a level of encryption  of which the server
 * is aware of. However the implementation was not added to this prototype
 * 
 * Expects form to contain id values:
 * 'username' for username input
 * 'password' for password input
 * 'loginForm' for the form that holds the inputs
 */

import { storeDefaultToken } from "../modules/auth-token.js";
import { storeNewToken } from "../modules/auth-token.js";

import { storeNewUserData } from "../modules/user-data.js";
import { storeDefaultUserData } from "../modules/user-data.js";

import { isLoggedIn } from "../modules/auth-token.js";
import htmlPages from "../modules/htmlPaths.js"


const nextPageHtml = htmlPages.homepage;
const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    

    const usernameInput =  document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    if (usernameInput.trim() !== '' || passwordInput.trim() !== ''){
		console.log("senha = " + passwordInput + "email = " + usernameInput); 	
        sendAuth(usernameInput, passwordInput);
    } 
})

/* Sends authentication request as JSON, and expects the token to be returned
 *
 * The JSON sent includes only username and password input. Its currently not encrypted
 * The JSON received includes a general structure of a authentication token, however, most of the
 * implementation was not used in any way
 * 
 * @param: usernameInput, user typed on form input
 * @param: passwordInput, password typed on form input
 * @return: void
 */
function sendAuth(usernameInput, passwordInput) {
    const serverRequestData = {
        email: usernameInput,
        password: passwordInput
    };
    
    console.log(serverRequestData.email);
    console.log(serverRequestData.password);

    fetch('/auth', {
        method: "POST",
        body: JSON.stringify(serverRequestData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (response.status === 401) { //expected unauthorized response
            throw new Error ("Unauthorized");

        } else if (!response.ok) { //unexpected error responses, incluiding couldnt reach server
            throw new Error('API request failed with status ' + response.status);
        }
        return response.json();
    })
    .then(json => {
        console.log ('Token: ' + JSON.stringify(json, null, 2));
        if (json) {
            console.log('Autenticação bem-sucedida: ' + JSON.stringify(json));
            storeNewUserData(json.userName, json.userId);
            storeNewToken(json)
            window.location.href = nextPageHtml;
        }
    })
    .catch(error => {
        console.error(error);
        if (error.message === 'Unauthorized'){
            alert('Incorrect user or password');
        } else {
            alert('couldnt reach server. Using test user');
            storeDefaultToken();
            storeDefaultUserData();
            window.location.href = nextPageHtml;
        }
    })
}



