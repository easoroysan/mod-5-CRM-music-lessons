import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon, Divider, Container } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { authSuccess,authFail } from '../actions/current_user'


class LoginForm extends React.Component{

  render(){
    return(
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='music' circular />
          <Header.Content>Welcome to Easo's Music Lessons Scheduler</Header.Content>
          <Header.Subheader>A new and personalized application for music schools</Header.Subheader>
        </Header>

        <Divider/>

        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={e=> this.props.handleSubmit(e.target.username.value, e.target.password.value)}>
              <Segment>
                <Form.Input
                  id="username"
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  type='text'
                />
                <Form.Input
                  id="password"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  />
                
                <Button color='black' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

        <Divider/>

        <Container text>
          <Header as='h2'>What is Easo's Music Lessons Scheduler?</Header>
          <p>Easo Scheduler is an application developed by Roysan Easo. This application is primarily used to organize students for a music school and keep track of information such as lessons, attendance, and so on. It is also designed to make the enrollment process easier by doing things like automatically sending emails upon enrollment. Because it is in the early development stages, Roysan is able to add or change features to accomodate users upon request.</p>
        </Container>
        <br/><br/>
        <Container text>
          <Header as='h2'>How much does it cost?</Header>
          <p>Because this application has only recently been created and is only managed by one person, it is currently free!</p>
        </Container>
        <br/><br/>
        <Container text>
          <Header as='h2'>How can I get started?</Header>
          <p>Simply send an email to easo.roysan@gmail.com and Roysan will keep direct contact with you to answer any questions you may have and set up an account for you.</p>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    authorized: state.users
  }
)

const mapDispatchToProps = {
  handleSubmit: (username,password) => dispatch =>{
    fetch('http://localhost:5000/login',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(r => r.json())
    .then(result => {
      localStorage.setItem('token',result.token)
      if(result.message === "Confirmed"){
        dispatch(authSuccess({ ...result.current_user, schools: result.schools }))
      }else{
        dispatch(authFail())
        alert(result.message)
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
