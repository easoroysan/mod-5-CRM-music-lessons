export default (state=true,action)=>{
    switch(action.type){
        case("AUTHORIZATION_SUCCESS"):
            return true
        case("AUTHORIZATION_FAIL"):
            return false
        default:
            return state;
      }
}