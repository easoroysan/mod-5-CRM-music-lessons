import React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions/contacts';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'

class Contacts extends React.Component{

    state={
        searchQuery: "",
        isLoading: false
    }

    setSearchQuery = debounce((query) => {
        this.setState({ searchQuery: query, isLoading: false })
    }, 500)

    render(){
        let organizedContacts = this.props.contacts.sort( (a,b)=> a.last_name > b.last_name ? 1 : a.last_name < b.last_name ? -1 : 0 )
        if(this.state.searchQuery !== ""){
            let searchTerm = this.state.searchQuery.toUpperCase()
            organizedContacts = organizedContacts.filter( client =>(
                client.first_name.toUpperCase().includes(searchTerm) || 
                client.last_name.toUpperCase().includes(searchTerm) ||
                client.phone_number.toUpperCase().includes(searchTerm) ||
                client.email.toUpperCase().includes(searchTerm) ||
                client.family.family_name.toUpperCase().includes(searchTerm)
            ))
        }
        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='phone' />
                    <Header.Content>Contacts</Header.Content>
                </Header>

                <Search
                    open={false}
                    loading={this.state.isLoading}
                    size='small'
                    style={{ marginLeft: '10px' }}
                    placeholder='Name, Number, or Email'
                    onSearchChange={(e)=>{
                        this.setState({ isLoading: true })
                        this.setSearchQuery(e.target.value)
                    }}
                />
                
                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Family Name</Table.HeaderCell>
                            <Table.HeaderCell>Relation To Students</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>School</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {organizedContacts.map( contact =>(
                            // This line should change once unique ids are put in
                            <Table.Row key={contact.id}>
                                <Table.Cell>{<Link to={`/contacts/${contact.id}`}>{contact.first_name} {contact.last_name}</Link>}</Table.Cell>
                                <Table.Cell>{<Link to={`/families/${contact.family.id}`}>{contact.family.family_name}</Link>}</Table.Cell>
                                <Table.Cell>{contact.relation_to_students}</Table.Cell>
                                <Table.Cell>{contact.phone_number}</Table.Cell>
                                <Table.Cell>{contact.email}</Table.Cell>
                                <Table.Cell>{contact.school.name}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    componentDidMount(){
        fetch(`${fetchURL}/contacts`,{
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

export default connect(state => ({ contacts: state.contacts }))(Contacts);