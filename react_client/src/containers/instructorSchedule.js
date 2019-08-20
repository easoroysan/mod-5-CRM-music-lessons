import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { fetchDesiredClassTimes } from '../actions/class_times';
import { authFail } from '../actions/current_user';


class InstructorSchedule extends React.Component{

    render(){
        return(
            <div>
                <Divider/>
                <Header as='h2' textAlign='center'>
                    <Header.Content>Schedule</Header.Content>
                </Header>
                <Table celled style={{margin: '10px'}}>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Students</Table.HeaderCell>
                            <Table.HeaderCell>Primary Contact</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.class_times.map( classTime =>{
                            let {start_time, end_time} = classTime
                            let longStart = start_time.split("T")[1]
                            let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`

                            let longEnd = end_time.split("T")[1]
                            let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`
                            return (
                                <Table.Row key={classTime.id}>
                                    <Table.Cell>{classTime.day} | {classTime.school.name} | {shortStart}-{shortEnd}</Table.Cell>
                                    <Table.Cell>{classTime.students.map( student =>{

                                        let {first_name,last_name} = student
                                        return(
                                            <Link to={`/students/${student.id}`} key={student.id}>
                                                {first_name} {last_name}
                                                {classTime.students[classTime.students.length-1].id === student.id ? <br/> : <Divider/>}
                                            </Link>
                                        )
                                    })}</Table.Cell>
                                    <Table.Cell>{classTime.contacts.map( contact => {
                                        let {first_name,last_name, phone_number, email} = contact
                                        return(
                                            <Link to={`/contacts/${contact.id}`} key={contact.id}>
                                                {first_name} {last_name}
                                                <br/>
                                                {phone_number}
                                                <br/>
                                                {email}
                                                <br/>
                                                {classTime.contacts[classTime.contacts.length-1].id === contact.id ? <br/> : <Divider/>}
                                            </Link>
                                        )
                                    })}</Table.Cell>
                                    <Table.Cell>{classTime.lessons.map( lesson => {
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
        fetch(`http://localhost:5000/class_times/${this.props.instructor_id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(class_times => {
            class_times.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredClassTimes(class_times))
        })
    }

}


export default connect(state => ({ class_times: state.desiredClassTimes, instructor_id: state.desiredInstructor.id }))(InstructorSchedule);