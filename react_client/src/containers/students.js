import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/students';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table } from 'semantic-ui-react'


class Students extends React.Component{

    render(){
        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='headphones' />
                    <Header.Content>Students</Header.Content>
                </Header>
                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.students.map( student =>(
                            <Table.Row key={student.id}>
                                <Table.Cell>{student.first_name} {student.last_name}</Table.Cell>
                                <Table.Cell>{student.phone_number}</Table.Cell>
                                <Table.Cell>{student.email}</Table.Cell>
                                <Table.Cell>{student.date_of_birth}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    componentDidMount(){
        fetch('http://localhost:5000/students',{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(students => {
            students.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchStudents(students))
        })
    }
}

export default connect(state => ({ students: state.students }))(Students);