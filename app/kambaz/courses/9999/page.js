'use client';

import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from '../../store';
import axios from 'axios';
import { navigationLinks } from '../../data/navigation';
import { usePathname } from 'next/navigation';

export default function CoursePage() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  
  useEffect(() => {
    const fetchCourses = async () => {
      if (courses.length === 0) {
        try {
          const response = await axios.get('http://localhost:4000/api/courses', {
            withCredentials: true
          });
          dispatch(setCourses(response.data));
        } catch (error) {
          console.error('Failed to fetch courses:', error);
        }
      }
    };
    fetchCourses();
  }, [dispatch, courses.length]);
  
  const course = courses.find(c => c.id === '9999' || c.number === '9999');

  if (!course) {
    return <div>Loading course...</div>;
  }

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
          {navigationLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/kambaz' && pathname.startsWith(link.href));
            return (
              <div className={`nav-item ${isActive ? 'active' : ''}`} key={link.href}>
                <a href={link.href}>
                  {link.label === 'Account' && <FaUser className="nav-icon" />}
                  {link.label === 'Dashboard' && <FaTachometerAlt className="nav-icon" />}
                  {link.label === 'Courses' && <FaBook className="nav-icon" />}
                  {link.label === 'Calendar' && <FaCalendarAlt className="nav-icon" />}
                  {link.label === 'Inbox' && <FaInbox className="nav-icon" />}
                  {link.label === 'Labs' && <FaFlask className="nav-icon" />}
                  {link.label}
                </a>
              </div>
            );
          })}
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
          <h1>{course.code} - {course.name}</h1>
          <h3>Instructor: {course.instructor}</h3>
        </div>
        <div className="course-layout">
          <div className="course-nav-sidebar" style={{backgroundColor: 'white'}}>
            <div className="course-nav-item"><a href={`/kambaz/courses/${course.id}/home`}>Home</a></div>
            {course.modules.map(module => (
              <div className="course-nav-item" key={module.id}>
                <a href={`/kambaz/courses/${course.id}/modules`}>{module.title}</a>
              </div>
            ))}
            <div className="course-nav-item"><a href={`/kambaz/courses/${course.id}/people`}>People</a></div>
            <div className="course-nav-item"><a href="#">Piazza</a></div>
            <div className="course-nav-item"><a href="#">Zoom</a></div>
            <div className="course-nav-item"><a href={`/kambaz/courses/${course.id}/assignments`}>Assignments</a></div>
            <div className="course-nav-item"><a href={`/kambaz/courses/${course.id}/quizzes`}>Quizzes</a></div>
            <div className="course-nav-item"><a href="#">Grades</a></div>
          </div>
          <div className="course-main-content">
            <div className="course-content">
              <div className="course-hero-image">
                <Image src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt={course.name} width={300} height={200} style={{borderRadius: '8px', marginBottom: '20px'}} />
              </div>
              <p>{course.home.welcome}</p>
              <ul>
                {course.home.announcements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
              <p>Please select a section from the navigation above.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}