**Javascript module scripts:**

Exported functions and variables are those that can be acessed by other scripts with import:

*module.js*
export const myVariable = 42;
export function myFunction(content) {return `<div>${content}</div>`;}

*script.js*
import { myVariable, myFunction } from './html-generator.js';\
const num = myVariable
const html = myFunction(10);

Script not only has acess to the scripts from module.js after import, but can send parameters.
In this case html receive "<div>10</div>" after the function call

On the html file, the scripts that import the modules need to have their type set to module:
<script type="module" src="name.js"></script>

Note that this will automatically set them function asynchronously. If you need for a script to execute
before executing another, you might need to use 'async' to wait until that function is complete
