import React from "react";
import { connect } from "react-redux";
import { Header, Icon, Form, Button, Divider, Message, Table } from 'semantic-ui-react';
import { fetchDesiredFamily,updateDesiredFamily } from '../actions/families';
import { authFail } from '../actions/current_user';
import { Link } from 'react-router-dom';
import NewContactForm from '../components/newContactForm';
import NewStudentForm from '../components/newStudentForm';

class FamilyPage extends React.Component{

    state={
        old_family:{},
        success: false,
        studentForm: false,
        contactForm: false
    }

    handleChange = (key,info) => this.props.dispatch(updateDesiredFamily(key,info))
    handleSubmit = () => {
        fetch(`http://localhost:5000/families/${this.props.family.id}`,{
            method:"PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.props.family)
        })
        .then(r=>r.json())
        .then( family =>{
            this.setState({
                success: true,
                old_family: family
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
        let {family_name, students, contacts, misc_notes, lessons, class_times, instructors} = this.props.family

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='group' />
                    <Header.Content>{this.state.old_family.family_name}</Header.Content>
                    <Header.Subheader>{this.props.family.school.name}</Header.Subheader>
                    <Link to="/families"><Button>Go to Families</Button></Link>
                </Header>

                <Divider/>

                <Header as='h2' textAlign='center'>
                    <Header.Content>Contacts</Header.Content>
                    <Button onClick={()=> this.setState({ contactForm: !this.state.contactForm })}>{this.state.contactForm ? 'View Current Contacts' : 'Add Contact'}</Button>
                </Header>
                {
                    this.state.contactForm ?

                    <NewContactForm/> :

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Relation to Students</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {contacts.map( contact =>(
                                <Table.Row key={contact.id}>
                                    <Table.Cell><Link to={`/contacts/${contact.id}`} >{contact.first_name} {contact.last_name}</Link></Table.Cell>
                                    <Table.Cell>{contact.relation_to_students}</Table.Cell>
                                    <Table.Cell>{contact.phone_number}</Table.Cell>
                                    <Table.Cell>{contact.email}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }


                <Header as='h2' textAlign='center'>
                    <Header.Content>Students</Header.Content>
                    <Button onClick={()=> this.setState({ studentForm: !this.state.studentForm })}>{this.state.studentForm ? 'View Current Students' : 'Add Student'}</Button>
                </Header>

                {
                    this.state.studentForm ?

                    <NewStudentForm/> :

                    <Table celled>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                                <Table.HeaderCell>Lessons</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {students.map( student =>(
                                <Table.Row key={student.id}>
                                    <Table.Cell><Link to={`/students/${student.id}`} >{student.first_name} {student.last_name}</Link></Table.Cell>
                                    <Table.Cell>{student.date_of_birth}</Table.Cell>
                                    <Table.Cell>{lessons.filter( lesson => lesson.student_id===student.id && lesson.active ).map( lesson => {
                                        let {day, start_time, end_time, instructor_id} = class_times.find( class_time => class_time.id === lesson.class_time_id)
                                        let longStart = start_time.split("T")[1]
                                        let shortStart = `${longStart.split(":")[0]}:${longStart.split(":")[1]}`

                                        let longEnd = end_time.split("T")[1]
                                        let shortEnd = `${longEnd.split(":")[0]}:${longEnd.split(":")[1]}`
                                        let instructor = instructors.find( instructor => instructor.id === instructor_id)
                                        return (<div key={lesson.id}>
                                            <Link to={`/lessons/${lesson.id}`}>{day} {shortStart}-{shortEnd}</Link> | {lesson.instrument} | <Link to={`/instructors/${instructor.id}`}>{instructor.first_name} {instructor.last_name}</Link>
                                            <br/>
                                        </div>)
                                    })}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }

                <Form success style={{margin: '10px'}} onSubmit={()=>this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Family Name' value={family_name} onChange={(e)=>this.handleChange('family_name',e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                    </Form.Group>
                    <Form.TextArea label='Miscellaneous Notes' value={misc_notes} onChange={(e)=>this.handleChange('misc_notes',e.target.value)}></Form.TextArea>
                    <Button type='submit' onClick={this.handleSubmit}>Save Changes</Button>
                    <Button onClick={()=> this.props.dispatch(fetchDesiredFamily(this.state.old_family))}>Revert Changes</Button>
                    {this.state.success ? <Message success header='Changes have been saved' /> : null}
                </Form>
            </div>
        )
    }

    componentDidMount(){
        let id = window.location.href.split("/").pop()
        fetch(`http://localhost:5000/families/${id}`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(family => {
            this.setState({ old_family: family })
            family.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchDesiredFamily(family))
        })
    }
}

export default connect(state => ({ family: state.desiredFamily }))(FamilyPage);