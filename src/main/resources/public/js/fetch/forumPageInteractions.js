

//STATIC GLOBAL ELEMENTS
const commentForm = document.getElementById('comment-form');
const commentBox = document.getElementById('comment-box-input');

const _windowId = (window.location.href).split('?').pop();
console.log(_windowId);


const localStr = localStorage.getItem('userData');
if(localStr === null) throw new Error('Invalid access - no session storage found for userData');
if (localStr.trim() === '') throw new Error('Invalid access - session storage is an empty string');

const localJson = JSON.parse(localStr);
if (!localJson) throw new Error('Invalid access - session storage is not usable json');
        
const subValue = localJson.payload.sub;

commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (subValue == null) { //test user
        alert("Cannot comment as you are not logged in");
        return;
    }

    const commentInput = commentBox.value; //commenting box content
    if (commentInput.trim() != '') {
        sendComment(commentInput);
    }
})

function sendComment(commentInput) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with '0'
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    const serverRequestData = {
        content: commentInput,
        sub: subValue,
        time: formattedDate,
        id: _windowId
 };

    console.log(serverRequestData);
    fetch('/forum/page/comment', {
        method: "PUT", // You can use GET or POST, depending on your server's implementation.
        body: JSON.stringify(serverRequestData),
        headers: {
            "Content-Type": "application/json"
            //for form body there is no need for Content-Type header
        }
    })
        .then(response => {
            console.log(response.status);
            switch (response.status) {
                case 401:
                    alert("Server dismissed response");
                    break;
                case 200:
                    location.reload();
                    break;
                default:
                    alert("Unexpected response from server");
            }
        });


}

