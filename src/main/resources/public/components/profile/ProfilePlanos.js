import { generateProfileFrame } from "../ProfileFrame.js"

function createPlanosHtml(){
    return (/*html*/`
        <main class="col profileDetails">
            <h2>Plano?</h2>
            <div class="mt-5 vertical-spacer"></div> 
            <p>Booleana: </p>
        </main>
    `)
}

export function createPlanos(){
    let outerHtml = createPlanosHtml();
    return generateProfileFrame(outerHtml);
} 

export const planosDefaultJson = {

}