//Simple model for each question
const defaultQuestionJson = {
    text: 'Descrição da questão aqui', 
    type: 0, // Suporte para tipos extras no futuro
    alternatives: [ // Array com 5 objetos para as alternativas
        {
            conteudo: 'Texto da alternativa 1'
        },
        {
            conteudo: 'Texto da alternativa 2'
        },
        {
            conteudo: 'Texto da alternativa 3'
        },
        {
            conteudo: 'Texto da alternativa 4'
        }
    ],
    correct: 0 // Índice da alternativa correta, começando de 0
}

//Queue (max 10) of exercicios
const defaultJsonQueue = [
    defaultQuestionJson,
    defaultQuestionJson,
    defaultQuestionJson
]
const incrementDefault = 2.5; 
const isCorrectMod = 5

let queue; //Queue following defaultJsonQueue model
let queueLength = 0; 
let trilhaProgress = 0; //(100) is completed
let correctAlternative = 0; //in index 0 - 4

import { getId } from "../modules/user-data.js";
import { restfulJsonGet, getPaths, restfulJsonPost, postPaths } from "../modules/bancoti2-fetch.js";
import TextToSpeech from "../js/TextToSpeech.js";

const textToSpeech = new TextToSpeech()
textToSpeech.setLang('pt-BR');

const neuroDiv = localStorage.getItem("CardClicado");

function getNeuroNum(neuro) {
	switch(neuro) {
		case "TDAH": return 3;
		case "Dislexia": return 2; 
		case "Discalculia": return 1;
	}
}

const id = getId();
const neuro = window.location.search.split('?').pop();
/*if (neuro != 'tdah' ||  neuro != '' || neuro != '') {
    console.error('Incorrect type value received');	
}*/

const form = document.getElementById("question-form");
const question = document.querySelector(".question-form-text");
const alternatives = document.querySelectorAll(".alternative-label"); //labels
const alternativesText = document.querySelectorAll(".alternative-label-text");

const button = document.getElementById("enviar-button");
const progressBar = document.getElementById("progress-bar");
const debugCorrectValue = document.getElementById("alternative-debug-correct");

const textToSpeechButton = document.getElementById("text-to-speech-button");

addEventListener('DOMContentLoaded', () => {
    if (id == null || id == '') console.error('Couldnt access user key');  
    fetchNewQueue();
})


async function fetchNewQueue(){
    console.log("getting new queue");

    const jsonQueue = await restfulJsonGet(getPaths.exercicios + '?neuro=', getNeuroNum(neuroDiv));

    console.log(jsonQueue);
    console.log(jsonQueue[1].alternatives)


    queueLength = 0;
    if (jsonQueue != null && jsonQueue.length > 0) queue = jsonQueue;
    else {
        queue = defaultJsonQueue;
        //alert ('Using mock-up data');
    }

    loadExercicio (queue[queueLength++]);
}

function loadExercicio(json) {
    console.log("loadExercicio - Recebido JSON:", json);
    textToSpeech.apresentar();
   

    if (json.alternatives.length != 5) {
        console.warn("loadExercicio - Comprimento inesperado de alternativas:", json.alternatives.length);
    }

    question.textContent = json.text;
    if (debugCorrectValue != null) debugCorrectValue.textContent = json.correct;
    correctAlternative = json.correct;

    console.log("loadExercicio - Preparando para iterar sobre as alternativas.");
    json.alternatives.forEach((alt, index) => {
        console.log(`loadExercicio - Alternativa ${index}:`, alt);

        if (index < alternativesText.length) {
            alternativesText[index].textContent = alt.conteudo;
        } else {
            console.error('loadExercicio - Mais alternativas do que elementos de texto disponíveis.');
        }
    });

    console.log("loadExercicio - Todas as alternativas foram processadas.");
}


//Checks if input was selected and if so compare to stored correct result
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let selectedValue = -1;
    for (let i = 0; i < alternatives.length; i++) {
        const label = alternatives[i];
        const input = label.querySelector('input[type="radio"]');
        if (input.checked) {
            selectedValue = input.value;
            input.checked=false;
            break; 
        }
    }

    if (selectedValue > -1){ //if something was selected
        const correct = (selectedValue - 1 == correctAlternative);
        let increment = (correct) ? incrementDefault*isCorrectMod : incrementDefault;
        trilhaProgress = (increment + trilhaProgress > 100) ? 100 : trilhaProgress+increment;
        //increase bar
        progressBar.style.height = trilhaProgress + '%';
        
        const isCorrectString = (correct) ? 'TRUE' : 'FALSE';
        console.log(isCorrectString);
        console.log(id);
        const postJson = {
            'id': id,
            'isCorrect': isCorrectString
        };

        if ( !restfulJsonPost(postPaths.exerciciosSubmit, postJson) ) {
            //alert ('Couldnt submit answer to server');
            //return;
        }

        if (trilhaProgress < 100) {
            console.log("length = "+queueLength + " " + queue.length)
            if (queueLength < queue.length) loadExercicio(queue[queueLength++]);
            else fetchNewQueue();
        }
        else {
            alert('Voce concluiu!');
            //code here
        }
    } else {
        alert('Selecione uma opcao!');
    }
    
    

});


const delayBetweenSentences=100;
textToSpeechButton.addEventListener('click', (e)=>{
    e.preventDefault();
    textToSpeech.setVelocidade(1)
    console.log(queue)
    let end = queueLength-1;
    console.log(queue[end].text);
    textToSpeech.falar(queue[end].text);
    for (let i = 0; i < queue[end].alternatives.length; i++){
        const alternativeContent = queue[end].alternatives[i].conteudo;
        console.log(alternativeContent)
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = alternativeContent;
        textToSpeech.falarUtterance(utterance);
    }
})
