import React from "react";
import { connect } from "react-redux";
import { Header, Icon, Form, Button, Divider, Message } from 'semantic-ui-react';
import { fetchDesiredStudent, updateDesiredStudent } from '../actions/students';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom';
import StudentLessons from '../components/studentLessons';

class StudentPage extends React.Component{

    state={
        old_student:{},
        success: false,
        showLessons: false
    }

    handleChange = (key,info) => this.props.dispatch(updateDesiredStudent(key,info))
    handleSubmit = () => {
        fetch(`http://localhost:5000/students/${this.props.student.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.props.student)
        })
        .then(r=>r.json())
        .then( student =>{
            this.setState({
                success: true,
                old_student: student
            })
            this.intervalID = setInterval(() => {
                this.setState({
                    success: false
                })
            }, 1000);
        })
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){
        let {first_name,last_name, phone_number, email, date_of_birth, misc_notes, medical_notes, billing_notes, family_id} = this.props.student

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='headphones' />
                    <Header.Content>{this.state.old_student.first_name} {this.state.old_student.last_name}</Header.Content>
                    <Link to={`/families/${family_id}`} ><Button>Go to Family Page</Button></Link>
                    <Button onClick={()=> this.setState({ showLessons: !this.state.showLessons })}>{this.state.showLessons ? 'Hide' : 'Show'} Lessons</Button>
                </Header>

                {this.state.showLessons ? <StudentLessons /> : <Divider/>}

                <Form success style={{margin: '10px'}} onSubmit={()=>this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First name' value={first_name} onChange={(e)=>this.handleChange('first_name',e.target.value)}/>
                        <Form.Input fluid label='Last name' value={last_name} onChange={(e)=>this.handleChange('last_name',e.target.value)}/>
                        <Form.Input fluid label='Date of birth' onFocus={ e => e.target.type='date'} onBlur={ e => e.target.type='text'} value={date_of_birth} onChange={(e)=>this.handleChange('date_of_birth',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Phone Number' type='text' value={phone_number} onChange={(e)=>this.handleChange('phone_number',e.target.value)}/>
                        <Form.Input fluid label='Email' type='email' value={email} onChange={(e)=>this.handleChange('email',e.target.value)}/>
                    </Form.Group>
                    <Form.TextArea label='Medical Notes' value={medical_notes} onChange={(e)=>this.handleChange('medical_notes',e.target.value)}></Form.TextArea>
                    <Form.TextArea label='Billing Notes' value={billing_notes} onChange={(e)=>this.handleChange('billing_notes',e.target.value)}></Form.TextArea>
                    <Form.TextArea label='Miscellaneous Notes' value={misc_notes} onChange={(e)=>this.handleChange('misc_notes',e.target.value)}></Form.TextArea>
                    <Button type='submit' onClick={this.handleSubmit}>Save Changes</Button>
                    <Button onClick={()=> this.props.dispatch(fetchDesiredStudent(this.state.old_student))}>Revert Changes</Button>
                    {this.state.success ? <Message success header='Changes have been saved' /> : null}
                </Form>
            </div>
        )
    }

    componentDidMount(){
        let id = window.location.href.split("/").pop()
        fetch(`http://localhost:5000/students/${id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(student => {
            this.setState({ old_student: student })
            student.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredStudent(student))
        })
    }
}

export default connect(state => ({ student: state.desiredStudent }))(StudentPage);