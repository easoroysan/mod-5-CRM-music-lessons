export default (state=[],action)=>{
    switch(action.type){
        case("FETCH_INSTRUCTORS"):
            return action.instructors
        default:
            return state;
      }
}