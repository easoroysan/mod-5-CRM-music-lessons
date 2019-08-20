export function fetchLessons(lessons){
    return {type: "FETCH_LESSONS", lessons}
}

export function fetchDesiredLesson(lesson){
    return {type: "FETCH_DESIRED_LESSON", lesson}
}