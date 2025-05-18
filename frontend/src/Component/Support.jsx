import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../style/Support.module.css';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_information'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!message || (!email && !user?.email)) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, you would send this to your backend
      console.log({
        name: name || user?.name,
        email: email || user?.email,
        subject,
        message
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Your message has been sent successfully!");
      setName('');
      setEmail('');
      setSubject('general');
      setMessage('');
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user_information");
      navigate("/login");
    }
  };

  return (
    <div className="dark-theme">
      <div className="container-scroller">
        {/* Navbar */}
        <nav
          className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#121212" }}
        >
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link
              className="navbar-brand brand-logo"
              to="/"
              style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}
            >
              <span className="text-warning">🏋️‍♀️FitTrack</span>Pro💪
            </Link>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-0">
            <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <i className="mdi mdi-bell-outline text-white"></i>
                  <span className="count-symbol bg-danger"></span>
                </Link>
              </li>
              {!user && (
                <>
                 
                </>
              )}
              {user && (
                <li className="nav-item d-none d-lg-flex align-items-center ml-3">
                  <div className="dropdown">
              
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                      <Link className="dropdown-item" to="/profile">
                        <i className="mdi mdi-account mr-2"></i> Profile
                      </Link>
                      <Link className="dropdown-item" to="/settings">
                        <i className="mdi mdi-cog mr-2"></i> Settings
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item" 
                        onClick={handleLogout}
                      >
                        <i className="mdi mdi-logout mr-2"></i> Logout
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>

       
          {/* Sidebar */}
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: "#121212" }}>
              <ul className="nav">
                {/* MAIN MENU Section */}
                <li className="nav-item section-header">
                  <span className="nav-link text-muted text-uppercase small font-weight-bold">
                    <span className="menu-title">Main Menu</span>
                  </span>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard">
                    <span className="menu-title">📊 Dashboard</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/work">
                    <span className="menu-title">🏋️ Workouts</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/food">
                    <span className="menu-title">🍎 Nutrition</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/pro">
                    <span className="menu-title">📈 Progress</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/goals">
                    <span className="menu-title">🎯 Goals</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/reminder">
                    <span className="menu-title">🚨 Reminders</span>
                  </Link>
                </li>
          
                {/* OTHERS Section */}
                <li className="nav-item section-header mt-3">
                  <span className="nav-link text-muted text-uppercase small font-weight-bold">
                    <span className="menu-title">Others</span>
                  </span>
                </li>
          
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/getuser">
                    <span className="menu-title">👤 Profile</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link to="/settings" className="nav-link text-white">
                    <span className="menu-title">⚙️ Settings</span>
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link to="/support" className="nav-link text-white">
                    <span className="menu-title">❓ Support</span>
                  </Link>
                </li>
          
                {/* Logout with extra spacing */}
                <li className="nav-item mt-3">
                  <a href="/logout" className="nav-link text-white" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <span className="menu-title">🚪 Log Out</span>
                  </a>
                </li>
              </ul>
            </nav>

            

          {/* Main Content */}
          <div className="main-panel">
            <div className="content-wrapper" style={{ backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
              <div className={styles.supportContainer}>
                <ToastContainer />
                <h2 className={styles.supportTitle}>Contact Support</h2>
                <p className={styles.supportSubtitle}>We're here to help with any questions or issues</p>
                
                <div className={styles.supportGrid}>
                  {/* Contact Form */}
                  <div className={styles.contactForm}>
                    <h3>Send us a message</h3>
                    <form onSubmit={handleSubmit}>
                      {!user && (
                        <>
                          <div className={styles.formGroup}>
                            <label htmlFor="name">Your Name</label>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your name"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address *</label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </>
                      )}
                      <div className={styles.formGroup}>
                        <label htmlFor="subject">Subject</label>
                        <select
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Issue</option>
                          <option value="feedback">Feedback/Suggestion</option>
                          <option value="account">Account Help</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe your issue or question"
                          required
                          rows="5"
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </div>

                  {/* Help Resources */}
                  <div className={styles.helpResources}>
                    <h3>Help Resources</h3>
                    <div className={styles.resourceCard}>
                      <div className={styles.resourceIcon}>
                        <i className="mdi mdi-help-circle"></i>
                      </div>
                      <div>
                        <h4>FAQs</h4>
                        <p>Find answers to common questions in our FAQ section.</p>
                        <Link to="/faq" className={styles.resourceLink}>View FAQs</Link>
                      </div>
                    </div>
                    <div className={styles.resourceCard}>
                      <div className={styles.resourceIcon}>
                        <i className="mdi mdi-book-open"></i>
                      </div>
                      <div>
                        <h4>User Guides</h4>
                        <p>Learn how to use all features with our detailed guides.</p>
                        <Link to="/guides" className={styles.resourceLink}>View Guides</Link>
                      </div>
                    </div>
                    <div className={styles.resourceCard}>
                      <div className={styles.resourceIcon}>
                        <i className="mdi mdi-phone"></i>
                      </div>
                      <div>
                        <h4>Live Support</h4>
                        <p>Available Mon-Fri, 9AM-5PM</p>
                        <a href="tel:+18005551234" className={styles.resourceLink}>+1 (800) 555-1234</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Issues */}
                <div className={styles.commonIssues}>
                  <h3>Common Issues</h3>
                  <div className={styles.issueAccordion}>
                    <details className={styles.issueItem}>
                      <summary>I can't log in to my account</summary>
                      <div className={styles.issueContent}>
                        <p>Try resetting your password using the 'Forgot Password' link on the login page. If you're still having trouble, contact us with your account email.</p>
                      </div>
                    </details>
                    <details className={styles.issueItem}>
                      <summary>My workout data isn't syncing</summary>
                      <div className={styles.issueContent}>
                        <p>Make sure you have a stable internet connection. Try logging out and back in. If the issue persists, check our troubleshooting guide or contact support.</p>
                      </div>
                    </details>
                    <details className={styles.issueItem}>
                      <summary>How do I change my fitness goals?</summary>
                      <div className={styles.issueContent}>
                        <p>Go to the Goals section in the app and tap 'Edit Goals'. You can adjust your targets for weight, workouts, and nutrition.</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;