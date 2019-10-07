export function fetchLessons(lessons){
    return {type: "FETCH_LESSONS", lessons}
}

export function updateLessons(lesson){
    return {type: "UPDATE_LESSONS", lesson}
}

export function fetchDesiredLesson(lesson){
    return {type: "FETCH_DESIRED_LESSON", lesson}
}

export function addDesiredLesson(lesson){
    return {type: "ADD_DESIRED_LESSON", lesson}
}

export function updateDesiredLesson(key,value){
    return {type: "UPDATE_DESIRED_LESSON", key, value}
}

export function confirmAttendanceAdded(value){
    return {type: "ATTENDANCE_ADDED", value}
}

export function confirmMakeUpStatus(value){
    return {type: "MAKE_UP_STATUS", value}
}