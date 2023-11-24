import { getUserById } from "../modules/user-data.js";
import { restfulJsonPut } from "../modules/bancoti2-fetch.js";
const data = localStorage.getItem("userData");

async function loadUserProfile(data) {
    if (data) {
        const user = JSON.parse(data);
        const id = user.id;

        try {
            const json = await getUserById(id);
            if (json) {
                document.getElementById("username-display").textContent = json.nome;
                document.getElementById("email-display").textContent = json.username;
                document.getElementById("total-exercicios").textContent = json.feitos;
                document.getElementById("total-acertos").textContent = json.acertos;
                
                const porcentagem = (100 * (json.acertos / json.feitos)).toFixed(2);
	
				const porcentagemNumerica = parseFloat(porcentagem);

                
                document.getElementById("porcentagem-acertos").textContent = porcentagem + "%";
            }
        } catch (error) {
            console.error("Erro ao carregar perfil do usuário:", error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile(data);
    
    const modal = document.getElementById('update-modal');
    const closeModal = document.getElementsByClassName('close-btn')[0];

    document.getElementById('change-username-btn').addEventListener('click', () => {
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Atualizar Username';
        // Configurar para atualizar o username
    });

    document.getElementById('change-email-btn').addEventListener('click', () => {
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Atualizar Email';
        // Configurar para atualizar o email
    });
    
        document.getElementById('change-password-btn').addEventListener('click', () => {
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Atualizar Senha';
        // Configurar para atualizar o senha
    });

    // Repita para a senha e outros botões conforme necessário

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
     const user = JSON.parse(data);

	document.getElementById('submit-info-btn').addEventListener('click', async () => {
    const newInfo = document.getElementById('new-info').value;
    const title = document.getElementById('modal-title').textContent;
   	let path;
    let reqJson = { id: user.id };

   
    if (title === 'Atualizar Username') {
        path = '/update-username';
        reqJson.username = newInfo;
    } else if (title === 'Atualizar Email') {
        path = '/update-email';
        reqJson.email = newInfo;
    } else if (title === 'Atualizar Senha') {
        path = '/update-senha';
        reqJson.senha = newInfo;
    }

    const success = await restfulJsonPut(path, reqJson);

    if (success) {
        // Redirecionar para a página de login
        window.location.href = '../../index.html';
    }

    modal.style.display = "none";
});

});

