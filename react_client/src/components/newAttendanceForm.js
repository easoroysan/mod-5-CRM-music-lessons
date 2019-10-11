import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { fetchDesiredLesson, updateLessons } from '../actions/lessons';

class NewAttendanceForm extends React.Component{

    state ={
        submitted: false,
        makeUpStatus: false
    }

    handleSubmit(info){
        let make_up = this.state.makeUpStatus
        let keys = ['date','status','make_up','cancelled_date']
        let attendanceInfo = { lesson_id: this.props.lesson.id, school_id: this.props.lesson.school_id }
        keys.forEach( key => {
            if(key === 'make_up'){
                attendanceInfo[key]=make_up
            }else if(key === 'cancelled_date' && !make_up){
                attendanceInfo[key]=null
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
                this.setState({ submitted: true })
                this.props.dispatch(fetchDesiredLesson(lesson))
                this.props.dispatch(updateLessons(lesson))
                this.submitInterval = setInterval( ()=>this.setState({submitted: false}),3000)
            }
        })
    }

    componentDidMount(){
        fetchDesiredLesson(this.props.lesson)
    }

    componentWillUnmount(){
        clearInterval(this.submitInterval)
    }

    render(){
        let date = new Date()
        let padToTwo = number => number <= 99 ? `0${number}`.slice(-2) : number;
        let today = `${date.getFullYear()}-${padToTwo( date.getMonth()+1 )}-${padToTwo( date.getDate() )}`

        return(<div>

            <Form
                success
                style={{margin: '10px'}}
                onSubmit={ (e)=>this.handleSubmit(e.target) }
            >
                    
                <Form.Group widths='equal'>
                    <Form.Input id='date' type='date' defaultValue={today} required fluid label='Date' />
                    <Form.Input id='status' required fluid label='Status' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        selection
                        options={[
                            { key: 1, value: true, text: "True" },
                            { key: 2, value: false, text: "False" }
                        ]}
                        value={this.state.makeUpStatus}
                        label="Make-Up"
                        onChange={(e,d)=>{
                            this.setState({ makeUpStatus: d.value })
                        }}
                    />
                    {
                        this.state.makeUpStatus ? 
                        <Form.Input required id='cancelled_date' type='date' fluid label='Cancelled Date' />
                        :
                        null
                    }
                </Form.Group>
                <Button type='submit'>Add Attendance</Button>
                {this.state.submitted ? <Message success header='Attendance submitted' /> : null}
                
            </Form>
        </div>)
    }
}

const mapStateToProps = state =>(
    {
        lesson: state.desiredLesson
    }
)

export default connect(mapStateToProps)(NewAttendanceForm);