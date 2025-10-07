'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import './styles.css';

export default function InboxPage() {
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
        <div className="inbox-container">
          <h1>Inbox</h1>
          <p>Inbox functionality will be implemented here.</p>
        </div>
      </main>
    </div>
  );
}