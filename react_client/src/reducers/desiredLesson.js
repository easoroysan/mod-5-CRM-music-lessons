export default (state={
    class_time: {},
    student: {},
    instructor: {},
    attendances: []
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_LESSON"):
            let longStart = action.lesson.class_time.start_time.split("T")[1]
            let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`

            let longEnd = action.lesson.class_time.end_time.split("T")[1]
            let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`

            return {...action.lesson, class_time: { ...action.lesson.class_time, start_time: shortStart, end_time: shortEnd} }
        default:
            return state;
    }
}