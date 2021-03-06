import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux';


class SidebarClass extends React.Component {
    state = {
        visible: false,
        homeButton: {background: 'black'},
        instructorButton: {background: 'black'},
        studentButton: {background: 'black'},
        familyButton: {background: 'black'},
        clientButton: {background: 'black'},
        logoutButton: {background: 'black'}
    }

    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    render() {
        const { visible } = this.state
        if(this.props.currentUser.authorized){
            return (
                <div>
                    <Button.Group>
                    <Button disabled={visible} onClick={this.handleShowClick}>
                        Menu
                    </Button>
                    </Button.Group>
        
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Link to="/" onClick={this.handleHideClick}>
                            <Menu.Item
                            style={this.state.homeButton}
                            onMouseEnter={()=> this.setState({ homeButton: {background:'gray'}})}
                            onMouseLeave={()=> this.setState({ homeButton: {background:'black'}})}
                            >
                                <Icon name='home' />
                                Home
                            </Menu.Item>
                        </Link>
                        <Link to="/instructors" onClick={this.handleHideClick}>
                            <Menu.Item
                                style={this.state.instructorButton}
                                onMouseEnter={()=> this.setState({ instructorButton: {background:'gray'}})}
                                onMouseLeave={()=> this.setState({ instructorButton: {background:'black'}})}
                            >
                                <Icon name='microphone' />
                                Instructors
                            </Menu.Item>
                        </Link>
                        <Link to="/students" onClick={this.handleHideClick}>
                            <Menu.Item
                            style={this.state.studentButton}
                            onMouseEnter={()=> this.setState({ studentButton: {background:'gray'}})}
                            onMouseLeave={()=> this.setState({ studentButton: {background:'black'}})}
                            >
                                <Icon name='headphones' />
                                Students
                            </Menu.Item>
                        </Link>
                        <Link to="/families" onClick={this.handleHideClick}>
                            <Menu.Item
                                style={this.state.familyButton}
                                onMouseEnter={()=> this.setState({ familyButton: {background:'gray'}})}
                                onMouseLeave={()=> this.setState({ familyButton: {background:'black'}})}
                            >
                                <Icon name='group' />
                                Families
                            </Menu.Item>
                        </Link>
                        <Link to="/contacts" onClick={this.handleHideClick}>
                            <Menu.Item
                                style={this.state.clientButton}
                                onMouseEnter={()=> this.setState({ clientButton: {background:'gray'}})}
                                onMouseLeave={()=> this.setState({ clientButton: {background:'black'}})}
                            >
                                <Icon name='phone' />
                                Contacts
                            </Menu.Item>
                        </Link>
                        <Link to="/" onClick={()=>{
                            this.handleHideClick()
                            localStorage.setItem('token',"logged out")
                            window.location.reload()
                        }}>
                            <Menu.Item
                                style={this.state.logoutButton}
                                onMouseEnter={()=> this.setState({ logoutButton: {background:'gray'}})}
                                onMouseLeave={()=> this.setState({ logoutButton: {background:'black'}})}
                            >
                                <Icon name='log out' />
                                Logout
                            </Menu.Item>
                        </Link>
                    </Sidebar>
                </div>
            )
        }
        else{
            //only have the bottom information when there is an error, not when just logging out
            localStorage.setItem('token',"logged out")
            // alert(`Error:(Put error message here)\nPlease log in again. If the problem persists, please contact support for help.`)
            return <Redirect to='/' />
        }
    }
}

const mapStateToProps = state =>(
    {
        currentUser: state.currentUser
    }
)

export default connect(mapStateToProps)(SidebarClass);