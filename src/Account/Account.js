import React, { Component } from 'react';
import './Account.css'


export default class Account extends Component {

    render() {
        return (
            <>
                <h2>Create Your Account</h2>
                <section className="info-section" id="info-section">
                    <form>
                        <label htmlFor="name">Enter Your Full Name:</label>
                        <input type="text" id="name" /><br />
                        <label htmlFor="email">Enter Your Email:</label>
                        <input type="text" id="email" /><br />
                        <label htmlFor="password">Create Your Password:</label>
                        <input type="text" id="password" /><br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </>
        )
    }
}