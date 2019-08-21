import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Divider } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
// import { addDesiredClassTime } from '../actions/class_times';

class NewLessonForm extends React.Component{

    state={
        submitted: false
    }

    handleSubmit(info){
        let lessonInfo = {
            instructor_id: "",
            class_time_id: "",
            school_id: "",
            active: true,
            instructor_notes: "",
            misc_notes: ""
            // add school and day
        }

        fetch('http://localhost:5000/lessons',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(lessonInfo)
        })
        .then(r=>r.json())
        .then(lesson =>{
            if(lesson.error){
                this.props.dispatch(authFail())
            }else{
                this.props.dispatch(addDesiredClassTime(lesson))
                this.setState({ submitted: true })
                setInterval(() => {
                    this.setState({
                        submitted: false
                    })
                }, 2000);
            }
        })
    }

    render(){
        let instructorOptions = []
        let classTimeOptions = []

        return(<div>
            <Divider />
            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Select
                        id='instructor'
                        required 
                        options={instructorOptions}
                        label='Instructor'
                    />
                    {/* Show after Instructor is selected */}
                    <Form.Select
                        id='class_time'
                        required 
                        options={classTimeOptions}
                        label='Class Time'
                    />
                    {/* Show after time is selected */}
                    <Form.Select
                        id='instrument'
                        required 
                        options={classTimeOptions}
                        label='Instrument'
                    />
                    <Form.TextArea id='instructor_notes' label='Instructor Notes' ></Form.TextArea>
                    <Form.TextArea id='misc_notes' label='Miscellaneous Notes' ></Form.TextArea>
                </Form.Group>
                
                <Button type='submit'>Add Lesson</Button>
            </Form>
            <Divider />
        </div>)
    }
}

export default connect(state => ({ currentUser: state.currentUser, instructor: state.desiredInstructor }))(NewClassTimeForm);