'use client';
import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';

export default function CoursePage() {
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
          <div className="nav-item">
            <a href="/labs">
              <FaGraduationCap className="nav-icon" />
              Grades
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
            <div className="course-nav-item">
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
            <div className="course-content">
              <div className="course-hero-image">
                <Image src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt="Web Development Technologies" width={300} height={200} style={{borderRadius: '8px', marginBottom: '20px'}} />
              </div>
              <p>Welcome to Course 1234 - Web Development</p>
              <p>This course covers modern web development technologies including HTML5, CSS3, JavaScript, jQuery, PHP, Java, WordPress, and Rails.</p>
              <p>Please select a section from the navigation above.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}