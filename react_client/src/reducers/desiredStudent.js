export default (state={
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    misc_notes: "",
    medical_notes: "",
    billing_notes: ""
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_STUDENT"):
            return action.student
        case("STUDENT_ONCHANGE"):
            return {...state, [action.key]: action.value}
        default:
            return state;
    }
}