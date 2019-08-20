export default (state=[{
    id: 1,
    school: {},
    students: [],
    contacts: [],
    start_time: " T : ",
    end_time: " T : ",
    lessons: []
}],action)=>{
    switch(action.type){
        case("FETCH_DESIRED_CLASSTIMES"):
            return action.class_times
        default:
            return state;
      }
}