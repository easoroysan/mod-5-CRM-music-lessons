import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authFail,authSuccess } from './actions/users';


import { Home } from './containers/home'
import SidebarClass from './components/sidebar'
import Students from './containers/students.js'
import Instructors from './containers/instructors.js';



class App extends React.Component{

  render(){
    return (
      <BrowserRouter>
        {/* Only show sidebar if someone is logged in */}
        {/* someone should be redirected to home if they go to path '/' */}
        <Route path="/" render={()=><SidebarClass/>}/>
        <Route exact path="/home" render={()=><Home/>}/>
        <Route exact path="/students" render={()=><Students />} />
        <Route exact path="/instructors" render={()=><Instructors />} />
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
        if(res.message === "Success"){
          this.props.dispatch(authSuccess())
        }else{
          this.props.dispatch(authFail())
        }
    })
  }

}

export default connect(state => ({ authorized: state.users }))(App);
