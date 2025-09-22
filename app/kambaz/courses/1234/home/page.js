import Image from 'next/image';

export default function CourseHomePage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">NEU</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/account">Account</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard">Dashboard</a>
          </div>
          <div className="nav-item active">
            <a href="/kambaz/courses">Courses</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar">Calendar</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox">Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs">Labs</a>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="course-header">
          <h1>Course 1234 - Web Development</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item active">
              <a href="/kambaz/courses/1234/home">Home</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/modules">Modules</a>
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
            <div className="course-home-content">
              <div className="course-hero-image">
                <Image src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt="Web Development Technologies" width={300} height={200} style={{borderRadius: '8px', marginBottom: '20px'}} />
              </div>
          <div className="top-buttons">
            <button>Import Existing Content</button>
            <button>Import from Commons</button>
            <button>Choose Home Page</button>
            <button>View Course Stream</button>
            <button>New Announcement</button>
            <button>New Analytics</button>
            <button>View Course Notifications</button>
          </div>
          
          <div className="course-status">
            <h3>Course Status</h3>
            <p>Published</p>
            <ul>
              <li>Unpublished Changes</li>
              <li>Choose Home Page</li>
              <li>Course Setup Checklist</li>
            </ul>
          </div>
          
          <div className="modules-section">
            <h3>Recent Modules</h3>
            
            <div className="module">
              <h4>Week 1 - Introduction to Web Development</h4>
              <ul>
                <li>Course Introduction, Syllabus, Agenda</li>
                <li>Creating an HTTP server with Node.js</li>
                <li>Creating a React Application</li>
              </ul>
            </div>
            
            <div className="module">
              <h4>Week 2 - HTML and CSS Fundamentals</h4>
              <ul>
                <li>Introduction to HTML and the DOM</li>
                <li>Formatting Web content with Headings and Text</li>
                <li>Creating Web content with Lists and Tables</li>
              </ul>
            </div>
          </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}