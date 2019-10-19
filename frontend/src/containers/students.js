import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/students';
import { authFail } from '../actions/current_user';
import { Header, Icon, Table, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { fetchURL } from '../actions/variables';


class Students extends React.Component{

    state={
        searchQuery: "",
        isLoading: false
    }

    setSearchQuery = debounce((query) => {
        console.log(query)
        this.setState({ searchQuery: query, isLoading: false })
    }, 500)

    render(){

        let desiredStudents = this.props.students
        if(this.state.searchQuery !== ""){
            let searchTerm = this.state.searchQuery.toUpperCase()
            desiredStudents = this.props.students.filter( student =>(
                student.first_name.toUpperCase().includes(searchTerm) || 
                student.last_name.toUpperCase().includes(searchTerm) ||
                student.phone_number.toUpperCase().includes(searchTerm) ||
                student.family.family_name.toUpperCase().includes(searchTerm)
            ))
        }

        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='headphones' />
                    <Header.Content>Students</Header.Content>
                </Header>

                <Search
                    open={false}
                    loading={this.state.isLoading}
                    size='small'
                    style={{ marginLeft: '10px' }}
                    placeholder='Name or Phone Number'
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
                            <Table.HeaderCell>School</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {desiredStudents.map( student =>(
                            <Table.Row key={student.id}>
                                <Table.Cell><Link to={`/students/${student.id}`} >{student.first_name} {student.last_name}</Link></Table.Cell>
                                <Table.Cell><Link to={`/families/${student.family_id}`} >{student.family.family_name}</Link></Table.Cell>
                                <Table.Cell>{student.school.name}</Table.Cell>
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
        fetch(`${fetchURL}/students`,{
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