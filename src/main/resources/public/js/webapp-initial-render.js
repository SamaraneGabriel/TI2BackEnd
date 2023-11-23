/* App pages rendering script
 * Loads initial common things between all webapp pages (pages after user logs in)
 */


import { generateAppHeader } from "../components/AppHeader.js";
import { generateFooter} from "../components/Footer.js";
import { clearUserData } from "../modules/user-data.js";
import { clearUserToken } from "../modules/auth-token.js";
import htmlPages from "../modules/htmlPaths.js";

document.addEventListener("DOMContentLoaded", function () {
    const newHeader = document.createElement("header");
    const newFooter = document.createElement("footer");

    newHeader.innerHTML = generateAppHeader();
    const exitButton = newHeader.querySelector('.exit-button');  
    exitButton.addEventListener('click', () => {
        alert('test')
        clearUserData();
        clearUserToken();
        window.location = htmlPages.index;

    });
    document.body.insertBefore(newHeader, document.body.firstElementChild);
    
    newFooter.innerHTML = generateFooter();
    document.body.append(newFooter);

});