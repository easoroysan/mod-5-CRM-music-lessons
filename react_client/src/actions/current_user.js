export function authSuccess(currentUser){
    return {type: "AUTHORIZATION_SUCCESS", currentUser: currentUser}
}
export function authFail(){
    return {type: "AUTHORIZATION_FAIL"}
}