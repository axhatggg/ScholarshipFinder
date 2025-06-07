import React from 'react';
import NavBar from './Navbar';
import './Features.css';

const Features = () => {
  return (
    <>
      {/* ======== NAVBAR ======== */}
      {/* <nav className="navbar">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/features" className="nav-link">
          Features
        </a>
        <a href="/#about" className="nav-link">
          About
        </a>
        <a href="/#contact" className="nav-link">
          Contact
        </a>
      </nav> */}
      <NavBar />

      {/* ======== HERO / PAGE HEADER ======== */}
      <section className="features-hero">
        <h1>Key Features of Scholarship Finder</h1>
        <p>
          Discover why Scholarship Finder is the ultimate tool for students seeking financial aid.
          From intelligent search filters to personalized alerts, explore all the ways we simplify
          your scholarship journey.
        </p>
      </section>

      {/* ======== FEATURES GRID ======== */}
      <section className="features-section">
        {/* 1. Advanced Search */}
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h2 className="feature-title">Advanced Search</h2>
          <p className="feature-desc">
            Filter scholarships by category, field of study, location, deadline, and award amount.
            Our intuitive search ensures you find only the opportunities relevant to your needs.
          </p>
        </div>

        {/* 2. Personalized Alerts */}
        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h2 className="feature-title">Personalized Alerts</h2>
          <p className="feature-desc">
            Never miss a deadline again. Sign up for custom notifications and receive email alerts
            when new scholarships match your criteria.
          </p>
        </div>

        {/* 3. Save & Track Applications */}
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h2 className="feature-title">Save & Track Applications</h2>
          <p className="feature-desc">
            Bookmark scholarships you’re interested in and track your application progress all in
            one dashboard. Stay organized from start to finish.
          </p>
        </div>

        {/* 4. Eligibility Checker */}
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h2 className="feature-title">Eligibility Checker</h2>
          <p className="feature-desc">
            Our system instantly tells you if you meet the basic eligibility criteria for each
            scholarship—saving you time and ensuring a higher chance of success.
          </p>
        </div>

        {/* 5. Resource Center */}
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h2 className="feature-title">Resource Center</h2>
          <p className="feature-desc">
            Access guides, templates, and expert tips on writing winning essays, preparing
            documents, and tackling common application challenges.
          </p>
        </div>

        {/* 6. Mobile-Friendly Responsive Design */}
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h2 className="feature-title">Mobile-Friendly Design</h2>
          <p className="feature-desc">
            Scholarship Finder works flawlessly on any device. Search, save, and apply on the go
            with our fully responsive interface.
          </p>
        </div>
      </section>

      {/* ======== OPTIONAL FOOTER (UNCOMMENT IF NEEDED) ======== */}
      {/*
      <footer id="footer">
        <div className="footer-bottom">
          <p>© 2025 Scholarship Finder. All rights reserved.</p>
        </div>
      </footer>
      */}
    </>
  );
};

export default Features;