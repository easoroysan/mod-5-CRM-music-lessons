import React from "react";
import { connect } from "react-redux";
import { Header, Icon, Form, Button, Divider, Message } from 'semantic-ui-react';
import { fetchDesiredContact, updateDesiredContact } from '../actions/contacts';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom'

class ContactPage extends React.Component{

    state={
        old_contact:{},
        success: false
    }

    handleChange = (key,info) => this.props.dispatch(updateDesiredContact(key,info))
    handleSubmit = () => {
        fetch(`http://localhost:5000/contacts/${this.props.contact.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.props.contact)
        })
        .then(r=>r.json())
        .then( contact =>{
            this.setState({
                success: true,
                old_contact: contact
            })
            setInterval(() => {
                this.setState({
                    success: false
                })
            }, 1000);
        })
    }

    render(){
        let {first_name,last_name, relation_to_students, phone_number, emergency_number, email, billing_address, family_id} = this.props.contact

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='phone' />
                    <Header.Content>{this.state.old_contact.first_name} {this.state.old_contact.last_name}</Header.Content>
                    <Link to={`/families/${family_id}`} ><Button>Return to Family Page</Button></Link>
                </Header>

                <Divider/>

                <Form success style={{margin: '10px'}} onSubmit={()=>this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First name' value={first_name} onChange={(e)=>this.handleChange('first_name',e.target.value)}/>
                        <Form.Input fluid label='Last name' value={last_name} onChange={(e)=>this.handleChange('last_name',e.target.value)}/>
                        <Form.Input fluid label='Relation to Students' value={relation_to_students} onChange={(e)=>this.handleChange('relation_to_students',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Billing Address' value={billing_address} onChange={(e)=>this.handleChange('billing_address',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Phone Number' type='text' value={phone_number} onChange={(e)=>this.handleChange('phone_number',e.target.value)}/>
                        <Form.Input fluid label='Emergency Number' type='tel' value={emergency_number} onChange={(e)=>this.handleChange('emergency_number',e.target.value)}/>
                        <Form.Input fluid label='Email' type='email' value={email} onChange={(e)=>this.handleChange('email',e.target.value)}/>
                    </Form.Group>
                    <Button type='submit' onClick={this.handleSubmit}>Save Changes</Button>
                    <Button onClick={()=> this.props.dispatch(fetchDesiredContact(this.state.old_contact))}>Revert Changes</Button>
                    {this.state.success ? <Message success header='Changes have been saved' /> : null}
                </Form>
            </div>
        )
    }

    componentDidMount(){
        let id = window.location.href.split("/").pop()
        fetch(`http://localhost:5000/contacts/${id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(contact => {
            this.setState({ old_contact:contact })
            contact.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredContact(contact))
        })
    }
}

export default connect(state => ({ contact: state.desiredContact }))(ContactPage);