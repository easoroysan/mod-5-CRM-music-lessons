export function fetchDesiredClassTimes(class_times){
    return {type: "FETCH_DESIRED_CLASSTIMES", class_times}
}

export function updateDesiredClassTime(class_time){
    return {type: "UPDATE_DESIRED_CLASSTIME", class_time}
}

export function addDesiredClassTime(class_time){
    return {type: "ADD_DESIRED_CLASSTIME", class_time}
}