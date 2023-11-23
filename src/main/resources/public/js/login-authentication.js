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
const usernameElement = document.getElementById('email');
const passwordElement = document.getElementById('password');

if (form || usernameElement || passwordElement == null) {
    console.error("One of the static essential components missing!")
}


form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    

    const usernameInput = usernameElement.value;
    const passwordInput = passwordElement.value;
    if (usernameInput.trim() !== '' || passwordInput.trim() !== ''){
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
        username: usernameInput,
        password: passwordInput
    };

    console.log("data sent to server:" + JSON.stringify(serverRequestData));

    fetch('/auth', {
        method: "POST",
        body: JSON.stringify(serverRequestData),
        headers: {
            //specify its a json being sent
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status == 401) { //expected unauthorized response
                alert("Incorrect user or password");
                return;
            } else if (!response.ok) { //unexpected error responses, incluiding couldnt reach server
                throw new Error('API request failed with status ' + response.status);
            }
            return response.json();
        })
        .then(json => {
			console.log ('Token: ' + JSON.stringify(json, null, 2));
            storeNewToken(json)
            
            //the token was supposed to be encrypted and thus this is not the ideal code
            storeNewUserData(json.payload.name, json.payload.sub);
            window.location.href = nextPageHtml;
        })
        .catch(error => {
			console.log(error);
        })
}


