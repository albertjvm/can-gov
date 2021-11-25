import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className="Header">
            <NavLink to="/"><h1>Know Your Onions</h1></NavLink>
            <NavLink to="/mps" activeClassName="active">MPs</NavLink>
            <NavLink to="/votes" activeClassName="active">Votes</NavLink>
            <NavLink to="/bills/44-1" activeClassName="active">Bills</NavLink>
            <NavLink to="/speeches" activeClassName="active">Sittings</NavLink>
        </header>
    );
};
