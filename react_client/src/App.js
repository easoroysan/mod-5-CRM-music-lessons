import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './containers/home'
import { SidebarClass } from './components/sidebar'
import Students from './containers/students.js'
import Instructors from './containers/instructors.js';



class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Route path="/" render={()=><SidebarClass/>}/>
        <Route exact path="/home" render={()=><Home/>}/>
        <Route exact path="/students" render={()=><Students />} />
        <Route exact path="/instructors" render={()=><Instructors />} />
      </BrowserRouter>
    )
  }
}

export default App;
