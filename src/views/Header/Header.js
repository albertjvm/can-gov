import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className="Header">
            <NavLink to="/"><h1>Know Your Onions</h1></NavLink>
            <NavLink to="/mps" activeClassName="active">MPs</NavLink>
            <NavLink to="/votes" activeClassName="active">Votes</NavLink>
        </header>
    );
};
