import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { updateDesiredFamily } from '../actions/families';

class NewContactForm extends React.Component{

    state={
        submitted: false
    }

    handleSubmit(info){
        let keys = ['first_name','last_name','relation_to_students','billing_address','phone_number','emergency_number','email']
        let newContactInfo = {}
        keys.forEach( key => newContactInfo[key]=info[key].value )
        newContactInfo.family_id = this.props.family.id
        newContactInfo.school_id = this.props.family.school_id

        fetch('http://localhost:5000/contacts',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newContactInfo)
        })
        .then(r=>r.json())
        .then(contact =>{
            if(contact.error){
                this.props.dispatch(authFail())
            }else{
                this.props.dispatch(updateDesiredFamily('contacts',[...this.props.family.contacts, contact]))
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

        return(<div>
            <Divider/>
            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Input id='first_name' required fluid label='First Name' />
                    <Form.Input id='last_name' required fluid label='Last Name' />
                    <Form.Input id='relation_to_students' required fluid label='Relation to Students' />
                </Form.Group>
                <Form.Input id='billing_address' fluid label='Billing Address' />
                <Form.Group widths='equal'>
                    <Form.Input id='phone_number' required fluid label='Phone Number' />
                    <Form.Input id='emergency_number' fluid label='Emergency Number' />
                    <Form.Input id='email' required fluid label='Email' />
                </Form.Group>
                <Button type='submit'>Add Contact</Button>
                {this.state.submitted ? <Message success header='Contact has been added' /> : null}
            </Form>
            <Divider/>
        </div>)
    }
}

export default connect(state => ({ currentUser: state.currentUser, family: state.desiredFamily }))(NewContactForm);