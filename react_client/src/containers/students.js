import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/students';
import { authFail } from '../actions/users';


class Students extends React.Component{

    render(){
        return(
            <div>
                All Students
                <ul>
                    {this.props.students.map( student => <li key={student.id}>{student.first_name} {student.last_name}</li> )}
                </ul>
            </div>
        )
    }

    componentDidMount(){
        fetch('http://localhost:5000/students',{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(students => {
            students.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchStudents(students))
        })
    }
}

export default connect(state => ({ students: state.students }))(Students);