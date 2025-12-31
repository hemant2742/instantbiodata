import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-brand">
                        <h3>InstantBiodata</h3>
                        <p>Create beautiful marriage biodatas in minutes - completely free!</p>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/templates">Templates</a></li>
                        <li><a href="/form">Create Biodata</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><a href="#faqs">FAQs</a></li>
                        <li><a href="#help">Help Guide</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <a href="mailto:support@instantbiodata.com">support@instantbiodata.com</a>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#" className="social-link" aria-label="Facebook">📘</a>
                        <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                        <a href="#" className="social-link" aria-label="Instagram">📷</a>
                        <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {currentYear} InstantBiodata. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#terms">Terms of Service</a>
                        <span>•</span>
                        <a href="#privacy">Privacy Policy</a>
                        <span>•</span>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;