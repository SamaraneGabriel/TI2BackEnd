/* Script used to send comments on the forum-post page
 */

import { getId } from "../modules/user-data.js";
import { restfulJsonPost, postPaths } from "../modules/bancoti2-fetch.js";

const userId = getId();
const commentForm = document.getElementById('comment-form');
const commentBox = document.getElementById('comment-box');
const windowLocation = window.location.href;
const windowId = windowLocation.split('?').pop();

commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (userId == null) { 
        alert("Cannot comment as you are not logged in");
        return;
    }

    const commentInput = commentBox.value; //commenting box content
    if (commentInput.trim() != '') {
        sendComment(commentInput);
    }
})

async function sendComment(commentInput) {
    const serverRequestData = {
        userId: userId,
        content: commentInput,
        questionId: windowId
    };
    console.log(serverRequestData)

    const success = await restfulJsonPost(postPaths.forumComment, serverRequestData)
    console.log(success)
    
    if (!success){
        alert('Server couldnt send reponse. Try again later');
        commentBox.value = '';
    } else {
        //reload page
        location.reload();
    }

}

