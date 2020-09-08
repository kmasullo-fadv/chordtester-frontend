import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service'
import './Account.css'


export default class Account extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
      }
    
      state = { error: null }

    handleSubmit = e => {
        e.preventDefault();
        const username = e.target['username'].value;
        const name = e.target['name'].value;
        const password = e.target['password'].value;
        this.setState({error: null})
        AuthApiService.postUser({username, name, password})
        .then(user => {
            username.value = ''
            name.value = ''
            password.value = ''
            this.props.onRegistrationSuccess()
        })
        .catch(res => {
            this.setState({error: res.error})
        })
    }

    render() {
        return (
            <section className="info-section" id="info-section">
                <h2>Create Your Account</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Create Your Userame:</label>
                    <input type="text" id="username" name="username" /><br />
                    <label htmlFor="name">Enter Your Name:</label>
                    <input type="text" id="name" name="name" /><br />
                    <label htmlFor="password">Create Your Password:</label>
                    <input type="text" id="password" name="password" /><br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        )
    }
}