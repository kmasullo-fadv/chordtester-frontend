import React, { Component } from 'react';
import Login from './Account/Login';
import Account from './Account/Account'
import Context from '../Context';

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    static contextType = Context;

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        this.context.logIn()
    }

    render(){
        return(
            <div className="login-page-whole">
            <Login onLoginSuccess={this.handleLoginSuccess}/>
            <Account onLoginSuccess={this.handleLoginSuccess}/>
            </div>
        )
    }
}