import React from 'react';
import { connect } from 'react-redux';
import { fetchFamilies } from '../actions/families';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table } from 'semantic-ui-react'


class Families extends React.Component{

    render(){
        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='group' />
                    <Header.Content>Families</Header.Content>
                </Header>
                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Family Name</Table.HeaderCell>
                            <Table.HeaderCell>Contacts</Table.HeaderCell>
                            <Table.HeaderCell>Students</Table.HeaderCell>
                            <Table.HeaderCell>Billing Total</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.families.map( family =>(
                            <Table.Row key={family.id}>
                                <Table.Cell>{family.family_name}</Table.Cell>
                                <Table.Cell>{family.contacts.map( contact => (
                                    family.contacts[contact.id] ?
                                    `${contact.first_name}, ` :
                                    `${contact.first_name}`
                                ))}</Table.Cell>
                                <Table.Cell>{family.students.map( student => (
                                    family.students[student.id] ?
                                    `${student.first_name}, ` :
                                    `${student.first_name}`
                                ))}</Table.Cell>
                                <Table.Cell>{family.billing_total}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    componentDidMount(){
        fetch('http://localhost:5000/families',{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(families => {
            families.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchFamilies(families))
        })
    }
}

export default connect(state => ({ families: state.families }))(Families);