"use client";
import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEllipsisV, FaChevronDown, FaFile, FaVideo, FaPencilAlt, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import { usePathname } from 'next/navigation';
import { courses } from '../../../data/courses';

export default function ModulesPage() {
  const pathname = usePathname();
  const course = courses.find(c => c.id === '1234');
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" alt="NEU" style={{ width: '20px', height: '20px' }} />
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
          <div className={`nav-item${pathname.includes('/courses') ? ' active' : ''}`}> 
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
          <h1>{course.code} - {course.name}</h1>
        </div>
        <div className="course-layout">
          <div className="course-nav-sidebar" style={{ backgroundColor: 'white' }}>
            <div className={`course-nav-item${pathname.endsWith('/home') ? ' active' : ''}`}>
              <a href="/kambaz/courses/1234/home">Home</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/modules') ? ' active' : ''}`}>
              <a href="/kambaz/courses/1234/modules">Modules</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/people') ? ' active' : ''}`}>
              <a href="/kambaz/courses/1234/people">People</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/assignments') ? ' active' : ''}`}>
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
            <div className="modules-content">
              <div className="control-buttons">
                <button className="btn-grey">Collapse All</button>
                <button className="btn-grey">View Progress</button>
                <button className="btn-red"><FaPlus /> Module</button>
                <div className="dropdown">
                  <button className="btn-grey">
                    <FaCheckCircle /> Publish All <FaChevronDown />
                  </button>
                  <div className="dropdown-content">
                    <a href="#"><FaCheckCircle /> Publish All</a>
                    <a href="#"><FaCheckCircle /> Publish All & Notify</a>
                    <a href="#">Unpublish All</a>
                    <a href="#">View All Modules</a>
                  </div>
                </div>
              </div>
              {/* Render modules from data */}
              {course.modules.map(module => (
                <div className="module" key={module.id}>
                  <div className="module-header">
                    <div className="module-title">
                      <FaChevronDown /> {module.title}
                    </div>
                    <div className="module-controls">
                      <FaEllipsisV />
                    </div>
                  </div>
                  {module.items.map((item, idx) => (
                    <div className="lesson" key={idx}>
                      <div className="lesson-title">
                        {item.type === 'file' && <FaFile />}
                        {item.type === 'video' && <FaVideo />}
                        {item.type === 'assignment' && <FaPencilAlt />}
                        {item.title}
                      </div>
                      <div className="module-controls">
                        <FaEllipsisV />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}