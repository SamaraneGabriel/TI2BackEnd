/* Webpage (pages outside the app) rendering script
 *
 * Needs to have 'defer' enabled on document
 * Loads common things between webpages
 */

import { generateWebpageHeader } from "../components/WebpageHeader.js";
import { generateFooter } from "../components/Footer.js";

/* Attaches header and footer to page
 *
 * The attachment is done by placing the elements as first and last child
 */
document.addEventListener("DOMContentLoaded", function () {
    const newHeader = document.createElement("header");
    const newFooter = document.createElement("footer");

    // Create content for the new header
    newHeader.innerHTML = generateWebpageHeader();
    document.body.insertBefore(newHeader, document.body.firstElementChild);
    
    newFooter.innerHTML = generateFooter();
    document.body.append(newFooter);

});