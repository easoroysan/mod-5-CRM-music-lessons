export function fetchContacts(contacts){
    return {type: "FETCH_CONTACTS", contacts}
}

export function fetchDesiredContact(contact){
    return {type: "FETCH_DESIRED_CONTACT", contact}
}

export function updateDesiredContact(key,value){
    return {type: "CONTACT_ONCHANGE", key, value}
}