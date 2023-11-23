import { generateProfileFrame } from "../ProfileFrame.js"

function createProfileHtml() {
    return (/*html*/`
        <main class="col profileDetails">
            <h2>Este é o seu perfil!</h2>
            <p>Aqui você pode alterar as suas credenciais de cadastro a qualquer momento.</p>
            <div class="mt-5"></div> <!--vertical divider-->

            <!-- Botões para atualizar credenciais -->
            <button onclick="updateUsername()">Atualizar Nome de Usuário</button>
            <button onclick="updateEmail()">Atualizar E-mail</button>
            <button onclick="updatePassword()">Atualizar Senha</button>
        </main>
    `);
}

export function createProfile(){
    let outerHtml = createProfileHtml();
    return generateProfileFrame(outerHtml);
} 

export const profileDefaultJson = {

};