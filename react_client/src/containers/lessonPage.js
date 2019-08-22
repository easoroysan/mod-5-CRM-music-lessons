import React from 'react'
import { connect } from 'react-redux';
import { fetchDesiredLesson, updateDesiredLesson, updateLessons } from '../actions/lessons';
import { authFail } from '../actions/current_user';
import { Header, Icon, Form, Button, Divider, Message, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NewAttendanceForm from '../components/newAttendanceForm';

class LessonPage extends React.Component{

    state={
        old_lesson: {},
        attendanceForm: false,
        editAttendance: null
    }

    handleChange = (key,info) => this.props.dispatch(updateDesiredLesson(key,info))
    handleSubmit = () => {
        fetch(`http://localhost:5000/lessons/${this.props.lesson.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.props.lesson)
        })
        .then(r=>r.json())
        .then( lesson =>{
            this.setState({
                success: true,
                old_lesson: lesson
            })
            this.intervalID = setInterval(() => {
                this.setState({
                    success: false
                })
            }, 1000);
        })
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    handleAttendanceSubmit(info,id){
        let keys = ['date','status','cancelled_date']
        let attendanceInfo = { make_up: parseInt(info.make_up.value) }
        keys.forEach( key => attendanceInfo[key]=info[key].value )

        fetch(`http://localhost:5000/attendances/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(attendanceInfo)
        })
        .then(r=>r.json())
        .then(lesson =>{
            if(lesson.error){
                this.props.dispatch(authFail())
            }else{
                this.props.dispatch(fetchDesiredLesson(lesson))
                this.props.dispatch(updateLessons(lesson))
                this.setState({ editAttendance: null })
            }
        })
    }


    render(){
        let { active, class_time, instructor, student, school, instructor_notes, instrument, misc_notes, attendances } = this.props.lesson
        let { day, start_time, end_time } = class_time
        return(<div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='book' />
                <Header.Content>{active ? null : "(Inactive)"} {day} | {start_time}-{end_time} | {instrument}</Header.Content>
                <Header.Subheader>{instructor.first_name} {instructor.last_name} teaching {student.first_name} {student.last_name} at {school.name}</Header.Subheader>
                <Link to={`/instructors/${instructor.id}`}><Button>Go to Instructor</Button></Link>
                <Link to={`/students/${student.id}`}><Button>Go to Student</Button></Link>
            </Header>

            <Divider/>
            <Form success style={{margin: '10px'}} onSubmit={()=>this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        required 
                        selection
                        options={[
                            { key: 1, value: true, text: "Active" },
                            { key: 2, value: false, text: "Inactive" }
                        ]}
                        value={active}
                        label="Active"
                        onChange={(e,d)=>{
                            this.handleChange('active',d.value)
                        }}
                    />
                    <Form.Input fluid required label='Instrument' value={instrument} onChange={(e)=>this.handleChange('instrument',e.target.value)}/>
                </Form.Group>
                <Form.TextArea label='Instructor Notes' value={instructor_notes} onChange={(e)=>this.handleChange('instructor_notes',e.target.value)}></Form.TextArea>
                <Form.TextArea label='Miscellaneous Notes' value={misc_notes} onChange={(e)=>this.handleChange('misc_notes',e.target.value)}></Form.TextArea>

                <Button type='submit' onClick={this.handleSubmit}>Save Changes</Button>
                <Button onClick={()=> this.props.dispatch(fetchDesiredLesson(this.state.old_lesson))}>Revert Changes</Button>
                {this.state.success ? <Message success header='Changes have been saved' /> : null}
            </Form>
            <Divider />

            <Header as='h2'>
                <Header.Content>Attendance</Header.Content><br/>
                <Button onClick={()=> this.setState({ attendanceForm: !this.state.attendanceForm })}>{this.state.attendanceForm ? 'Hide Form' : 'Add a Attendance'}</Button>
            </Header>

            {this.state.attendanceForm ? <NewAttendanceForm/> : null}

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
                        this.state.editAttendance===attendance.id ?
                        <Table.Row key={attendance.id}>
                            <Table.Cell>
                                <Form key={attendance.id} style={{margin: '10px'}} onSubmit={(e)=>this.handleAttendanceSubmit(e.target,attendance.id)}>
                                    <Form.Group widths='equal'>
                                        <Form.Input id='date' type='date' defaultValue={attendance.date} required fluid label='Date' />
                                        <Form.Input id='status' defaultValue={attendance.status} required fluid label='Status' />
                                        <Form.Input id='make_up' defaultValue={attendance.make_up ? 1 : 0} type='number' fluid label='Make-up Lesson' />
                                        <Form.Input id='cancelled_date' type='date' defaultValue={attendance.cancelled_date} fluid label='Cancelled Date' />
                                        <Button type='submit'>Confirm Attendance</Button>
                                    </Form.Group>
                                </Form>
                            </Table.Cell>
                        </Table.Row>
                        :
                        <Table.Row key={attendance.id}>
                            <Table.Cell>
                                {attendance.date}
                                {
                                    this.state.editAttendance === attendance.id ?
                                    <Button onClick={()=> this.setState({ editAttendance: null })}>Hide Form</Button>
                                    :
                                    <Button onClick={()=> this.setState({ editAttendance: attendance.id })}>Edit Attendance</Button>
                                }
                            </Table.Cell>
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
            lesson.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredLesson(lesson))
            this.setState({ old_lesson: lesson})
        })
    }

    componentWillUnmount(){
        this.props.dispatch(fetchDesiredLesson({
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
}

export default connect(state => ({ lesson: state.desiredLesson }))(LessonPage);