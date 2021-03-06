import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { authFail } from '../actions/current_user';
import { fetchURL } from '../actions/variables';

class NewInstructorForm extends React.Component{

    state={
        school_ids: [],
        submitted: false,
        instructor_id: ""
    }

    handleSubmit(info){
        if(this.state.school_ids.length <= 0){
            alert("Please select at least one school")
        }else{
            let keys = [
                'first_name',
                'last_name',
                'date_of_birth',
                'billing_address',
                'pay_rate',
                'phone_number',
                'emergency_number',
                'email','instrument_1',
                'instrument_2',
                'instrument_3',
                'biography',
                'misc_notes'
            ]
            
            let newInstructorInfo = { active: true , schools: this.state.school_ids }
            keys.forEach( key => newInstructorInfo[key]=info[key].value )
            
            fetch(`${fetchURL}/instructors`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newInstructorInfo)
            })
            .then(r=>r.json())
            .then(instructor =>{
                if(instructor.error){
                    this.props.dispatch(authFail())
                }else{
                    alert("The instructor has been added. Confirm to redirect to the instructor's information")
                    this.setState({ submitted: true, instructor_id: instructor.id })
                }
            })
        }
    }

    render(){

        let schoolOptions = this.props.currentUser.schools.map( school => ({key:school.id, value:school.id, text:school.name}))

        return(<div>

            {this.state.submitted ? <Redirect to={`/instructors/${this.state.instructor_id}`}/> : null}

            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    <Form.Group widths='equal'>
                        <Form.Input id='first_name' required fluid label='First name'/>
                        <Form.Input id='last_name' required fluid label='Last name'/>
                        <Form.Input id='date_of_birth' defaultValue='2000-01-01' required fluid label='Date of birth' type='date'/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input id='billing_address' fluid label='Billing Address' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select
                            id='schools'
                            required
                            multiple
                            value={this.state.school_ids}
                            options={schoolOptions}
                            label='Schools'
                            onChange={ (e,d) => this.setState({ school_ids: d.value }) }
                        />
                        <Form.Input id='pay_rate' defaultValue={0} fluid label='Pay Rate' type="number"/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input id='phone_number' required fluid label='Phone Number' type='text'/>
                        <Form.Input id='emergency_number' fluid label='Emergency Number' type='tel'/>
                        <Form.Input id='email' required fluid label='Email' type='email'/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input id='instrument_1' required fluid label='Instrument 1' />
                        <Form.Input id='instrument_2' fluid label='Instrument 2' />
                        <Form.Input id='instrument_3' fluid label='Instrument 3' />
                    </Form.Group>
                    <Form.TextArea id='biography' label='Biography' ></Form.TextArea>
                    <Form.TextArea id='misc_notes' label='Miscellaneous Notes' ></Form.TextArea>
                    <Button type='submit'>Add Instructor</Button>
                </Form>
        </div>)
    }
}

const mapStateToProps = state =>(
    {
        currentUser: state.currentUser
    }
)

export default connect(mapStateToProps)(NewInstructorForm);