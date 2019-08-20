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
        default:
            return state;
    }
}