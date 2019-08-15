export default (state=[],action)=>{
    switch(action.type){
        case("FETCH_FAMILIES"):
            return action.families
        default:
            return state;
      }
}