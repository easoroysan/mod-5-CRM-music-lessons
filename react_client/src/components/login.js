import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { authSuccess,authFail } from '../actions/users'


class LoginForm extends React.Component{

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
      localStorage.setItem('token',result.token)
      result.message === "Confirmed" ? this.props.dispatch(authSuccess()) : this.props.dispatch(authFail())
    })
  }

  render(){
    // something to use for rendering lessons for that day
    // let date = new Date()
    // console.log(date.getDay())
    if(this.props.authorized){
      return <div>YOU IN</div>
    }else{
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
}

export default connect(state => ({ authorized: state.users }))(LoginForm);
