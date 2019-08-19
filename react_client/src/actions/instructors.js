export function fetchInstructors(instructors){
    return {type: "FETCH_INSTRUCTORS", instructors}
}

export function fetchDesiredInstructor(instructor){
    return {type: "FETCH_DESIRED_INSTRUCTOR", instructor}
}

export function updateDesiredInstructor(key,value){
    return {type: "INSTRUCTOR_ONCHANGE", key, value}
}

export function fetchInstructorClassTimes(class_times){
    return {type: "FETCH_INSTRUCTOR_CLASSTIMES", class_times}
}