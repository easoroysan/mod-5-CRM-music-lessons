import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react'

export class SidebarClass extends React.Component {
    state = {
        visible: false,
        homeButton: {background: 'black'},
        instructorButton: {background: 'black'},
        studentButton: {background: 'black'}
    }

    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    render() {
        const { visible } = this.state

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
                <Link to="/home" onClick={this.handleHideClick}>
                    <Menu.Item
                    style={this.state.homeButton}
                    onMouseEnter={()=> this.setState({ homeButton: {background:'gray'}})}
                    onMouseLeave={()=> this.setState({ homeButton: {background:'black'}})}
                    >
                        <Icon name='home' />
                        Home
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
            </Sidebar>
        </div>
        )
    }
}