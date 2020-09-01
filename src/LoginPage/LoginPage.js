import React, { Component } from 'react';
import Login from '../Account/Login';
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
        console.log(destination)
        history.push(destination)
        this.context.logIn()
    }

    render(){
        return(
            <>
            <h2>Log Into Your Account</h2>
            <Login onLoginSuccess={this.handleLoginSuccess}/>
            </>
        )
    }
}