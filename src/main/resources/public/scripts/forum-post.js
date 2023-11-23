const defaultPostJson = {
    user: { 
        username: 'username'
    },
    content: { //holds post contents
        date: '10/07/2004',
        title: 'THIS IS MOCK DATA', //depending we could need multiple text fields
        text: 'This is a mock data post. Here is a 50 lorem character sequence: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur tempora quibusdam quaerat culpa beatae, quis vero sapiente voluptate consectetur quo in labore modi debitis omnis iste, amet alias nobis magni maxime deserunt facilis nesciunt facere, suscipit error! Blanditiis minima aspernatur fugit eius nulla possimus doloremque voluptas dolor explicabo, necessitatibus repudiandae.',
        likes: 999,
        comments: 2,
        tags: [
            {name: 'Announcements', color: 'red'}, 
            {name: 'Important', color: 'yellow'}
        ],
        id: 0
    },


    comment: [{
        user: { 
            username: 'commenter'
        },
        content: { 
            date: '10/07/2004',
            text: 'my comment',
            likes: 999,
            id: 0
        }
    },{
        user: { 
            username: 'commenter2'
        },
        content: { 
            date: '07/07/2018',
            text: 'my comment2',
            likes: 999,
            id: 1,
        }
    }]
}

const maxCommentsNum = 5;
import { getPostComments } from "../components/PostComments.js";
import { getPostDetails } from "../components/PostDetails.js";
import { restfulJsonGet, getPaths } from "../modules/bancoti2-fetch.js";

const windowLocation = window.location.href;
const windowId = windowLocation.split('?').pop();
console.log(windowId);

addEventListener('DOMContentLoaded', () => {
    const json = restfulJsonGet(getPaths.postDetails);
    if (json != null) {
        loadDetails(json);
        loadComments(json.comment);
    }
    else {
        alert('Mock-up data');
        loadDetails(defaultPostJson);
        loadComments(defaultPostJson.comment);
    }
});



/* Expects entire json (user data is direct child)
 * Creates post details section (above comments) and attaches to div
 */
function loadDetails(json){ 
    const container = document.getElementById('post-details');

    const jsonUser = json.user; 
    const username = jsonUser.username;

    const jsonContent = json.content; 
    const date = jsonContent.date;
    const title = jsonContent.title;
    const tagsArray = jsonContent.tags;
    const text = jsonContent.text;
    const likes = jsonContent.likes;
    const comments = jsonContent.comments;

    const newDiv = document.createElement('div');
    newDiv.innerHTML = getPostDetails(username, date, title, tagsArray, text, likes, comments);
    container.appendChild(newDiv);
}



/* Expects comments obj array inside json
 * Creates comment list and attaches to div
 */
function loadComments(commentsArray) { 
    const container = document.getElementById('post-comments');
    
    let len = commentsArray.length;
    if (len > maxCommentsNum) {
        console.warn("More than limit of " + maxCommentsNum + " comments received");
        len = maxCommentsNum;
    }

    for (let i = 0; i < len; i++) {
        const json = commentsArray[i];

        const jsonUser = json.user; 
        const username = jsonUser.username;

        const jsonContent = json.content;
        const date = jsonContent.date;
        const text = jsonContent.text;
        const likes = jsonContent.likes;
        const id = jsonContent.id;       

        const newDiv = document.createElement('div');
        newDiv.innerHTML = getPostComments(username, date, text, likes);
        console.log(newDiv)
        
        container.appendChild(newDiv);
    }
}
