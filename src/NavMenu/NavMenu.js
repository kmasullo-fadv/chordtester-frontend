import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service';
import './Menu.css';
import Context from '../Context';

export default class NavMenu extends Component {
    static contextType = Context;

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.logOut()
    }

    renderLoginLinks = () => {
        return (
            <ul id="menu">
                <li><Link to={'/'}><header><h1>ChordTester</h1></header></Link></li>
                <li><Link to={'/login'}>Login</Link></li>
            </ul>
        )
    }

    renderLogoutLinks = () => {
        return (
            <ul id="menu">
                <li><Link to={'/'}><header><h1>ChordTester</h1></header></Link></li>
                <li><Link to='/about' onClick={this.handleLogoutClick}>Log Out</Link></li>
            </ul>
        )
    }

    render() {
        return (
            <nav role="navigation">
                    {TokenService.hasAuthToken() ? this.renderLogoutLinks() : this.renderLoginLinks()}        
            </nav>
        )
    }
}