//Display of each comment inside on a forum post page (forum-post)
 

export function getPostComments(username, date, text, likes) {
    return (/*html*/ `
        <div class="container circular-container mb-4">
            <div class="comment-details row">
                <div class="col post-user-display inline-block">
                    <div class="centered-content">
                        <img class="comment-user-image" src="/images/card-pgPrincipal/perfil.png">
                        <span class="comment-username">${username}</span>
                        <span class="divider">-</span>
                        <i class="comment-date">${date}</i>
                    </div>
                </div>
                <div class="col text-end">
                    <div><i id="like-button" class="liked fa-solid fa-heart"></i></div>
                    <div class="comment-likes-num">${likes}</div>
                </div>
            </div>

            <div class="mt-4"></div>
            <!--text-->
            <div class="comment-container">
                <p class="comment-text">${text}</p>
            </div>
        </div>
    `);
}