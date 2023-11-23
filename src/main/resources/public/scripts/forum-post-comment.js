/* Script used to send comments on the forum-post page
 */

import { getName } from "../modules/user-data.js";
import { restfulJsonPost, postPaths } from "../modules/bancoti2-fetch.js";

const username = getName();
const commentForm = document.getElementById('comment-form');
const commentBox = document.getElementById('comment-box');
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (username == null) { 
        alert("Cannot comment as you are not logged in");
        return;
    }

    const commentInput = commentBox.value; //commenting box content
    if (commentInput.trim() != '') {
        sendComment(commentInput);
    }
})

function sendComment(commentInput) {
    const serverRequestData = {
        username: username,
        content: commentInput
    };

    if (!restfulJsonPost(postPaths.forumComment, serverRequestData)){
        alert('Server couldnt send reponse. Try again later');
        commentBox.value = '';
    } else {
        //reload page
        window.location.href = window.location.href;
    }

}

