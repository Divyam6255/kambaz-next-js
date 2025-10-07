'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaEnvelope } from 'react-icons/fa';
import '../../styles.css';

export default function PeoplePage() {
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
          <h1>Course 1234 - Web Development</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/home">Home</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/modules">Modules</a>
            </div>
            <div className="course-nav-item active">
              <a href="/kambaz/courses/1234/people">People</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/assignments">Assignments</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Quizzes</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Grades</a>
            </div>
          </div>
          
          <div className="course-main-content">
            <div className="people-content">
              <h2>People</h2>
              
              <div className="people-table-container">
                <table className="people-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Login ID</th>
                      <th>Section</th>
                      <th>Role</th>
                      <th>Last Activity</th>
                      <th>Total Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="person-name">
                          <div className="person-avatar">
                            <FaUser className="avatar-icon" />
                          </div>
                          <span>Tony Stark</span>
                        </div>
                      </td>
                      <td>001234561S</td>
                      <td>S101</td>
                      <td>STUDENT</td>
                      <td>2020-10-01T00:00:00.000Z</td>
                      <td>10:21:32</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="person-name">
                          <div className="person-avatar">
                            <FaUser className="avatar-icon" />
                          </div>
                          <span>Bruce Wayne</span>
                        </div>
                      </td>
                      <td>001234562S</td>
                      <td>S101</td>
                      <td>STUDENT</td>
                      <td>2020-11-02T00:00:00.000Z</td>
                      <td>15:32:43</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="person-name">
                          <div className="person-avatar">
                            <FaUser className="avatar-icon" />
                          </div>
                          <span>Steve Rogers</span>
                        </div>
                      </td>
                      <td>001234563S</td>
                      <td>S101</td>
                      <td>STUDENT</td>
                      <td>2020-10-02T00:00:00.000Z</td>
                      <td>23:32:43</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="person-name">
                          <div className="person-avatar">
                            <FaUser className="avatar-icon" />
                          </div>
                          <span>Professor John Smith</span>
                        </div>
                      </td>
                      <td>001234500T</td>
                      <td>S101</td>
                      <td>INSTRUCTOR</td>
                      <td>2025-10-05T00:00:00.000Z</td>
                      <td>120:45:30</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="person-name">
                          <div className="person-avatar">
                            <FaUser className="avatar-icon" />
                          </div>
                          <span>Sarah Johnson</span>
                        </div>
                      </td>
                      <td>001234501T</td>
                      <td>S101</td>
                      <td>TA</td>
                      <td>2025-10-04T00:00:00.000Z</td>
                      <td>85:20:15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}