"use client";
import { usePathname } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from 'react-icons/fa';
import '../../styles.css';
import { courses } from '../../../data/courses';
import { peopleByCourse } from '../../../data/people';

export default function PeoplePage() {
  const pathname = usePathname();
  const course = courses.find(c => c.id === '9999');
  const coursePeople = peopleByCourse['9999'] || [];
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" alt="NEU" style={{width: '20px', height: '20px'}} />
              NEU
            </a>
          </div>
          <div className="nav-item account">
            <a href="/kambaz/account"><FaUser className="nav-icon" />Account</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard"><FaTachometerAlt className="nav-icon" />Dashboard</a>
          </div>
          <div className={`nav-item${pathname.includes('/courses') ? ' active' : ''}`}> 
            <a href="/kambaz/courses"><FaBook className="nav-icon" />Courses</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar"><FaCalendarAlt className="nav-icon" />Calendar</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox"><FaInbox className="nav-icon" />Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs"><FaFlask className="nav-icon" />Labs</a>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <div className="course-header">
          <h1>{course.code} - {course.name}</h1>
        </div>
        <div className="course-layout">
          <div className="course-nav-sidebar" style={{backgroundColor: 'white'}}>
            <div className={`course-nav-item${pathname.endsWith('/home') ? ' active' : ''}`}>
              <a href="/kambaz/courses/9999/home">Home</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/modules') ? ' active' : ''}`}>
              <a href="/kambaz/courses/9999/modules">Modules</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/people') ? ' active' : ''}`}>
              <a href="/kambaz/courses/9999/people">People</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/assignments') ? ' active' : ''}`}>
              <a href="/kambaz/courses/9999/assignments">Assignments</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Quizzes</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Grades</a>
            </div>
          </div>
          <div className="course-main-content">
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
                  {coursePeople.map(person => (
                    <tr key={person.id}>
                      <td><span className="people-avatar"><FaUser /></span> {person.name}</td>
                      <td>{person.email}</td>
                      <td>S101</td>
                      <td>{person.role.toUpperCase()}</td>
                      <td>2025-10-01T00:00:00.000Z</td>
                      <td>10:21:32</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}