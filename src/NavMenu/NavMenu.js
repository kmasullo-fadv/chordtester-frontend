import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service';
import './NavMenu.css';
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
                <li><Link to={'/'} >Home</Link></li>
                <li><Link to={'/playchords'}>Play Chords</Link></li>
                <li><Link to={'/projects'}>Projects</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/account'}>Create Account</Link></li>
            </ul>
        )
    }

    renderLogoutLinks = () => {
        return (
            <ul id="menu">
                <li><Link to={'/'} >Home</Link></li>
                <li><Link to={'/playchords'}>Play Chords</Link></li>
                <li><Link to={'/projects'}>Projects</Link></li>
                <li><Link to='/' onClick={this.handleLogoutClick}>Log Out</Link></li>
            </ul>
        )
    }

    render() {
        return (
            <nav role="navigation" id="burg-nav">
                <div id="menuToggle">
                    <input type="checkbox" id="burg-menu" />
                    <span></span>
                    <span></span>
                    <span></span>

                    {TokenService.hasAuthToken() ? this.renderLogoutLinks() : this.renderLoginLinks()}
                </div>
            </nav>
        )
    }
}