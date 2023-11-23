/* Html head
 *
 * Common attributes between all heads are placed here.
 * Absolute paths are used
 */

//external css
const bootstrapCSS = document.createElement("link");
bootstrapCSS.href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
bootstrapCSS.rel="stylesheet";
bootstrapCSS.integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN";
bootstrapCSS.crossOrigin="anonymous";
document.head.appendChild(bootstrapCSS);

const fontawesomeCSS = document.createElement("link");
fontawesomeCSS.href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css";
fontawesomeCSS.rel="stylesheet";
document.head.appendChild(fontawesomeCSS);

// Included script here as its likely essential for the css to get aproved
const fontawesomeJS = document.createElement("script");
fontawesomeJS.src = "https://kit.fontawesome.com/16c1a556ea.js";
fontawesomeJS.crossOrigin = "anonymous";
document.head.appendChild(fontawesomeJS);

//----------------------------------------------------------------------------------------
// External js
const bootstr1 = document.createElement("script");
bootstr1.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"; 
bootstr1.integrity = "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL";
bootstr1.crossOrigin = "anonymous";
bootstr1.defer = true;
document.head.appendChild(bootstr1);

const popperjs = document.createElement("script");
popperjs.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"; 
popperjs.integrity = "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r";
popperjs.crossOrigin = "anonymous";
popperjs.defer = true;
document.head.appendChild(popperjs);
