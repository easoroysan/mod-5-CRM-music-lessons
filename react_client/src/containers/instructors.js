import React from 'react'
import { connect } from 'react-redux';
import { fetchInstructors } from '../actions/instructors'

class Instructors extends React.Component{
    render(){
        return(
            <div>
                All Instructors
                <ul>
                    {this.props.instructors.map( instructor => <li key={instructor.id}>{instructor.first_name} {instructor.last_name}</li> )}
                </ul>
            </div>
        )
    }

    componentDidMount(){
        fetch('http://localhost:5000/instructors')
        .then(r=> r.json())
        .then(instructors => this.props.dispatch(fetchInstructors(instructors)))
    }
}

export default connect(state => ({ instructors: state.instructors }))(Instructors);