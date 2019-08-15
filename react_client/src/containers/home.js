import React from 'react'
import LoginForm from '../components/login';
import { connect } from 'react-redux'
import MainPage from '../components/main'

class Home extends React.Component{

    render(){
        let homePage = <div></div>
        this.props.authorized ? homePage=<MainPage/> : homePage=<LoginForm/>
        return homePage
    }

}

export default connect(state => ({ authorized: state.currentUser.authorized }))(Home)