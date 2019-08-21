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
        case("UPDATE_DESIRED_CLASSTIME"):
            return state.map( time => time.id === action.class_time.id ? action.class_time : time)
        case("ADD_DESIRED_CLASSTIME"):
            return [...state, action.class_time]
        default:
            return state;
      }
}