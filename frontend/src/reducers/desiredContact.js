export default (state={
    first_name: "",
    last_name: "",
    relation_to_students: "",
    phone_number: "",
    emergency_number: "",
    email: "",
    billing_address: ""
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_CONTACT"):
            return action.contact
        case("CONTACT_ONCHANGE"):
            return {...state, [action.key]: action.value}
        default:
            return state;
    }
}