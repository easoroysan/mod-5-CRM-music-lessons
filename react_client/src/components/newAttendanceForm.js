import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { fetchDesiredLesson, updateLessons } from '../actions/lessons';

class NewAttendanceForm extends React.Component{

    state={
        submitted: false
    }

    handleSubmit(info){
        let keys = ['date','status','make_up','cancelled_date']
        let attendanceInfo = { lesson_id: this.props.lesson.id, school_id: this.props.lesson.school_id }
        keys.forEach( key => {
            if(key === 'make_up'){
                attendanceInfo[key]=parseInt(info[key].value)
            }else{
                attendanceInfo[key]=info[key].value
            }
        })

        fetch('http://localhost:5000/attendances',{
            method: 'POST',
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
                this.setState({ submitted: true })
                this.intervalID = setInterval(() => {
                    this.setState({
                        submitted: false
                    })
                }, 1000);
            }
        })
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){
        let date = new Date()
        let padToTwo = number => number <= 99 ? `0${number}`.slice(-2) : number;
        let today = `${date.getFullYear()}-${padToTwo( date.getMonth()+1 )}-${padToTwo( date.getDate() )}`

        return(<div>

            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Input id='date' type='date' defaultValue={today} required fluid label='Date' />
                    <Form.Input id='status' required fluid label='Status' />
                    <Form.Input id='make_up' defaultValue={0} type='number' fluid label='Make-up Lesson' />
                    <Form.Input id='cancelled_date' type='date' fluid label='Cancelled Date' />
                    <Button type='submit'>Add Attendance</Button>
                </Form.Group>
                {this.state.submitted ? <Message success header='Attendance has been added' /> : null}
                
            </Form>
        </div>)
    }
}

export default connect(state => ({ lesson: state.desiredLesson }))(NewAttendanceForm);