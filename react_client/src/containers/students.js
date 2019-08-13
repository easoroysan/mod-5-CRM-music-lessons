import React from 'react'
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/students'

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
        fetch('http://localhost:5000/students')
        .then(r=> r.json())
        .then(students => this.props.dispatch(fetchStudents(students)))
    }
}

export default connect(state => ({ students: state.students }))(Students);