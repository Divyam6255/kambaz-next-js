import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from 'react-icons/fa';
import './styles.css';

export default function DashboardPage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <Image src="/org-neu.svg" 
                     alt="NEU" width={30} height={20} />
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
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <h2>Published Courses</h2>
          
          <div className="courses-grid">
            <div className="course-card">
              <a href="/kambaz/courses/1234/home">
                <Image src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt="Course 1234" width={300} height={150} />
                <div className="course-info">
                  <h3>CS 4550</h3>
                  <p>Web Development</p>
                </div>
              </a>
            </div>
            
            <div className="course-card">
              <a href="/kambaz/courses/5678/home">
                <Image src="/PDP_textbook.jpg" alt="Course 5678" width={300} height={150} />
                <div className="course-info">
                  <h3>CS 3500</h3>
                  <p>Object-Oriented Design</p>
                </div>
              </a>
            </div>

            <div className="course-card">
              <a href="/kambaz/courses/9999/home">
                <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                  CS 2500
                </div>
                <div className="course-info">
                  <h3>CS 2500</h3>
                  <p>Fundamentals of Computer Science</p>
                </div>
              </a>
            </div>

            <div className="course-card">
              <a href="/kambaz/courses/1111/home">
                <div style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                  MATH 1365
                </div>
                <div className="course-info">
                  <h3>MATH 1365</h3>
                  <p>Introduction to Mathematical Reasoning</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}