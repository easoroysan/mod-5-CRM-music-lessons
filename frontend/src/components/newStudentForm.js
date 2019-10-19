import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { authFail } from '../actions/current_user';
import { updateDesiredFamily } from '../actions/families';

class NewStudentForm extends React.Component{

    state={
        submitted: false
    }

    handleSubmit(info){
        let keys = ['first_name','last_name','date_of_birth','phone_number','misc_notes', 'medical_notes', 'billing_notes']
        let newStudentInfo = { family_id: this.props.family.id, school_id: this.props.family.school_id }
        keys.forEach( key => newStudentInfo[key]=info[key].value )

        fetch(`${fetchURL}/students`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newStudentInfo)
        })
        .then(r=>r.json())
        .then(student =>{
            if(student.error){
                this.props.dispatch(authFail())
            }else{
                this.props.dispatch(updateDesiredFamily('students',[...this.props.family.students, student]))
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

    render(){
        return(<div>
            <Divider/>
            <Form success style={{margin: '10px'}} onSubmit={(e)=>this.handleSubmit(e.target)}>
                    
                <Form.Group widths='equal'>
                    <Form.Input id='first_name' required fluid label='First Name' />
                    <Form.Input id='last_name' required fluid label='Last Name' />
                    <Form.Input id='date_of_birth' type='date' required fluid label='Date of Birth' />
                    <Form.Input id='phone_number' fluid label='Phone Number' />
                </Form.Group>
                <Form.TextArea id='billing_notes' label='Billing Notes'></Form.TextArea>
                <Form.TextArea id='medical_notes' label='Medical Notes'></Form.TextArea>
                <Form.TextArea id='misc_notes' label='Miscellaneous Notes'></Form.TextArea>

                <Button type='submit'>Add Student</Button>

                {this.state.success ? <Message success header='Student has been added' /> : null}

            </Form>
            <Divider/>
        </div>)
    }
}

const mapStateToProps = state =>(
    {
        currentUser: state.currentUser,
        family: state.desiredFamily
    }
)
export default connect(mapStateToProps)(NewStudentForm);