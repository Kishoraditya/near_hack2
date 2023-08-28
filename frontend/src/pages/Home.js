//Home.js - Marketing/landing page
import React from 'react';
import { Link } from 'react-router-dom';
import WalletComponent from './Wallet'; // Adjust the import path

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your DApp</h1>
          <p>Your One-Stop Solution for Finding Jobs and Unlocking Opportunities</p>
          <WalletComponent /> {/* Show NEAR wallet component */}
          <Link to="/jobs" className="cta-button">Browse Job Openings</Link>
        </div>
        <div className="hero-image">
          {/* Add an engaging hero image */}
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">
            {/* Add an icon representing the feature */}
          </div>
          <h2>Discover Opportunities</h2>
          <p>Explore a wide range of job openings from top companies. Find the perfect fit for your skills and expertise.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            {/* Add an icon representing the feature */}
          </div>
          <h2>Unlock Exclusive Access</h2>
          <p>Own NFTs associated with job applications to gain special access to private job listings and content.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            {/* Add an icon representing the feature */}
          </div>
          <h2>Build Your Profile</h2>
          <p>Create a comprehensive professional profile showcasing your skills, experience, and accomplishments.</p>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <blockquote>
            "I found my dream job through this platform. The NFT integration is a game-changer!"
          </blockquote>
          <p>- John Doe, Software Engineer</p>
        </div>
        <div className="testimonial">
          <blockquote>
            "The profile NFTs provided unique insights into job listings. A fantastic concept!"
          </blockquote>
          <p>- Jane Smith, UX Designer</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
