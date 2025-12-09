'use client';

import Link from 'next/link';
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
  
  const course = courses.find(c => c.id === '5678' || c.number === '5678');

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
          <h1>{course?.number} - {course?.name}</h1>
        </div>

        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item">
              <Link href="/kambaz/courses/5678/home">Home</Link>
            </div>
            <div className="course-nav-item">
              <Link href="/kambaz/courses/5678/modules">Modules</Link>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item">
              <Link href="/kambaz/courses/5678/assignments">Assignments</Link>
            </div>
            <div className="course-nav-item">
              <Link href="/kambaz/courses/5678/quizzes">Quizzes</Link>
            </div>
            <div className="course-nav-item">
              <Link href={`/kambaz/courses/${course.id}/quizzes`}>Quizzes</Link>
            </div>
            <div className="course-nav-item">
              <a href="#">Grades</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}