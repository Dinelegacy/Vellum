import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-inner">
                <h2 className="footer-logo">VELLUM</h2>

                <nav className="footer-nav">
                    <a href="https://github.com/Dinelegacy" target="_blank" rel="noreferrer">GitHub</a>
                    <span>Terms</span>
                    <span>Privacy</span>

                    <a href="mailto:Dinelegacy@gmail.com">Contact</a>
                </nav>
                <div className="footer-details">
                    <p>Powered by React</p>
                    <p className="copyright">© {new Date().getFullYear()} VELLUM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;