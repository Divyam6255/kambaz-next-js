"use client";
import { useState, useEffect } from 'react';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEllipsisV, FaChevronDown, FaFile, FaVideo, FaPencilAlt, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from '../../../store';
import * as client from '../../../client';

export default function CourseHomePage() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await client.getCourse('1234');
        setCourse(courseData);
        
        // If Redux courses are empty, fetch all courses
        if (courses.length === 0) {
          const allCourses = await client.getAllCourses();
          dispatch(setCourses(allCourses));
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courses.length, dispatch]);

  // Get course from Redux for modules data (for now)
  const courseFromRedux = courses.find(c => c.id === '1234' || c.number === '1234');

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
            <div className="home-layout">
              <div className="home-main-content">
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
                  {courseFromRedux?.modules.map(module => (
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
              <div className="home-sidebar">
                <div className="course-status-section">
                  <h5>Course Status</h5>
                  <button className="status-item">
                    <span>Import Existing Content</span>
                  </button>
                  <button className="status-item">
                    <span>Import from Commons</span>
                  </button>
                  <button className="status-item">
                    <span>Choose Home Page</span>
                  </button>
                  <button className="status-item">
                    <span>View Course Stream</span>
                  </button>
                  <button className="status-item">
                    <span>New Analytics</span>
                  </button>
                  <button className="status-item">
                    <span>View Course Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}