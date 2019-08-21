import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { fetchLessons } from '../actions/lessons';
import { authFail } from '../actions/current_user';


class StudentLessons extends React.Component{

    state = {
        addLessonForm: false
    }

    render(){
        return(
            <div>
                <Divider/>
                <Header as='h2' textAlign='center'>
                    <Header.Content>Lessons</Header.Content><br/>
                    <Button onClick={()=> this.setState({ addLessonForm: !this.state.addLessonForm })}>{this.state.addLessonForm ? 'Hide Form' : 'Add a Lesson'}</Button>
                </Header>

                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Instructor</Table.HeaderCell>
                            <Table.HeaderCell>Instructor Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.lessons.map( lesson =>{
                            let {day, start_time, end_time} = lesson.class_time
                            return (
                                <Table.Row key={lesson.id}>
                                    <Table.Cell><Link to={`/lessons/${lesson.id}`}>{day} | {start_time}-{end_time}</Link></Table.Cell>
                                    <Table.Cell>{lesson.active ? "Active" : "Inactive"}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/instructors/${lesson.instructor.id}`}>
                                            {lesson.instructor.first_name} {lesson.instructor.last_name}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{lesson.instructor_notes}</Table.Cell>
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
        fetch(`http://localhost:5000/lessons/student_${this.props.student_id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(lessons => {
            lessons.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchLessons(lessons))
        })
    }

}


export default connect(state => ({ lessons: state.lessons, student_id: state.desiredStudent.id }))(StudentLessons);