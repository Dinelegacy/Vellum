import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        {/* REVIEW: Using <h2> for a decorative logo in the footer breaks
                    heading hierarchy — screen reader users navigating by headings will
                    encounter this as a content heading. Use <p> or <span> instead. */}
        <h2 className="footer-logo">VELLUM</h2>

        {/* REVIEW: Missing aria-label on footer <nav> — there are now two
                    <nav> elements on the page (header + footer). Screen readers list
                    them identically as "navigation". Add aria-label="Footer navigation"
                    to distinguish them. */}
        <nav className="footer-nav">
          {/* REVIEW: target="_blank" link should indicate it opens in a new
                        tab — add visually-hidden text like "(opens in new tab)" or an
                        aria-label so users aren't unexpectedly taken away from the page. */}
          <a
            href="https://github.com/Dinelegacy"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          {/* REVIEW: "Terms" and "Privacy" are styled as clickable links
                        (cursor: pointer, hover effect) but are <span> elements with no
                        href, role, or tabIndex. They are unreachable by keyboard and
                        invisible to screen readers. Use <a> or <button> instead. */}
          <span>Terms</span>
          <span>Privacy</span>

          <a href="mailto:Dinelegacy@gmail.com">Contact</a>
        </nav>
        <div className="footer-details">
          <p>Powered by React</p>
          <p className="copyright">
            © {new Date().getFullYear()} VELLUM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
