'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import '../../styles.css';

export default function Course5678AssignmentsPage() {
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
          <div className="nav-item active">
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
        <div className="course-header">
          <h1>Course 5678 - Programming Design and Paradigm</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item">
              <a href="/kambaz/courses/5678/home">Home</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/5678/modules">Modules</a>
            </div>
            <div className="course-nav-item">
              <a href="#">People</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item active">
              <a href="/kambaz/courses/5678/assignments">Assignments</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Quizzes</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Grades</a>
            </div>
          </div>
          
          <div className="course-main-content">
            <div className="assignments-content">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <div className="assignment-search">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search for Assignments" />
                </div>
                <div className="control-buttons">
                  <button className="btn-grey">
                    <FaPlus /> Group
                  </button>
                  <button className="btn-red">
                    <FaPlus /> Assignment
                  </button>
                </div>
              </div>
          
              <div className="assignment-item">
                <div className="assignment-info">
                  <h4><a href="#">A1 - OOP Design Patterns</a></h4>
                  <p><strong>Multiple Modules</strong> | <strong>Due</strong> Sep 20 at 11:59pm | <strong>Available until</strong> Sep 27 at 11:59pm</p>
                  <p>100 pts</p>
                </div>
                <div className="assignment-controls">
                  <FaEllipsisV />
                </div>
              </div>

              <div className="assignment-item">
                <div className="assignment-info">
                  <h4><a href="#">A2 - Functional Programming</a></h4>
                  <p><strong>Multiple Modules</strong> | <strong>Due</strong> Oct 4 at 11:59pm | <strong>Available until</strong> Oct 11 at 11:59pm</p>
                  <p>100 pts</p>
                </div>
                <div className="assignment-controls">
                  <FaEllipsisV />
                </div>
              </div>

              <div className="assignment-item">
                <div className="assignment-info">
                  <h4><a href="#">A3 - SOLID Principles Implementation</a></h4>
                  <p><strong>Multiple Modules</strong> | <strong>Due</strong> Oct 18 at 11:59pm | <strong>Available until</strong> Oct 25 at 11:59pm</p>
                  <p>100 pts</p>
                </div>
                <div className="assignment-controls">
                  <FaEllipsisV />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}