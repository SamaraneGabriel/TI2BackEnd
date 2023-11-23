const commentHtml = `
<div class="container circular-container mb-4">
    <div class="comment-user row">
        <div class="col post-user-display inline-block">
            <div class="centered-content">
                <img class="comment-user-image" src="/imagens/card-pgPrincipal/perfil.png">
                <span class="comment-username"></span>
                <span class="divider">-</span>
                <i class="comment-age"></i>
            </div>
        </div>
        <div class="col text-end">
            <div><i id="like-button" class="liked fa-solid fa-heart"></i></div>
            <div class="comment-likes-num"></div>
        </div>
    </div>

    <div class="mt-4"></div>
    <!--text-->
    <div class="comment-container">
        <p class="comment-text"></p>
    </div>
</div>
`;


const defaultJson = {
    post: {
        user: { //holds user data including post date. For now theres no profile picture
            name: 'username', date: '10/07/2004'
        },
        content: { //holds post contents
            title: 'THIS IS MOCK DATA', //depending we could need multiple text fields
            text: 'This is a mock data post. Here is a 50 lorem character sequence: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur tempora quibusdam quaerat culpa beatae, quis vero sapiente voluptate consectetur quo in labore modi debitis omnis iste, amet alias nobis magni maxime deserunt facilis nesciunt facere, suscipit error! Blanditiis minima aspernatur fugit eius nulla possimus doloremque voluptas dolor explicabo, necessitatibus repudiandae.',
            likes: 999,
            comments: 2,
            tags: ['Important', 'Adhd'],
            id: 0
         },
    },
    comment: [{
        user: { //holds user data including post date. For now theres no profile picture
            name: 'commenter', date: '10/07/2004'
        },
        content: { //holds post contents
            text: 'my comment',
            likes: 999,
            id: 0
        }
    },{
        user: { //holds user data including post date. For now theres no profile picture
            name: 'commenter2', date: '07/07/2018'
        },
        content: { //holds post contents
            text: 'my comment2',
            likes: 999,
            id: 1,
        }
    }]
}

const tagColor_LookUpTable = [ //0 = red, 1 = yellow, 2 = green, 3 = gray
    'bg-danger', 'bg-warning', 'bg-success', 'bg-secondary'
]

const tagToColor = { //doesnt work yet
    'important': 0,
    'announcements': 0,
    'adhd': 2,
};

///LOOKUP TABLE FOR TAG COLORS
function getTagColorClass(tag) {
    let colorIndex = 3;
    const cmpValue = tag.toLowerCase();
    if (cmpValue == 'announcements') colorIndex=0;
    if (cmpValue == 'important') colorIndex=0;
    if (cmpValue=='adhd') colorIndex=2;
    console.log(colorIndex)
    return tagColor_LookUpTable[colorIndex];
}


///FETCH
const windowLocation = window.location.href;
const windowId = windowLocation.split('?').pop();
console.log(windowId);

let path = `/forum/page/load-post?id=${windowId}`;

fetch(path) //either this or send it by adding a body. Not sure which yet
    .then(response => {
        if (!response.ok) throw new Error('API request failed with status ' + response);
        return response.json();
    })
    .then(json => {
        console.log(json);
        ///main json
        if (!('post' in json)) throw new Error('Failure in atribute (post) on Forum-Page JSON');
        if (!('comments' in json)) throw new Error('Failure in atribute (comment) on Forum-Page JSON');

        ///post-json
        const postJson = json.post;
        if (!('user' in postJson)) throw new Error('Failure in atribute (post)->(user) on Forum-Page JSON');
        if (!('content' in postJson)) throw new Error('Failure in atribute (post)->(content) on Forum-Page JSON');

        const postUserJson = postJson.user;
        if (!('name' in postUserJson) || !('date' in postUserJson))
        throw new Error(`Invalid attribute(s) found inside (post)->(user) on Forum-Page JSON`);

        const postContentJson = postJson.content;
        if (!('title' in postContentJson) || !('text' in postContentJson) || !('likes' in postContentJson) ||
        !('comments' in postContentJson) || !('tags' in postContentJson) || !('id' in postContentJson))
        throw new Error(`Invalid attribute(s) found inside (post)->(content) on Forum-Page JSON`);

        ///comment-jsonArray
        console.log(json.comments)
        if (json.comment != undefined){
            for (let i = 0; i < json.comment.len; i++) {
                const commentJson = json.comment[i];
                if (!('user' in commentJson)) throw new Error(`Failure in atribute (comment)[${i}]->(user) on Forum JSON`);
                if (!('content' in commentJson)) throw new Error(`Failure in atribute (comment)[${i}]->(content) on Forum JSON`);

                const userJson = commentJson.user;
                if (!('name' in userJson) || !('date' in userJson))
                    throw new Error(`Invalid attribute(s) found inside (comment)[${i}]->(user) json of Forum JSON`);

                const contentJson = commentJson.content;
                if (!('title' in contentJson) || !('text' in contentJson) || !('likes' in contentJson) ||
                    !('comments' in contentJson) || !('tags' in contentJson) || !('id' in contentJson))
                    throw new Error(`Invalid attribute(s) found inside (comment)[${i}]->(content) on Forum JSON`);
                
            }
        }
        updateForum(json);
       
    })
    .catch(error => {
        console.error('forumLoader.js error for ' + path + '\n' + error + '\n' + 'getting default values');
        if (defaultJson) { //reserved for if function starts receiving default as param
            updateForum(defaultJson);
        }
    });



