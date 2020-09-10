import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './About.css';
import Context from '../Context';

export default class About extends Component {
    static contectType = Context;

    render() {
        return (
            <section className="welcome">
                <h2>Welcome</h2>
                <p>ChordTester is the perfect tool for testing chord voicings when you do not have
                access to your instrument.
                </p>
                <button><Link to={'/'}>Try Now</Link></button>
            </section>
        )
    }
}