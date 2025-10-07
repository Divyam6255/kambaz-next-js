'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';

export default function ProfilePage() {
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
          <div className="nav-item dashboard">
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
              <div className="account-nav-item">
                <a href="/kambaz/account/signin">Signin</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/signup">Signup</a>
              </div>
              <div className="account-nav-item active">
                <a href="/kambaz/account/profile">Profile</a>
              </div>
            </div>
          </div>
          
          <div className="profile-form">
            <h2>Profile</h2>
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
                <label htmlFor="firstName">First Name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  defaultValue="Alice"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  defaultValue="Wonderland"
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
              
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  name="dateOfBirth" 
                  defaultValue="2000-01-01"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  defaultValue="alice@wonderland.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" defaultValue="STUDENT">
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ADMIN">Admin</option>
                  <option value="TA">Teaching Assistant</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => window.location.href='/kambaz/account/signin'}>
                  Sign Out
                </button>
                <button type="submit">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}