import React, { Component } from 'react';
import './Account.css'


export default class Account extends Component {

    render() {
        return (
            <section className="info-section" id="info-section">
                <h2>Create Your Account</h2>
                <form>
                    <label htmlFor="name">Create Your Userame:</label>
                    <input type="text" id="name" /><br />
                    <label htmlFor="email">Enter Your Email:</label>
                    <input type="text" id="email" /><br />
                    <label htmlFor="password">Create Your Password:</label>
                    <input type="text" id="password" /><br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        )
    }
}