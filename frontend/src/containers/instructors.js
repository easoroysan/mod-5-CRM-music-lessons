import React from 'react'
import { connect } from 'react-redux';
import { fetchInstructors } from '../actions/instructors'
import { authFail } from '../actions/current_user';
import { Header, Icon, Table, Button, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NewInstructorForm from '../components/newInstructorForm';
import debounce from 'lodash.debounce'


class Instructors extends React.Component{

    state={
        newForm: false,
        searchQuery: "",
        isLoading: false
    }

    setSearchQuery = debounce((query) => {
        this.setState({ searchQuery: query, isLoading: false })
    }, 500)

    componentDidMount(){
        this.props.initialFetch()
    }

    render(){

        let desiredInstructors = this.props.instructors
        if(this.state.searchQuery !== ""){
            let searchTerm = this.state.searchQuery.toUpperCase()
            desiredInstructors = this.props.instructors.filter( instructor =>(
                instructor.first_name.toUpperCase().includes(searchTerm) || 
                instructor.last_name.toUpperCase().includes(searchTerm) ||
                instructor.instrument_1.toUpperCase().includes(searchTerm) ||
                instructor.instrument_2.toUpperCase().includes(searchTerm) ||
                instructor.instrument_3.toUpperCase().includes(searchTerm)
            ))
        }


        return(
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='microphone' />
                    <Header.Content>Instructors</Header.Content>
                    <Button onClick={()=> this.setState({ newForm: !this.state.newForm })}>{this.state.newForm ? 'Return to Instructors List' : 'Add Instructor'}</Button>
                </Header>

                {
                    this.state.newForm ? 
                    null : 
                    <Search
                        open={false}
                        loading={this.state.isLoading}
                        size='small'
                        style={{ marginLeft: '10px'}}
                        placeholder='Name or Instrument'
                        onSearchChange={(e)=>{
                            this.setState({ isLoading: true })
                            this.setSearchQuery(e.target.value)
                        }}
                    />
                }

                {
                    this.state.newForm ?

                    <NewInstructorForm/> :

                    <Table celled>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Schools</Table.HeaderCell>
                                <Table.HeaderCell>Active</Table.HeaderCell>
                                <Table.HeaderCell>Instruments</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Emergancy Number</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {desiredInstructors.map( instructor =>(
                                <Table.Row key={instructor.id}>
                                    <Table.Cell><Link to={`/instructors/${instructor.id}`} >{instructor.first_name} {instructor.last_name}</Link></Table.Cell>
                                    <Table.Cell>{instructor.schools.map( school=> (
                                                <div key={school.id}>
                                                    {school.name}
                                                    <br/>
                                                </div>
                                            )
                                    )}</Table.Cell>
                                    <Table.Cell>{instructor.active ? "Active": "Inactive"}</Table.Cell>
                                    <Table.Cell>
                                        {instructor.instrument_1}<br/>
                                        {instructor.instrument_2 ? instructor.instrument_2 : null}<br/>
                                        {instructor.instrument_3 ? instructor.instrument_3 : null}
                                    </Table.Cell>
                                    <Table.Cell>{instructor.phone_number}</Table.Cell>
                                    <Table.Cell>{instructor.emergency_number}</Table.Cell>
                                    <Table.Cell>{instructor.email}</Table.Cell>
                                    <Table.Cell>{instructor.date_of_birth}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }
            </div>
        )
    }
}

const mapStateToProps = state =>(
    {
        instructors: state.instructors
    }
)

const mapDispatchToProps = {
    initialFetch: ()=>dispatch=>{
        fetch(`${fetchURL}/instructors`,{
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(r=> r.json())
        .then(instructors => {
            instructors.error ? dispatch(authFail()) : dispatch(fetchInstructors(instructors))
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instructors);