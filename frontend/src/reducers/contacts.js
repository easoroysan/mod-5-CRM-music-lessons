export default (state=[],action)=>{
    switch(action.type){
        case("FETCH_CONTACTS"):
            return action.contacts
        default:
            return state;
      }
}