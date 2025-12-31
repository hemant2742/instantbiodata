import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const scrollToFAQs = () => {
        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const faqsElement = document.getElementById('faqs');
                if (faqsElement) {
                    faqsElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        } else {
            // Already on home page, just scroll
            const faqsElement = document.getElementById('faqs');
            if (faqsElement) {
                faqsElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
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
                    <button
                        className="faq-link"
                        onClick={scrollToFAQs}
                        type="button"
                    >
                        ❓ FAQ
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;