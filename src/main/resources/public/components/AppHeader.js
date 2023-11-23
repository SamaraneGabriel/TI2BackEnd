import htmlPages from "../modules/htmlPaths.js";
import { getName } from "../modules/user-data.js";

const trilhaMainpage = htmlPages.trilhas;
const perfilMainpage = htmlPages.perfilMainpage;
const forumMainpage = htmlPages.forumExplorar; //explore is the mainpage of a forum
const homepage = htmlPages.homepage;

const username = getName();

export function generateAppHeader() {
    return ( /*html*/`
    <header class="site-header">
    <div class="header-left">
        <a href="${homepage}" class="site-title">NeuroNerds</a>
    </div>
    <nav class="header-right">
        <a href="${trilhaMainpage}">Trilha</a>
        <a href="${forumMainpage}">Fórum</a>
        <div class="user-profile-dropdown">
            <a href="javascript:void(0);" class="user-profile">
                <i class="fas fa-user"></i> <span>${username}</span>
            </a>
            <div class="dropdown-content">
                <a href="${perfilMainpage}">Perfil</a>
                <a href="#" class="exit-button">Sair</a>
            </div>
        </div>
    </nav>
</header>
    `);
}