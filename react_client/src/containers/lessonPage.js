import React from 'react'
import { connect } from 'react-redux';
import { fetchDesiredLesson } from '../actions/lessons';
import { authFail } from '../actions/current_user';
import { Header, Icon, Form, Button, Divider, Message, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class LessonPage extends React.Component{
    render(){
        let { active, class_time, id, instructor, student, school, instructor_notes, instrument, misc_notes, attendances } = this.props.lesson
        let { day, start_time, end_time } = class_time
        return(<div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='book' />
                <Header.Content>{day} | {start_time}-{end_time} | {instrument}</Header.Content>
                <Header.Subheader>{instructor.first_name} {instructor.last_name} teaching {student.first_name} {student.last_name}</Header.Subheader>
                <Link to={`/instructors/${instructor.id}`}><Button>Go to Instructor</Button></Link>
                <Link to={`/students/${student.id}`}><Button>Go to Student</Button></Link>
            </Header>

            <Divider />

            <Header as='h2'>
                <Header.Content>Attendance</Header.Content>
            </Header>

            <Table celled>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Make-Up</Table.HeaderCell>
                        <Table.HeaderCell>Cancelled Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {attendances.map( attendance =>(
                        <Table.Row key={attendance.id}>
                            <Table.Cell>{attendance.date}</Table.Cell>
                            <Table.Cell>{attendance.status}</Table.Cell>
                            <Table.Cell>{attendance.make_up ? "Yes" : "No"}</Table.Cell>
                            <Table.Cell>{attendance.cancelled_date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>)
    }

    componentDidMount(){
        let id = window.location.href.split("/").pop()
        fetch(`http://localhost:5000/lessons/${id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(lesson => {
            console.log('fetched: ', lesson)
            lesson.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredLesson(lesson))
        })
    }
}

export default connect(state => ({ lesson: state.desiredLesson }))(LessonPage);