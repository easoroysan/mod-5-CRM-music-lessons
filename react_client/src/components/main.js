import React from 'react'
import { connect } from 'react-redux'
import { Header, Icon, Table, Divider } from 'semantic-ui-react'
import { fetchLessons } from '../actions/lessons';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom'


class MainPage extends React.Component{

    render(){

        let date = new Date()
        let dayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ]
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
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.props.lessons.filter(lesson => lesson.class_time.day === dayNames[date.getDay()] && lesson.school.name === school.name)
                                .sort( (a,b) => a.instructor.last_name > b.instructor.last_name ? 1 : a.instructor.last_name < b.instructor.last_name ? -1 : 0)
                                .map( lesson =>(
                                    <Table.Row key={lesson.id}>
                                        <Table.Cell><Link to={`/instructors/${lesson.instructor.id}`} >{lesson.instructor.first_name} {lesson.instructor.last_name}</Link></Table.Cell>
                                        <Table.Cell>{lesson.class_time.start_time}-{lesson.class_time.end_time}</Table.Cell>
                                        <Table.Cell><Link to={`/students/${lesson.student.id}`} >{lesson.student.first_name} {lesson.student.last_name}</Link></Table.Cell>
                                        <Table.Cell>{lesson.instrument}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                ))}
            </div>
        )
    }

    componentDidMount(){
        fetch('http://localhost:5000/lessons',{
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

export default connect(state => ({ currentUser: state.currentUser, lessons: state.lessons }))(MainPage)

