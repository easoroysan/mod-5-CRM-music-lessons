import React from "react";
import { connect } from "react-redux";
import { Header, Icon, Form, Button, Divider, Message } from 'semantic-ui-react';
import { fetchDesiredInstructor, updateDesiredInstructor } from '../actions/instructors';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom'
import InstructorSchedule from '../components/instructorSchedule'

class InstructorPage extends React.Component{

    state={
        old_instructor:{},
        success: false,
        schedule: false
    }

    runFetch = () =>{
        fetch(`http://localhost:5000/instructors/${this.props.instructor.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.props.instructor)
        })
        .then(r=>r.json())
        .then( instructor =>{
            this.setState({
                success: true,
                old_instructor: instructor
            })
            this.intervalID = setInterval(() => {
                this.setState({
                    success: false
                })
            }, 1000);
        })
    }

    handleChange = (key,info) => this.props.dispatch(updateDesiredInstructor(key,info))
    handleSubmit = (info) => {
        if(this.state.old_instructor.active && !this.props.instructor.active){
            let checker = window.confirm("Are you sure you want to set this Instructor to Inactive? All class times and lessons associated with this instructor will be set to inactive.")
            if(checker){
                this.runFetch()
            }
        }else{
            this.runFetch()
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){
        let {first_name,last_name, instrument_1, instrument_2, instrument_3, phone_number, emergency_number, email, date_of_birth, billing_address, pay_rate, active, biography, misc_notes, schools} = this.props.instructor
        let schoolOptions = this.props.currentUser.schools.map( school => ({key:school.id, value:school.id, text:school.name}))

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='microphone' />
                    <Header.Content>{this.state.old_instructor.first_name} {this.state.old_instructor.last_name}</Header.Content>
                    <Link to='/instructors' ><Button>Go to Instructors</Button></Link>
                    <Button onClick={()=> this.setState({ schedule: !this.state.schedule })}>{this.state.schedule ? 'Hide' : 'Show'} Schedule</Button>
                </Header>

                {this.state.schedule ? <InstructorSchedule /> : <Divider/>}

                <Form success style={{margin: '10px'}} onSubmit={(e)=> this.handleSubmit(e)}>
                    <Form.Group widths='equal'>
                        <Form.Input required fluid label='First name' value={first_name} onChange={(e)=>this.handleChange('first_name',e.target.value)}/>
                        <Form.Input required fluid label='Last name' value={last_name} onChange={(e)=>this.handleChange('last_name',e.target.value)}/>
                        <Form.Input required fluid label='Date of birth' type='date' value={date_of_birth} onChange={(e)=>this.handleChange('date_of_birth',e.target.value)}/>
                    </Form.Group>
                    <Form.Input fluid label='Billing Address' value={billing_address} onChange={(e)=>this.handleChange('billing_address',e.target.value)}/>
                    <Form.Group widths='equal'>
                        {/* Need to find a way for instructors with lessons at that school to not be able to leave school or auto disable all those lessons */}
                        <Form.Dropdown
                            id='schools'
                            required 
                            multiple
                            selection
                            options={schoolOptions}
                            value={schools.map( school => school.id)}
                            label="Schools"
                            onChange={(e,d)=>{
                                let desiredSchools = this.props.currentUser.schools.filter( school => d.value.includes(school.id))
                                this.handleChange('schools',desiredSchools)
                            }}
                        />
                        <Form.Input fluid label='Pay Rate' type="number" value={pay_rate} onChange={(e)=>this.handleChange('pay_rate',e.target.value)}/>
                        <Form.Input required fluid label='Active (change to true or false for answers)' type="number" value={active ? 1 : 0} onChange={(e)=>this.handleChange('active',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input required fluid label='Phone Number' type='text' value={phone_number} onChange={(e)=>this.handleChange('phone_number',e.target.value)}/>
                        <Form.Input fluid label='Emergency Number' type='tel' value={emergency_number} onChange={(e)=>this.handleChange('emergency_number',e.target.value)}/>
                        <Form.Input required fluid label='Email' type='email' value={email} onChange={(e)=>this.handleChange('email',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input required fluid label='Instrument 1' value={instrument_1} onChange={(e)=>this.handleChange('instrument_1',e.target.value)}/>
                        <Form.Input fluid label='Instrument 2' value={instrument_2} onChange={(e)=>this.handleChange('instrument_2',e.target.value)}/>
                        <Form.Input fluid label='Instrument 3' value={instrument_3} onChange={(e)=>this.handleChange('instrument_3',e.target.value)}/>
                    </Form.Group>
                    <Form.TextArea label='Biography' value={biography} onChange={(e)=>this.handleChange('biography',e.target.value)}></Form.TextArea>
                    <Form.TextArea label='Miscellaneous Notes' value={misc_notes} onChange={(e)=>this.handleChange('misc_notes',e.target.value)}></Form.TextArea>
                    <Button type='submit'>Save Changes</Button>
                    <Button onClick={()=> this.props.dispatch(fetchDesiredInstructor(this.state.old_instructor))}>Revert Changes</Button>
                    {this.state.success ? <Message success header='Changes have been saved' /> : null}
                </Form>
            </div>
        )
    }

    componentDidMount(){
        let id = window.location.href.split("/").pop()
        fetch(`http://localhost:5000/instructors/${id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(instructor => {
            this.setState({ old_instructor:instructor })
            instructor.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredInstructor(instructor))
        })
    }
}

export default connect(state => ({ instructor: state.desiredInstructor, currentUser: state.currentUser }))(InstructorPage);