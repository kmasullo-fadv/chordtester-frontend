import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css';

export default function Home(props) {

    return (
        <section className="welcome">
            <h2>Welcome</h2>
            <p>ChordTester is the perfect tool for testing chord voicings when you do not have
            access to your instrument.
            </p>
            <button>Create Account</button>
            <button>Sign In</button>
            <button><Link to={'/hearchords'}>Try Now</Link></button>
        </section>
    )
}