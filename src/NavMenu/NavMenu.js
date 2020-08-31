import React from 'react';
import { Link } from 'react-router-dom'
import './NavMenu.css';

export default function NavMenu(props) {
    return (
        <nav role="navigation" id="burg-nav">
            <div id="menuToggle">
                <input type="checkbox" id="burg-menu" />
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                    <li><Link to={'/'} >Home</Link></li>
                    <li><Link to={'/hearchords'}>Hear Chords</Link></li>
                    <li><Link to={'/mychords'}>My Chords</Link></li>
                    <li><Link to={'/account'}>Account</Link></li>
                </ul>
            </div>
        </nav>
    );
}