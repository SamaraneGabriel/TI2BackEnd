/* Implements most fetch requests from page to server's schema bancoti2
 * Authentication and user registration are not included, as they required
 * addition protection steps and are hard coded.
 */

/* General function for get request
 * This was done as all of them returned a json
 * @param: path, expected fetch path
 * @param: id, expected filter id. Can be ignored
 * @return: json, results from server, null in case of error
 */
export async function restfulJsonGet(path, id) {
    if (id != null) {
        path = path + id;
        console.log(path);
    }

    try {
        const response = await fetch(path, { method: 'GET' });

        if (response.status === 400) {
            console.warn('Failure received from server -> couldnt find id ' + id);
            return null;
        } else if (!response.ok) {
            console.error('API failed with status ' + response.status);
            return null;
        } 

        const json = await response.json();
        console.log(`json obtained from ${path}: `, json);
        return json;
    } catch (error) {
        console.error(path + ' -> ' + error);
        return null;
    }
}

export async function doubleRestfulJsonGet (path, id1, id2) {
    if (id1 != null || id2 != null) {
        console.error('Expected 2 params for doubleRestfulJsonGet');
    }
    path = path + '/' + id1 + '/' + id2;
    return await restfulJsonGet(path);
}

/* General function for posting json to database
 * This was done as almost all insertion functions sent jsons 
 * @param: path, required path
 * @param: reqJson, required json to send the infromation
 * @return: boolean, true on success
 */
export function restfulJsonPost (path, reqJson) {
    fetch (path, {
        method: 'POST',
        body: JSON.stringify(reqJson),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then (response => {
        //used when json values where not found
        if (response == 400)  console.warn('Failure receive from server -> data invalid or not found for \n' + reqJson);
        else if (!response.ok) console.error('API failed with status ' + response.status);
        else return true;

        return false;
    })
}

// Paths that are used implemented on this method
export const getPaths = {
    forumExplore: '/forum/explore', 
    postDetails: '/forum/post/load', //[:/id] -> pergunta id
    exercicios: '/exercicios/load', //[/:username/:type] -> type for which trilha

    perfil: '/perfil', //[/:username]
    sobremim: '/perfil/sobremim', //[/:username] 
    plano: '/perfil/planos' //[/:username]
}

export const postPaths = {
    forumComment: '/forum/post/comment',
    exerciciosSubmit: '/exercicios/submit'
}

