import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'


export default class LoginForm extends React.Component{

  handleSubmit = (username,password) => {
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
      console.log(result)
      localStorage.setItem('token',result.token)
    })
  }

  render(){
    let userToken = localStorage.getItem('token')
    console.log(userToken)
    let date = new Date()
    console.log(date.getDay())
    return(
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large' onSubmit={e=> this.handleSubmit(e.target.username.value, e.target.password.value)}>
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
    )
  }
}