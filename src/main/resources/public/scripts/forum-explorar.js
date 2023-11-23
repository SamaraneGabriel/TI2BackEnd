const defaultPostsArray = [
{
    user: { //holds user data including post date. For now theres no profile picture
        name: 'username'
    },
    content: { //holds post contents
        date: '05/04/2021',
        title: 'THIS IS MOCK DATA',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis excepturi commodi labore deleniti iusto, porro mollitia quia facilis maiores cumque architecto, dicta nesciunt laboriosam nisi eligendi reiciendis fugit ea praesentium? Ipsam fugit quo eos rerum ab? Possimus, tenetur eos error laborum necessitatibus ut harum porro voluptates doloremque doloribus quo corrupti.',
        likes: 999,
        comments: 999,
        tags: [
            {name: 'Announcements', color: 'red'}, 
            {name: 'Important', color: 'yellow'}
        ],
        id: 0
        },
    
}, {
    user: { //holds user data including post date. For now theres no profile picture
        name: 'username2', 
    },
    content: { //holds post contents
        date: '10/10/2023',
        title: 'This years old post',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis excepturi commodi labore deleniti iusto, porro mollitia quia facilis maiores cumque architecto, dicta nesciunt laboriosam nisi eligendi reiciendis fugit ea praesentium? Ipsam fugit quo eos rerum ab? Possimus, tenetur eos error laborum necessitatibus ut harum porro voluptates doloremque doloribus quo corrupti.',
        likes: 999,
        comments: 999,
        tags: [
            {name: 'Announcements', color: 'red'}, 
            {name: 'Important', color: 'yellow'}
        ],
        id: 1

    }   
}];
const maxPostsLimit = 5;
import { getForumPostPreview } from "../components/ForumPostPreview.js";
import htmlPages from "../modules/htmlPaths.js";
import { getPaths, restfulJsonGet } from "../modules/bancoti2-fetch.js";


const postsPreviewContainer = document.getElementById("posts-section");


addEventListener('DOMContentLoaded', () => {
    const serverJson = restfulJsonGet(getPaths.forumExplore);

    if (serverJson != null) updateForum(serverJson);
    else {
        alert('Using mock data');
        updateForum(defaultPostsArray);
    }
})


//FUNCTION ONLY HANDLES TYPE = 0 FOR NOW
function updateForum(postsArray) {

    let len = postsArray.length;
    if (postsArray.length > maxPostsLimit) {
        console.warn("More than " + maxPostsLimit + " posts received");
        len = maxPostsLimit;
    }

    console.log(postsArray)
    for (let i = 0; i < len; i++) {
        const userObj = postsArray[i].user;
        const username = userObj.name;

        const contentObj = postsArray[i].content;
        const date = contentObj.date;
        const title = contentObj.title;
        const tagsArray = contentObj.tags;
        const text = contentObj.text;
        const likes = contentObj.likes;
        const comments = contentObj.comments;
        const id = contentObj.id;

        //parse module string as usable document element
        const htmlString = getForumPostPreview(username, date, title, tagsArray, text, likes, comments);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = htmlString;

        newDiv.addEventListener('click', () => {
            window.location.href = `${htmlPages.forumPost}?${id}`;
        });

        console.log(newDiv)
        postsPreviewContainer.appendChild(newDiv);
    }
}


