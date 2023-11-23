///DEFINED CONSTANTS
const defaultJson = {
    //type -> type is a placeholder for future use of other types of exercices if needed
    //for alternatives correct holds values 1 -> 5
    title: 'Placeholder 1', 
    text: 'my description is this', 
    type: 0, 
    alternatives: [
        "alternative1", "alternative2", "alternative3", "alternative4", "alternative5"
    ],
    correct: '1'
}
const userLocalStorageName = 'userData';

///GLOBAL METHODS
function getUserLocalStorage(){
    const existingLS = localStorage.getItem(userLocalStorageName);
    if (existingLS == null) console.error('Couldnt access LocalStorage data')

    let ss_Json;
    try {
         ss_Json = JSON.parse(existingLS);
    } catch(e) {console.error('Couldnt access LocalStorage as JSON');}

    console.log(ss_Json)
    return ss_Json;
}

///START FOR GLOBALS
//Url has as parameters current trilha and difficulty. 
    //UserId is gotten from the ss

const userLS = getUserLocalStorage();
const sub = userLS.payload.sub; //get unique key user from JSON
if (sub == null || sub == '') console.error('Couldnt access user key');  

///LOCAL START
fetchNewExercise(); //fetch new as soon as page starts

//------------------------------------------------------------------------------------------
///FETCH GET
function fetchNewExercise() {   
    //This fetch will only accept exercicios that use alternativas for now
    //There are also no dividers for filtering (completed) or (not completed) 
        //and the code is default to the 2nd

    fetch(`/exercicios?user=${sub}`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) throw new Error('API request failed with status ' + response);
            return response.json();
        })
        .then(datajson => {
            console.log(datajson);
            if (datajson === null) throw new Error('JSON is null');

            if (!('title' in datajson)) throw new Error('Failure in atribute (title) on Exercicio JSON');
            if (!('type' in datajson)) throw new Error('Failure in atribute (type) on Exercicio JSON');
            if (!('text' in datajson)) throw new Error('Failure in atribute (text) on Exercicio JSON');
            if (!('correct' in datajson)) throw new Error('Failure in atribute (correct) on Exercicio JSON');

            //Handle invalid values
            if (datajson.type != 0) throw new Error('Script doesnt support other types aside from 0');
            
            if (datajson.type == 0 && datajson.alternatives.length > 5) 
            throw new Error('Amount of alternatives exceeds maximum size of 5 for type = 0');
            
            if (datajson.type == 0 && datajson.correct <= 0 || datajson.correct > 5) 
            throw new Error('Incorrect correct alternative range for type = 0');

            updateExercicios(datajson);
        })
        .catch(error => {
            console.error('exerciciosLoader.js error:\n', error + '\n' + 'getting default values');
            if (defaultJson){ //reserved for if function starts receiving default as param
                updateExercicios(defaultJson);
            }
        });
}

///FETCH POST
function fetchPost() {
    console.log("url fetch value specifier: "+urlValue); //debug results

    fetch('/acerto', ({
        method: "POST", // You can use GET or POST, depending on your server's implementation.
        body: JSON.stringify(serverRequestData),
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(response => {
            if (!response.ok) throw new Error('API request failed with status ' + response);
            return response.json();
        })
        .then(datajson => {
            console.log(datajson);

            if (!('title' in datajson)) throw new Error('Failure in atribute (title) on Exercicio JSON');
            if (!('type' in datajson)) throw new Error('Failure in atribute (type) on Exercicio JSON');
            if (!('text' in datajson)) throw new Error('Failure in atribute (text) on Exercicio JSON');
            if (!('correct' in datajson)) throw new Error('Failure in atribute (correct) on Exercicio JSON');

            //Handle invalid values
            if (datajson.type != 0) throw new Error('Script doesnt support other types aside from 0');
            
            if (datajson.type == 0 && datajson.alternatives.length > 5) 
            throw new Error('Amount of alternatives exceeds maximum size of 5 for type = 0');
            
            if (datajson.type == 0 && datajson.correct <= 0 || datajson.correct > 5) 
            throw new Error('Incorrect correct alternative range for type = 0');

            updateExercicios(datajson);
        })
        .catch(error => {
            console.error('exerciciosLoader.js error:', error + '\n' + 'getting default values');
            if (defaultJson){ //reserved for if function starts receiving default as param
                updateExercicios(defaultJson);
            }
        }));
}



///FIXED ELEMENTS
const form = document.getElementById("question-form");
const title = document.getElementById("question-form-header");
const question = document.querySelector(".question-form-text");

const alternatives = document.querySelectorAll(".alternative-label"); //labels
const alternativesText = document.querySelectorAll(".alternative-text");

const button = document.getElementById("enviar-button");
const progressBar = document.getElementById("progress-bar");

const debugCorrectValue = document.getElementById("alternative-debug-correct");


///FUNCTION ONLY HANDLES TYPE = 0 FOR NOW
function updateExercicios(json) {
    if (json.alternatives.length < 5) {
        console.log("Less than 5 alternatives");
    }

    //update values
    title.textContent = json.title;
    question.textContent = json.text;
    if (debugCorrectValue != null) debugCorrectValue.textContent = json.correct;
    g_correct = json.correct;
    let cont = 0; //acess to array and json order
   
    //change elements of the labels with the json array strings
    //the querySelector searches for a <span> which includes only the text
    //as to not remove that <input> element
    alternatives.forEach(function (element) {
        const alternativeText = element.querySelector('.alternative-label-text');
        alternativeText.textContent = json.alternatives[cont];
        cont++;
    });

}


///SUBMIT FORM
let g_progress = 0; //counts progress towards finishing the trilha
let g_correct = 0;
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let selectedValue = null;
    console.log(alternatives.length)
    for (let i = 0; i < alternatives.length; i++) {
        const label = alternatives[i];
        const input = label.querySelector('input[type="radio"]');
        if (input.checked) {
            // If the radio input is checked, store its value
            selectedValue = input.value;
            input.checked=false;
            break; // Exit the loop since a selection has been found
        }
    }

    if (selectedValue != null){ //if something was selected
        let increment = 5;
        if (selectedValue == g_correct) increment = 10; 

        g_progress = (increment + g_progress > 100) ? 100 : g_progress+increment;
        progressBar.style.height = g_progress + '%';
        
        if (g_progress == 100) {
            //mark end of trilha
            alert('voce concluiu!');
            //put request for usuario as he completed x
            //return to trilha -> as he completed x his trilha menu should also have been completed
        }
        else {
            fetchNewExercise()
            //handle new requests
        }
    }

});
