import React from 'react';
import { Link , NavLink } from 'react-router-dom';
 
const navigation = () => {
    return (
        <nav className="pink">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/"className="brand-logo" >
                        POKEREX
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default navigation;