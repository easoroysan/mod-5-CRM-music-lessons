import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { fetchDesiredClassTimes, updateDesiredClassTime } from '../actions/class_times';
import { authFail } from '../actions/current_user';
import NewClassTimeForm from './newClassTimeForm';


class InstructorSchedule extends React.Component{

    state = {
        active: true,
        classForm: false
    }

    runFetch = (desiredTime) => {
        fetch(`http://localhost:5000/class_times/${desiredTime.id}`,{
            method:"PATCH",
            headers: {
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ active: !desiredTime.active})
        })
        .then(r=>r.json())
        .then(class_time =>{
            if(class_time.error){
                this.props.dispatch(authFail())
            }else{
                this.props.dispatch(updateDesiredClassTime(class_time))
            }
        })
    }

    handleActive = (id) =>{
        let desiredTime = this.props.class_times.find( time => time.id === id)
        if(desiredTime){
            if(desiredTime.active && desiredTime.lessons.length !== 0 && desiredTime.lessons.some( lesson => lesson.active)){
                let checker = window.confirm("Are you sure you want to set this class to Inactive? There is at least 1 lesson in the class. All lessons in this class time will be set to inactive.")
                if(checker){
                    this.runFetch(desiredTime)
                }
            }else{
                this.runFetch(desiredTime)
            }
        }
    }

    render(){
        let desiredTimes = []
        this.state.active ?
        desiredTimes = this.props.class_times.filter( time => time.active ) :
        desiredTimes = this.props.class_times.filter( time => !time.active )
        return(
            <div>
                <Divider/>
                <Header as='h2' textAlign='center'>
                    <Header.Content>Schedule</Header.Content><br/>
                    <Button onClick={()=> this.setState({ active: !this.state.active })}>Show {this.state.active ? 'Inactive' : 'Active'} Class Times</Button>
                    <Button onClick={()=> this.setState({ classForm: !this.state.classForm })}>{this.state.classForm ? 'Hide Form' : 'Add a Class Time'}</Button>
                </Header>

                {this.state.classForm ? <NewClassTimeForm/> : null}

                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Students</Table.HeaderCell>
                            <Table.HeaderCell>Primary Contact</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {desiredTimes.map( classTime =>{
                            let {start_time, end_time} = classTime
                            let longStart = start_time.split("T")[1]
                            let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`

                            let longEnd = end_time.split("T")[1]
                            let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`

                            let desiredStudents = classTime.students.filter( student =>{
                                let lesson = classTime.lessons.find( lesson => lesson.student_id === student.id)
                                return lesson.active
                            })

                            let desiredContacts = classTime.contacts.filter( contact =>{
                                let student = classTime.students.find( student => student.family_id === contact.family_id)
                                let lesson = classTime.lessons.find( lesson => lesson.student_id === student.id)
                                return lesson.active
                            })

                            let desiredLessons = classTime.lessons.filter( lesson => lesson.active)

                            return (
                                <Table.Row key={classTime.id}>
                                    <Table.Cell>
                                        {classTime.day} | {classTime.school.name} | {shortStart}-{shortEnd} <Button onClick={()=>this.handleActive(classTime.id)}>Set to {classTime.active ? 'Inactive' : 'Active'}</Button>
                                    </Table.Cell>
                                    <Table.Cell>{
                                        desiredStudents.map( student =>{
                                        let lesson = classTime.lessons.find( lesson => lesson.student_id === student.id)
                                        let {first_name,last_name} = student

                                        return(
                                            <div key={student.id}>
                                            <Link to={`/students/${student.id}`}>{first_name} {last_name}</Link> | <Link to={`/lessons/${lesson.id}`}>Lesson Details</Link>
                                            {classTime.students[classTime.students.length-1].id === student.id ? <br/> : <Divider/>}
                                        </div>
                                        )
                                    })}</Table.Cell>
                                    <Table.Cell>{desiredContacts.map( contact => {
                                        let {first_name,last_name, phone_number, email} = contact
                                        return(
                                            <Link to={`/contacts/${contact.id}`} key={contact.id}>
                                                {first_name} {last_name}
                                                <br/>
                                                {phone_number}ß
                                                <br/>
                                                {email}
                                                <br/>
                                                {classTime.contacts[classTime.contacts.length-1].id === contact.id ? <br/> : <Divider/>}
                                            </Link>
                                        )
                                    })}</Table.Cell>
                                    <Table.Cell>{desiredLessons.map( lesson => {
                                        return(
                                            <div key={lesson.id}>
                                                {lesson.instructor_notes}
                                                {classTime.lessons[classTime.lessons.length-1].id === lesson.id ? <br/> : <Divider/>}
                                            </div>
                                        )
                                    })}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
                <Divider/>
            </div>
        )
    }

    componentDidMount(){
        this.props.initialFetch(this.props.instructor_id)
    }

}

const mapStateToProps = state =>(
    {
        class_times: state.desiredClassTimes,
        instructor_id: state.desiredInstructor.id
    }
)

const mapDispatchToProps = {
    initialFetch: (instructor_id)=>dispatch=>{
        fetch(`http://localhost:5000/class_times/${instructor_id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(class_times => {
            class_times.error ? dispatch(authFail()) : dispatch(fetchDesiredClassTimes(class_times))
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorSchedule);