import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authFail,authSuccess } from './actions/current_user';

import Home from './containers/home';
import SidebarClass from './components/sidebar';
import Students from './containers/students.js';
import StudentPage from './containers/studentPage';
import Instructors from './containers/instructors.js';
import InstructorPage from './containers/instructorPage.js';
import Families from './containers/families';
import FamilyPage from './containers/familyPage';
import Clients from './containers/clients';

import Default from './containers/default';



class App extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <SidebarClass/>
        <Switch>
          <Route exact path="/" render={()=><Home/>}/>
          <Route exact path="/students" render={()=><Students/>} />
          <Route path="/students" render={()=><StudentPage/>} />
          <Route exact path="/instructors" render={()=><Instructors/>} />
          <Route path="/instructors" render={()=><InstructorPage/>} />
          <Route exact path="/families" render={()=><Families/>} />
          <Route path="/families" render={()=><FamilyPage/>} />
          <Route exact path="/clients" render={()=><Clients/>} />
          <Route component={()=><Default/>} />
        </Switch>
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
      if(res.error){
        this.props.dispatch(authFail())
      }else{
        this.props.dispatch(authSuccess(res))
      }
    })
  }

}

export default connect(state => ({ authorized: state.currentUser.authorized }))(App);
