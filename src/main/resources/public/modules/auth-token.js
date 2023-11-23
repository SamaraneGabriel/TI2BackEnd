///Methods for getting and setting the local storage token

//commented values are not being used
const defaultJson = {
    header: {
        alg: 'HS256', //HMAC SHA256
        typ: 'JWT' //type of toke JWT
    },
    payload: {
        sub: 'username', //unique identifier, for now username 
        name: 'name'
        //iat: 124252354 //-> represents the time the token was issued to see if it expired
    }
    //signature: 'XXXXXXXXXXXXXXXXXXXXXX' //uses alg to encode header, payload and secret key
}
const lsPath = 'userAuthToken';


//METHODS

/* Stores new user token
 *
 * param: userToken, stringfied user token json
 * return: void
 */
export function storeNewToken(userToken) {
    localStorage.setItem(lsPath, JSON.stringify(userToken));
}

//Stores default user token
export function storeDefaultToken() {
    localStorage.setItem(lsPath, JSON.stringify(defaultJson));
}

//Checks if theres any stored value in local storage path
export function isLoggedIn() {
    const existingData = localStorage.getItem(lsPath);
    if (existingData == null) return false;
    return true;
}


/* Tries to get userToken as json from local storage
 *
 * return: json, null in case of failure
 */
export function getUserToken() {
    const existingData = localStorage.getItem(lsPath);
    if (existingData == null) { 
        console.log("Failure in getting userToken: nothing stored at " + lsPath);
        return null;
    }

    const json = JSON.parse(existingData);
    if (!json) {
        console.log("Failure in getting userToken: value stored not a valid json");
        return null;
    }

    return json;
}

export function clearUserToken() {
    localStorage.removeItem(lsPath);
}