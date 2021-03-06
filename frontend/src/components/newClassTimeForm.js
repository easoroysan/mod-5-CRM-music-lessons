import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Divider, Message } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { addDesiredClassTime } from '../actions/class_times';
import { fetchURL } from '../actions/variables';

class NewClassTimeForm extends React.Component{

    state={
        submitted: false,
        school_id: null,
        day: null
    }

    handleSubmit(info){

        if(!this.state.school_id){
            alert("Please select a school")
        }else if(!this.state.day){
            alert("Please select a day")
        }else{

            let classTimeInfo = {
                instructor_id: this.props.instructor.id,
                start_time: info.start_time.value,
                end_time: info.end_time.value,
                active: true,
                day: this.state.day,
                school_id: this.state.school_id
            }
            
            fetch(`${fetchURL}/class_times`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(classTimeInfo)
            })
            .then(r=>r.json())
            .then(class_time =>{
                if(class_time.error){
                    this.props.dispatch(authFail())
                }else{
                    this.props.dispatch(addDesiredClassTime(class_time))
                    this.setState({ submitted: true })
                    this.intervalID = setInterval( ()=>(
                        this.setState({ submitted: false })
                    ),3000)
                }
            })
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){

        let schoolOptions = this.props.currentUser.schools.map( school => ({key:school.id, value:school.id, text:school.name}))
        let dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        let dayOptions = dayNames.map( day => ({key: dayNames.indexOf(day), value: day, text: day}))
        return(<div>
            <Divider />
            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Select
                        id='school'
                        required
                        options={schoolOptions}
                        value={this.state.school_id}
                        label='Schools'
                        onChange={(e,d)=>{
                            this.setState({ school_id: d.value })
                        }}
                    />
                    <Form.Select
                        id='day'
                        required 
                        options={dayOptions}
                        value={this.state.day}
                        label='Day'
                        onChange={(e,d)=>{
                            this.setState({ day: d.value })
                        }}
                    />
                    <Form.Input id='start_time' required type='time' fluid label='Start Time' />
                    <Form.Input id='end_time' required type='time' fluid label='End Time' />
                </Form.Group>
                
                <Button type='submit'>Add Class Time</Button>
                {this.state.submitted ? <Message success header='Class time has been added' /> : null}
            </Form>
            <Divider />
        </div>)
    }
}

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        instructor: state.desiredInstructor
    }
)


export default connect(mapStateToProps)(NewClassTimeForm);