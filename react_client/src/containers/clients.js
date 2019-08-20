import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/students';
import { fetchContacts } from '../actions/contacts';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Clients extends React.Component{

    render(){
        let organizedClients = this.props.clients.sort( (a,b)=> a.last_name > b.last_name ? 1 : a.last_name < b.last_name ? -1 : 0 )

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='universal access' />
                    <Header.Content>Clients</Header.Content>
                </Header>
                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Family Name</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>School</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {organizedClients.map( client =>(
                            // This line should change once unique ids are put in
                            <Table.Row key={!client.relation_to_students ? client.id : client.id+1000}>
                                <Table.Cell>{<Link to={ client.relation_to_students ? `/contacts/${client.id}` : `/students/${client.id}` } >{client.first_name} {client.last_name}</Link>}</Table.Cell>
                                <Table.Cell>{<Link to={`/families/${client.family.id}`}>{client.family.family_name}</Link>}</Table.Cell>
                                <Table.Cell>{client.relation_to_students ? "Contact: " : "Student"}{client.relation_to_students}</Table.Cell>
                                <Table.Cell>{client.phone_number}</Table.Cell>
                                <Table.Cell>{client.email}</Table.Cell>
                                <Table.Cell>{client.school.name}</Table.Cell>
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

        fetch('http://localhost:5000/contacts',{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(contacts => {
            contacts.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchContacts(contacts))
        })
    }
}

export default connect(state => ({ clients: [...state.students,...state.contacts] }))(Clients);