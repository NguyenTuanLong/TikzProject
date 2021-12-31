import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link class="nav-link" to="/">
                    <li>Tex editor</li>
                </Link>
                <Link class="nav-link" to="/file">
                    <li>Upload file</li>
                </Link>
                
            </ul>
        </nav>
    );
};
