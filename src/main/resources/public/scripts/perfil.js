import { getUserById } from "../modules/user-data.js";

async function loadUserProfile() {
    const data = localStorage.getItem("userData");
    if (data) {
        const user = JSON.parse(data);
        const id = user.id;

        try {
            const json = await getUserById(id);
            if (json) {
                document.getElementById("username-display").textContent = json.email;
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
    loadUserProfile();
});
