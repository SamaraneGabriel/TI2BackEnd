import { colorToClass } from "../modules/color-to-class.js";

/* Gets list of parameters to send a update post preview html
 * tagsObjArray: array of objs with 2 attr: {name: 'Announcements', color: 'red'}
 */
export function getPostDetails(username, date, title, tagsObjArray, content, likes, comments) {
   //tagsObjArray to a single usable string
    const colors = tagsObjArray.map(tag=>colorToClass(tag.color))
    const tagsHtml = tagsObjArray.map((tag, index) => /*html*/`
        <div class="circular-container tag ${colors[index]}"> ${tag.name} </div>
    `).join('');
    console.log(tagsHtml);

    return (/*html*/ `
        <div class="row">
            <div class="col">
                <div class="post-user-display inline-block">
                    <div class="centered-content">
                        <img id="forum-image" src="/images/card-pgPrincipal/perfil.png">
                        <span id="post-username">${username}</span>
                        <span class="divider">-</span>
                        <i><span id="post-date">${date}</span></i>
                    </div>
                </div>
            </div>
            <div class="col text-end">
                <div id="likes">
                    <div><i id="like-button" class="liked fa-solid fa-heart"></i></div>
                    <div id="post-likes-num">${likes}</div>
                </div>
            </div>
        </div>

        <!--title-->
        <h4 id="post-title">${title}</h4>

        <!--tag-->
        <div id="tag-container">${tagsHtml}</div>

        <!--text-->
        <div id="post-text" class="mt-3">${content}</div>
    `);
}