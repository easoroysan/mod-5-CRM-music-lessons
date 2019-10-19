export default (state=[
        {
            id: 1,
            class_time: {},
            instructor: {},
            school: {}
        }
    ],action)=>{
    switch(action.type){
        case("FETCH_LESSONS"):
            let betterLessons = action.lessons.map( lesson => {
                let longStart = lesson.class_time.start_time.split("T")[1]
                let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`
        
                let longEnd = lesson.class_time.end_time.split("T")[1]
                let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`
        
                return {...lesson, class_time: { ...lesson.class_time, start_time: shortStart, end_time: shortEnd} }
            })
            return betterLessons.sort( (a,b) =>{
                let newA = parseInt(a.class_time.start_time.split(":")[0]+a.class_time.start_time.split(":")[1])
                let newB = parseInt(b.class_time.start_time.split(":")[0]+b.class_time.start_time.split(":")[1])
                return newA - newB
            })
        case("UPDATE_LESSONS"):
            let longerStart = action.lesson.class_time.start_time.split("T")[1]
            let shorterStart = `${longerStart.split(":")[0]}:${longerStart.split(":")[1]}`

            let longerEnd = action.lesson.class_time.end_time.split("T")[1]
            let shorterEnd = `${longerEnd.split(":")[0]}:${longerEnd.split(":")[1]}`

            let betterLesson = {...action.lesson, class_time: { ...action.lesson.class_time, start_time: shorterStart, end_time: shorterEnd} }

            return state.map( lesson => lesson.id === action.lesson.id ? betterLesson : lesson)

        case("ADD_DESIRED_LESSON"):
            let longStart = action.lesson.class_time.start_time.split("T")[1]
            let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`

            let longEnd = action.lesson.class_time.end_time.split("T")[1]
            let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`

            return [...state, {...action.lesson, class_time: { ...action.lesson.class_time, start_time: shortStart, end_time: shortEnd} }]
        default:
            return state;
    }
}