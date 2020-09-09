import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service'
import './Account.css'
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/


export default class Account extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
      }
    
      state = { error: null, password: '' }

    handleSubmit = e => {
        e.preventDefault();
        const username = e.target['create-username'].value.toLowerCase();
        const name = e.target['name'].value;
        const password = e.target['create-password'].value;
        this.setState({error: null})
        AuthApiService.postUser({username, name, password})
        .then(user => {
            username.value = ''
            name.value = ''
            password.value = ''
            this.props.onLoginSuccess()
        })
        .catch(res => {
            this.setState({error: res.error})
        })
    }

    handlePasswordState = e => {
        e.preventDefault()
        this.setState({password: e.target.value})
    }
    renderCharacterCheck = e => {
        return <p>*Must contain at least one capital letter, number and special character</p>
    }

    render() {
        return (
            <section className="info-section" id="info-section">
                <h2>Create Your Account</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="create-username">Create Your Userame:</label>
                    <input type="text" id="create-username" name="create-username" /><br />
                    <label htmlFor="name">Enter Your Name:</label>
                    <input type="text" id="name" name="name" /><br />
                    <label htmlFor="create-password">Create Your Password:</label>
                    <input type="password" id="create-password" name="create-password" onChange={this.handlePasswordState}/><br />
                    {(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(this.state.password)) ? this.renderCharacterCheck() : null}
                    <button type="submit">Submit</button>
                </form>
            </section>
        )
    }
}