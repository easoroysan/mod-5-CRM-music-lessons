import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authFail,authSuccess } from './actions/current_user';


import Home from './containers/home';
import SidebarClass from './components/sidebar';
import Students from './containers/students.js';
import Instructors from './containers/instructors.js';
import Families from './containers/families';



class App extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <Route path="/" render={()=><SidebarClass/>}/>
        <Route exact path="/" render={()=><Redirect to='/home'/>}/>
        <Route exact path="/home" render={()=><Home/>}/>
        <Route exact path="/students" render={()=><Students />} />
        <Route exact path="/instructors" render={()=><Instructors />} />
        <Route exact path="/families" render={()=><Families />} />
      </BrowserRouter>
    )
  }

  componentDidMount(){
    fetch('http://localhost:5000/authorize',{
      method:'POST',
      headers: {
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      },
      body: JSON.stringify({
          initial:true
      })
    })
    .then(r=> r.json())
    .then(res =>{
      if(!res.error){
        this.props.dispatch(authSuccess(res))
      }else{
        this.props.dispatch(authFail())
      }
    })
  }

}

export default connect(state => ({ authorized: state.currentUser.authorized }))(App);
