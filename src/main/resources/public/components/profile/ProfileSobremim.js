import { generateProfileFrame } from "../ProfileFrame.js"

import { getUserById } from "../../modules/user-data.js";

const data = localStorage.getItem("userData");

// Verifica se 'data' não é null e converte para objeto
const userData = data ? JSON.parse(data) : null;

const id = userData ? userData.id : null;

const json = getUserById(id);


// Chame esta função onde for apropriado, como após a renderização do HTML

function createSobremimHtml() {
    return `
        <main class="col profileDetails">
            <h2>Meus dados</h2>
            <div class="mt-5"></div> 
            <p>Username: <span id="display-username"></span></p>
            <p>Nome: <span id="display-nome"></span></p>
            <p>Email: <span id="display-email"></span></p>
        </main>
    `;
}



export function createSobremim(){
    let outerHtml = createSobremimHtml();
    return generateProfileFrame(outerHtml);
} 

async function loadUserDataAndCreateHtml() {
    if (id) {
        const json = await getUserById(id);
        if (json) {
            // Gerar o HTML e inserir diretamente no body ou em um container específico
            document.body.innerHTML = createSobremimHtml(json); // ou usar um container específico

            // Atualiza os elementos DOM com os dados do usuário
            document.getElementById("display-username").textContent = json.username;
            document.getElementById("display-nome").textContent = json.nome;
            document.getElementById("display-email").textContent = json.email;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserDataAndCreateHtml();
});




export const sobremimDefaultJson = {
    
}