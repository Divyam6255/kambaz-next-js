'use client';

import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from 'react-icons/fa';
import './styles.css';
import { navigationLinks } from '../data/navigation';
import { dashboardData } from '../data/dashboard';
import { courses } from '../data/courses';
import { usePathname } from 'next/navigation';


export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <Image src="/org-neu.svg" alt="NEU" width={30} height={20} />
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
        </div>
      </nav>
      <main className="main-content">
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <h2>Published Courses</h2>
          <div className="courses-grid">
            {dashboardData.enrolledCourses.map((course) => {
              // Find course details for image and description
              const courseDetails = courses.find(c => c.id === course.id);
              let imgSrc = "/1_V-Jp13LvtVc2IiY2fp4qYw.jpg";
              let desc = courseDetails ? courseDetails.name : course.name;
              if (course.id === '5678') imgSrc = "/PDP_textbook.jpg";

              // Check if this course is currently active (user is viewing it)
              const isActive = pathname.includes(`/courses/${course.id}`);

              return (
                <div className={`course-card ${isActive ? 'active' : ''}`} key={course.id}>
                  <a href={`/kambaz/courses/${course.id}/home`}>
                    <Image src={imgSrc} alt={`Course ${course.id}`} width={300} height={150} />
                    <div className="course-info">
                      <h3>{course.code}</h3>
                      <p>{desc}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}              