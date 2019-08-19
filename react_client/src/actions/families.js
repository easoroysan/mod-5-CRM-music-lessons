export function fetchFamilies(families){
    return {type: "FETCH_FAMILIES", families}
}

export function fetchDesiredFamily(family){
    return {type: "FETCH_DESIRED_FAMILY", family}
}

export function updateDesiredFamily(key,value){
    return {type: "FAMILY_ONCHANGE", key, value}
}