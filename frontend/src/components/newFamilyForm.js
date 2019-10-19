import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { authFail } from '../actions/current_user';
import { fetchURL } from '../actions/variables';

class NewFamilyForm extends React.Component{

    state={
        submitted: false,
        family_id: "",
        school_id: null
    }

    handleSubmit(info){

        if(!this.state.school_id){
            alert("Please select a school")
        }else{

            let familyInfo = {
                family_name: info.family_name.value,
                school_id: this.state.school_id,
                misc_notes: "",
                billing_total: 0
            }
            
            fetch(`${fetchURL}/families`,{
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
    }
    
    render(){

        let schoolOptions = this.props.currentUser.schools.map( school => ({key:school.id, value:school.id, text:school.name}))

        return(<div>

            {this.state.submitted ? <Redirect to={`/families/${this.state.family_id}`}/> : null}

            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Select
                        id='schools'
                        required
                        options={schoolOptions}
                        value={this.state.school_id}
                        label='Schools'
                        onChange={ (e,d) => this.setState({ school_id: d.value })}
                    />
                    <Form.Input id='family_name' required fluid label='Family Name' />
                </Form.Group>
                
                <Button type='submit'>Add Family</Button>
            </Form>
        </div>)
    }
}

const mapStateToProps = state =>(
    {
        currentUser: state.currentUser
    }
)

export default connect(mapStateToProps)(NewFamilyForm);