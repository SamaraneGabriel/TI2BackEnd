/* Preview of a post. forum-explore contains multiple of them.
 * Contains almost all details, but text received should contain only one paragraph
 * Similar to a reddit explore posts window
 */


import { colorToClass } from "../modules/color-to-class.js";

/* Gets list of parameters to send a update post preview html
 * tagsObjArray: array of objs with 2 attr: {name: 'Announcements', color: 'red'}
 */
export function getForumPostPreview(username, date, title, tagsObjArray, text, likes, comments) {
    //tagsObjArray to a single usable string
    const colors = tagsObjArray.map(tag=>colorToClass(tag.color))
    const tagsHtml = tagsObjArray.map((tag, index) => /*html*/`
        <div class="circular-container tag ${colors[index]}"> ${tag.name} </div>
    `).join('');

    return (/*html*/ `
        <div class="container circular-container post mg-4 mb-4 pt-4 pb-3">
            <!--user data-->
            <div class="row">
                <div class="post-user-display col">
                    <img src="/images/card-pgPrincipal/perfil.png">
                    <span class="post-username">${username}</span>
                    -
                    <i class="post-date">${date}</i>
                </div>
            
                <div class="col text-end"><i class="fa-solid fa-gear"></i></div>
            </div>
            
            <!--title-->
            <div>
                <h4 class="post-title mt-2">${title}</h4>
            </div>
            
            <!--tag-->
            <div class="tag-container">
                ${tagsHtml}
            </div>
            
            <!--description-->
            <div class="post-description mt-3">
                ${text}
            </div>
            
            <!--like/comment-->
            <div class="mt-3 row like-comment">
                <div class="col-1 circular-container">
                    <span class="likes-num">${likes}</span>
                    <i class="fa-regular fa-heart"></i>
                </div>
                <div class="col-1 circular-container">
                    <span class="comments-num">${comments}</span> 
                    <i class="fa-regular fa-comment "></i>
                </div>
            </div>
        </div>
    `);
}