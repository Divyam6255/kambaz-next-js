"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from 'react-icons/fa';
import { peopleByCourse } from '../../../data/people';
import '../../styles.css';
import * as client from '../../../client';

export default function PeoplePage() {
  const pathname = usePathname();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await client.getCourse('1234');
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  const match = pathname.match(/\/courses\/(\d+)\//);
  const courseId = match ? match[1] : '1234';
  const coursePeople = peopleByCourse[courseId] || [];

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

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
          <h1>{course.number} - {course.name}</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar" style={{backgroundColor: 'white'}}>
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
                    {coursePeople.map(person => (
                      <tr key={person.id}>
                        <td>
                          <div className="person-name">
                            <div className="person-avatar">
                              <FaUser className="avatar-icon" />
                            </div>
                            <span>{person.name}</span>
                          </div>
                        </td>
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
        </div>
      </main>
    </div>
  );
}