//FIXED ELEMENTS - POST SECTION ELEMENTS
const postsContainer = document.getElementById("posts-section"); //DIV
const postUser = document.getElementById("post-username"); //X
const postAge = document.getElementById("post-age"); //X
const postLikes = document.getElementById("post-likes-num"); //X
const postTitle = document.getElementById("post-title"); //X
const postText = document.getElementById("post-text"); //X
const postComments = document.getElementById("comments-num"); //X
const postTagContainer = document.getElementById("tag-container");

function updateForum(json) {
    jsonPost = json.post; //Simple JSON
    jsonComments = json.comments; //JSON array following same structure as post

    updatePost(jsonPost);
    if (jsonComments != undefined) unloadComments(jsonComments)

}


function updatePost(json){ //receives post json from structure

    jsonUser = json.user; //user json inside post.    
    postUser.textContent = jsonUser.name;
    postAge.textContent = jsonUser.age;

    jsonContent = json.content; //content json inside post
    postTitle.textContent = jsonContent.title;
    postText.textContent = jsonContent.text;
    postLikes.textContent = jsonContent.likes;
    postComments.textContent = jsonContent.comments;

    let tagLen = jsonContent.tags.length;
    if (tagLen > 5) {
        console.warn(`Higher than allowed amount of tags on (data)[${i}]->(tags)`);
        tagLen = 5;
    }

    for (let j = 0; j < tagLen; j++){
        const tagDiv = document.createElement('div');

        //for later compare the tags outputs from json to an array and assign different colors
        tagDiv.classList.add('circular-container', getTagColorClass(jsonContent.tags[j]), 'tag');
        tagDiv.innerHTML = jsonContent.tags[j];
        postTagContainer.appendChild(tagDiv);
    }

}

function unloadComments(json) { //receive comments json array from structure
    let len = json.length; //arr length
    if (len > 5) {
        console.warn("More than limit of 5 JSON (posts) received. Rest will be ignored");
        len = 5;
    }

    for (let i = 0; i < len; i++) {
        const commentJson = jsonComments[i];
        const jsonUser = commentJson.user; //name, age
        const jsonContent = commentJson.content; //text, likes and id
        
        //create element
        const tempDiv = document.createElement('div'); //this aproach will add an extra div
        tempDiv.innerHTML = commentHtml;

        //query within the element
        const username = tempDiv.querySelector(".comment-username"); //X
        const age = tempDiv.querySelector(".comment-age"); //X
        const text = tempDiv.querySelector(".comment-text") //X
        const likes = tempDiv.querySelector(".comment-likes-num") //X

        ///update values according to json
        //user
        username.textContent = jsonUser.name;
        age.textContent = jsonUser.date;

        //content
        text.textContent = jsonContent.text;
        likes.textContent = jsonContent.likes;

        console.log(tempDiv)
        tempDiv.addEventListener('click', () => {
            alert('Moving to next page');
            window.location.href = `/outras/forum-page.html?${jsonContent.id}`;
            //move to next page
        });
        postsContainer.appendChild(tempDiv);
    }
}
