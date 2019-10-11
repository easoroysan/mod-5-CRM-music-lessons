export default (state={
    class_time: { start_time: "" },
    student: {},
    instructor: {},
    attendances: [],
    school: {},
    instrument: "",
    instructor_notes: "",
    misc_notes: ""
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_LESSON"):
            if(action.lesson.class_time.start_time.length > 5){
                let longStart = action.lesson.class_time.start_time.split("T")[1]
                let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`
    
                let longEnd = action.lesson.class_time.end_time.split("T")[1]
                let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`
    
                return {...action.lesson, class_time: { ...action.lesson.class_time, start_time: shortStart, end_time: shortEnd} }
            }else{
                return action.lesson
            }
        case("UPDATE_DESIRED_LESSON"):
            return {...state, [action.key]: action.value}
        case("ATTENDANCE_ADDED"):
            return {...state, submitted: action.value}
        case("MAKE_UP_STATUS"):
            return {...state, make_up: action.value}
        default:
            return state;
    }
}