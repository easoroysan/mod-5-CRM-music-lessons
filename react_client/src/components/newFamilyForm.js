import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { authFail } from '../actions/current_user';

class NewFamilyForm extends React.Component{

    state={
        submitted: false,
        family_id: ""
    }

    handleSubmit(info){
        let familyInfo = { family_name: info.family_name.value, misc_notes: "", billing_total: 0 }

        fetch('http://localhost:5000/families',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(familyInfo)
        })
        .then(r=>r.json())
        .then(family =>{
            family.error ? this.props.dispatch(authFail()) : this.setState({ submitted: true, family_id: family.id })
        })
    }

    render(){

        let schoolOptions = this.props.currentUser.schools.map( school => ({key:school.id, value:school.id, text:school.name}))

        return(<div>

            {this.state.submitted ? <Redirect to={`/families/${this.state.family_id}`}/> : null}

            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    {/* Can't get schools on submission */}
                    <Form.Select
                        id='schools'
                        required 
                        options={schoolOptions}
                        label='Schools'
                    />
                    <Form.Input id='family_name' fluid label='Family Name' />
                </Form.Group>
                
                <Button type='submit'>Add Family</Button>
            </Form>
        </div>)
    }
}

export default connect(state => ({ currentUser: state.currentUser }))(NewFamilyForm);