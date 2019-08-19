export default (state={
    family_name: "",
    contacts: [],
    students: [],
    billing_total: "",
    school: {name: ""}
},action)=>{
    switch(action.type){
        case("FETCH_DESIRED_FAMILY"):
            return action.family
        case("FAMILY_ONCHANGE"):
            return {...state, [action.key]: action.value}
        default:
            return state;
    }
}