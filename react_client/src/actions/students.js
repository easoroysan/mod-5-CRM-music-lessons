export function fetchStudents(students){
    return {type: "FETCH_STUDENTS", students}
}

export function fetchDesiredStudent(student){
    return {type: "FETCH_DESIRED_STUDENT", student}
}

export function updateDesiredStudent(key,value){
    return {type: "STUDENT_ONCHANGE", key, value}
}