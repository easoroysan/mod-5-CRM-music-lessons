import React from 'react';
import { connect } from 'react-redux';
import { fetchFamilies } from '../actions/families';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table, Button, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NewFamilyForm from '../components/newFamilyForm';
import debounce from 'lodash.debounce'


class Families extends React.Component{

    state={
        newForm: false,
        searchQuery: "",
        isLoading: false
    }

    setSearchQuery = debounce((query) => {
        this.setState({ searchQuery: query, isLoading: false })
    }, 500)

    render(){

        let desiredFamiles = this.props.families
        if(this.state.searchQuery !== ""){
            let searchTerm = this.state.searchQuery.toUpperCase()
            desiredFamiles = this.props.families.filter( family =>(
                family.family_name.toUpperCase().includes(searchTerm)
            ))
        }

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='group' />
                    <Header.Content>Families</Header.Content>
                    <Button onClick={()=> this.setState({ newForm: !this.state.newForm })}>{this.state.newForm ? 'Hide Family Form' : 'Add a Family'}</Button>
                </Header>

                {this.state.newForm ? <NewFamilyForm/> : null}

                <Search
                    open={false}
                    loading={this.state.isLoading}
                    size='small'
                    style={{ marginLeft: '10px' }}
                    placeholder='Family Name'
                    onSearchChange={(e)=>{
                        this.setState({ isLoading: true })
                        this.setSearchQuery(e.target.value)
                    }}
                />

                <Table celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Family Name</Table.HeaderCell>
                            <Table.HeaderCell>Contacts</Table.HeaderCell>
                            <Table.HeaderCell>Students</Table.HeaderCell>
                            <Table.HeaderCell>School</Table.HeaderCell>
                            <Table.HeaderCell>Billing Total</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {desiredFamiles.map( family =>(
                            <Table.Row key={family.id}>
                                <Table.Cell><Link to={`/families/${family.id}`} >{family.family_name}</Link></Table.Cell>
                                <Table.Cell>{family.contacts.map( contact => (
                                    <Link to={`/contacts/${contact.id}`} key={contact.id} >{
                                        family.contacts[family.contacts.length - 1].id === contact.id ?
                                        `${contact.first_name} ${contact.last_name}` :
                                        `${contact.first_name} ${contact.last_name}, `
                                    }</Link>
                                ))}</Table.Cell>
                                <Table.Cell>{family.students.map( student => (
                                    <Link to={`/students/${student.id}`} key={student.id}>{
                                        family.students[family.students.length - 1].id === student.id ?
                                        `${student.first_name} ${student.last_name}` :
                                        `${student.first_name} ${student.last_name}, `
                                    }</Link>
                                ))}</Table.Cell>
                                <Table.Cell>{family.school.name}</Table.Cell>
                                <Table.Cell>{family.billing_total}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    componentDidMount(){
        fetch(`${fetchURL}/families`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        //give error option for everything?
        .then(r=> r.status===200 ? r.json() : console.log('error'))
        .then(families => {
            if(families){
                families.error ? this.props.dispatch(authFail()) : this.props.dispatch(fetchFamilies(families))
            }else{
                alert("There was an error retrieving the date. If this persists, please contact customer support")
            }
        })
    }
}

export default connect(state => ({ families: state.families }))(Families);