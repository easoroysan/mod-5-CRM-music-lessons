export default (state={ authorized: true, schools:[] },action)=>{
    switch(action.type){
        case("AUTHORIZATION_SUCCESS"):
            return { authorized: true, ...action.currentUser }
        case("AUTHORIZATION_FAIL"):
            return { authorized: false }
        default:
            return state;
      }
}