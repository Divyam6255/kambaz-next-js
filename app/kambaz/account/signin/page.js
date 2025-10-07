'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';

export default function SigninPage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" 
                   alt="NEU" style={{width: '20px', height: '20px'}} />
              NEU
            </a>
          </div>
          <div className="nav-item account">
            <a href="/kambaz/account">
              <FaUser className="nav-icon" />
              Account
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard">
              <FaTachometerAlt className="nav-icon" />
              Dashboard
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/courses">
              <FaBook className="nav-icon" />
              Courses
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar">
              <FaCalendarAlt className="nav-icon" />
              Calendar
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox">
              <FaInbox className="nav-icon" />
              Inbox
            </a>
          </div>
          <div className="nav-item">
            <a href="/labs">
              <FaFlask className="nav-icon" />
              Labs
            </a>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="account-container">
          <div className="account-sidebar">
            <div className="account-nav">
              <div className="account-nav-item active">
                <a href="/kambaz/account/signin">Signin</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/signup">Signup</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/profile">Profile</a>
              </div>
            </div>
          </div>
          
          <div className="signin-form">
            <h2>Sign In</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  defaultValue="alice"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  defaultValue="secret123"
                />
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => window.location.href='/kambaz/dashboard'}>
                  Sign In
                </button>
                <button type="button" onClick={() => window.location.href='/kambaz/account/signup'}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}