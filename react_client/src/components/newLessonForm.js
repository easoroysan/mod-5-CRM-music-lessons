import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Divider, Message } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { fetchInstructors, fetchDesiredInstructor } from '../actions/instructors';
import { addDesiredLesson } from '../actions/lessons';

class NewLessonForm extends React.Component{

    state={
        submitted: false,
        instructorChosen: false
    }

    handleSubmit(info){

        let textInfoClass = info.children[0].children[2].children[1].children[1].innerText
        let class_id = textInfoClass.split(" | ")[2].split(":")[1]

        let instrument = info.children[0].children[1].children[1].children[0].innerText

        let lessonInfo = {
            class_time_id: parseInt(class_id),
            school_id: this.props.student.school_id,
            instrument,
            active: true,
            instructor_notes: info.instructor_notes.value,
            misc_notes: info.misc_notes.value
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
                this.props.dispatch(addDesiredLesson(lesson))
                this.setState({ submitted: true })
                this.intervalID = setInterval(() => {
                    this.setState({
                        submitted: false
                    })
                }, 2000);
            }
        })
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    instructorSelect = (name) => {
        if(name === ""){
            this.setState({ instructorChosen: false })
        }else{
            let selectedInstructor = this.props.instructors.find( instructor => `${instructor.first_name} ${instructor.last_name}`=== name )
            fetch(`http://localhost:5000/instructors/${selectedInstructor.id}`,{
                method:"GET",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(r=> r.json())
            .then(instructor => {
                if(instructor.error){
                    this.props.dispatch(authFail())
                }else{
                    this.props.dispatch(fetchDesiredInstructor( instructor ))
                    this.setState({ instructorChosen: true })
                }
            })
        }
    }

    render(){
        let instructorOptions = this.props.instructors.filter( instructor =>(
            instructor.active && instructor.class_times.length > 0 && instructor.class_times.some( class_time => class_time.active )
        ))
        .map( instructor => ({ key: instructor.id, value: instructor.id, text: `${instructor.first_name} ${instructor.last_name}`}))

        instructorOptions = [{ key: 0, value: 0, text: ""},...instructorOptions]
        let { instrument_1, instrument_2, instrument_3, class_times } = this.props.selectedInstructor

        let classTimeOptions = class_times.filter( time => time.active )
        .map(class_time => {

            let longStart = class_time.start_time.split("T")[1]
            let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`
    
            let longEnd = class_time.end_time.split("T")[1]
            let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`

            return {
                key: class_time.id,
                value: class_time.id,
                text: `${class_time.day} | ${shortStart}-${shortEnd} | ID:${class_time.id}`
            }
        })

        let instrumentOptions = [instrument_1, instrument_2, instrument_3]
        .filter( instrument => instrument !== "" )
        .map( instrument => ({ key: instrument, value: instrument, text: instrument }))

        return(<div>
            <Divider />
            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Select
                        id='instructor'
                        search
                        required 
                        options={instructorOptions}
                        label='Instructor'
                        onChange={(e)=>{
                            if(e.target.children.length > 0){
                                this.instructorSelect(e.target.children[0].innerText)
                            }
                        }}
                    />
                    {
                        this.state.instructorChosen ?
                        <Form.Select
                            id='instrument'
                            required 
                            options={instrumentOptions}
                            label='Instrument'
                        /> :
                        null
                    }
                    {
                        this.state.instructorChosen ?
                        <Form.Select
                            id='class_time'
                            search
                            required
                            options={classTimeOptions}
                            label='Class Time'
                        /> :
                        null
                    }
                </Form.Group>

                {
                    this.state.instructorChosen ?
                    <div>
                        <Form.TextArea id='instructor_notes' label='Instructor Notes' ></Form.TextArea>
                        <Form.TextArea id='misc_notes' label='Miscellaneous Notes' ></Form.TextArea>

                        <Button type='submit'>Add Lesson</Button>
                        {this.state.submitted ? <Message success header='Lesson has been added' /> : null}
                    </div>
                    :null
                }
            </Form>
            <Divider />
        </div>)
    }

    componentDidMount(){
        fetch('http://localhost:5000/instructors',{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(instructors => {
            if(instructors.error){
                this.props.dispatch(authFail())
            }else{
                let desiredInstructors = instructors.filter(instructor =>{
                    let schoolCheck = instructor.schools.map( school => school.id)
                    return schoolCheck.includes(this.props.student.school_id) && instructor.active
                })
                this.props.dispatch(fetchInstructors( desiredInstructors ))
            }
        })
    }

}

export default connect(state => ({ currentUser: state.currentUser, student: state.desiredStudent, instructors: state.instructors, selectedInstructor: state.desiredInstructor }))(NewLessonForm);