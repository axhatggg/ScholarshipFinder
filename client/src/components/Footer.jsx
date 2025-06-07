import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      {/* Footer Images: 2×2 grid of random scholarship images */}
      {/* <div className="footer-images">
        <img
          src="https://source.unsplash.com/400x300/?scholarship,student"
          alt="Scholarship Image 1"
        />
        <img
          src="https://source.unsplash.com/400x300/?grant,education"
          alt="Scholarship Image 2"
        />
        <img
          src="https://source.unsplash.com/400x300/?graduation,cap"
          alt="Scholarship Image 3"
        />
        <img
          src="https://source.unsplash.com/400x300/?books,university"
          alt="Scholarship Image 4"
        />
      </div> */}

      {/* About & Contact Columns */}
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section footer-about">
          <h2 className="footer-title">About Scholarship Finder</h2>
          <p className="footer-text">
            Scholarship Finder is dedicated to helping students discover and apply for the latest
            scholarships tailored to their academic profile. Our mission is to simplify the search
            process, providing up-to-date listings and personalized notifications so that you never
            miss an opportunity.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section footer-contact" id="contact">
          <h2 className="footer-title">Contact Us</h2>
          <ul className="contact-list">
            <li>
              <strong>Akshat Gupta:</strong>{' '}
              <a href="mailto:akshatgupta9612@gmail.com">akshatgupta9612@gmail.com</a>
            </li>
            <li>
              <strong>Tripti Jangde:</strong>{' '}
              <a href="mailto:jangde.tripti2004@gmail.com">jangde.tripti2004@gmail.com</a>
            </li>
            <li>
              <strong>Aaditya Balraj:</strong>{' '}
              <a href="mailto:balrajaditya72@gmail.com">balrajaditya72@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Scholarship Finder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;