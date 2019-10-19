import React from 'react'
import { connect } from 'react-redux'
import { Header, Icon, Table, Divider, Button } from 'semantic-ui-react'
import { fetchLessons, fetchDesiredLesson } from '../actions/lessons';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom'
import NewAttendanceForm from './newAttendanceForm';
import { fetchURL } from '../actions/variables';


class MainPage extends React.Component{

    componentDidMount(){
        this.props.initialFetch()
    }

    render(){
        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='music' circular />
                    <Header.Content>Hello {this.props.currentUser.first_name}</Header.Content>
                    <Header.Subheader>Here are today's lessons</Header.Subheader>
                </Header>

                {this.props.currentUser.schools.map( school =>(
                    <div key={school.id}>
                        <Divider/>
                        <Header as='h2'>
                            <Header.Content>{school.name}</Header.Content>
                        </Header>
                        <Table celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Instructor</Table.HeaderCell>
                                    <Table.HeaderCell>Time</Table.HeaderCell>
                                    <Table.HeaderCell>Student</Table.HeaderCell>
                                    <Table.HeaderCell>Instrument</Table.HeaderCell>
                                    <Table.HeaderCell>Last Attendance</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.props.lessons.filter(lesson => lesson.school.name === school.name && lesson.active)
                                .sort( (a,b) => a.instructor.last_name > b.instructor.last_name ? 1 : a.instructor.last_name < b.instructor.last_name ? -1 : 0)
                                .map( lesson =>{
                                    let lastAttendance = {}
                                    if(lesson.attendances.length > 0){
                                        lastAttendance = lesson.attendances[lesson.attendances.length-1]
                                    }
                                    let { date, status, make_up, cancelled_date } = lastAttendance
                                    return(
                                        <Table.Row key={lesson.id}>
                                        <Table.Cell><Link to={`/instructors/${lesson.instructor.id}`} >{lesson.instructor.first_name} {lesson.instructor.last_name}</Link></Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/lessons/${lesson.id}`}>{lesson.class_time.day} | {lesson.class_time.start_time}-{lesson.class_time.end_time}</Link>
                                            {
                                                this.props.lesson_id !== lesson.id ?
                                                <Button onClick={()=> this.props.showForm(lesson)}>Add an Attendance</Button>
                                                :
                                                <Button onClick={()=> this.props.hideForm()}>Hide Form</Button>
                                            }
                                            {this.props.lesson_id===lesson.id ? <NewAttendanceForm/> : null}
                                        </Table.Cell>
                                        <Table.Cell><Link to={`/students/${lesson.student.id}`} >{lesson.student.first_name} {lesson.student.last_name}</Link></Table.Cell>
                                        <Table.Cell>{lesson.instrument}</Table.Cell>
                                        <Table.Cell>{lesson.attendances.length > 0 ? `${date} | ${status} ${make_up ? `| Make-up for lesson missed on ${cancelled_date}` : ""}` : null}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                ))}
            </div>
        )
    }

}

const mapStateToProps = state =>(
    {
        currentUser: state.currentUser,
        lessons: state.lessons,
        lesson_id: state.desiredLesson.id
    }
)

const mapDispatchToProps = {
    initialFetch: ()=>dispatch=>{
        let date = new Date()
        let dayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ]
        fetch(`${fetchURL}/lessons/day_${dayNames[date.getDay()]}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(lessons => {
            lessons.error ? dispatch(authFail()) : dispatch(fetchLessons(lessons))
        })
    },
    showForm: (lesson) => dispatch => dispatch(fetchDesiredLesson(lesson)),
    hideForm: () => dispatch => dispatch(fetchDesiredLesson({
        class_time: { start_time: "" },
        student: {},
        instructor: {},
        attendances: [],
        school: {},
        instrument: "",
        instructor_notes: "",
        misc_notes: ""
    }))
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

