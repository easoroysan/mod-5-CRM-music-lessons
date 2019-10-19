export default (state=[],action)=>{
    switch(action.type){
        case("FETCH_STUDENTS"):
            return action.students
        default:
            return state;
      }
}