import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">💒</span>
                    <span className="logo-text">InstantBiodata</span>
                </Link>

                <nav className="main-nav">
                    <Link
                        to="/"
                        className={`nav-item ${isActive('/') ? 'active' : ''}`}
                    >
                        🏠 Home
                    </Link>
                    <Link
                        to="/templates"
                        className={`nav-item ${isActive('/templates') ? 'active' : ''}`}
                    >
                        📋 Templates
                    </Link>
                    <Link
                        to="/form"
                        className={`nav-item ${isActive('/form') ? 'active' : ''}`}
                    >
                        📝 Biodata Form
                    </Link>
                </nav>

                <div className="header-actions">
                    <span className="language-selector">🌐 English</span>
                    <span className="faq-link">❓ FAQ</span>
                </div>
            </div>
        </header>
    );
};

export default Header;