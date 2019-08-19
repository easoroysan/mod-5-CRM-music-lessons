export default (state={
    first_name: "",
    last_name: "",
    instrument_1: "",
    instrument_2: "",
    instrument_3: "",
    phone_number: "",
    emergency_number: "",
    email: "",
    date_of_birth: "",
    billing_address: "",
    pay_rate: "",
    biography: "",
    misc_notes: ""
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_INSTRUCTOR"):
            return action.instructor
        case("INSTRUCTOR_ONCHANGE"):
            return {...state, [action.key]: action.value}
        case("FETCH_INSTRUCTOR_CLASSTIMES"):
            return {...state, class_times: action.class_times}
        default:
            return state;
    }
}