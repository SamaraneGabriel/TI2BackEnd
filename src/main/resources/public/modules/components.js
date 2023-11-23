///Contains multiple exports based on the components export javascripts
 

/* Checks if a component tag exists and is unique
 *
 * Its considered critical error if those conditions are not met, and alerted at the developer level.
 * Used for headers and footers 
 */
export function checkUniqueExistsComponent(nodeListLength){
    if (nodeListLength === 0) {
        let errorMessage = "Critical: unique essencial placeholder missing!";
        alert(errorMessage);
        console.error(errorMessage);
    } else if (nodeListLength > 1) {
        let errorMessage = "Critical: more than one unique placeholder!"
        alert(errorMessage);
        console.error(errorMessage);
    }
}
