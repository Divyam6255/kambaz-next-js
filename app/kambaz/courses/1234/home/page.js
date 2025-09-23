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
          
          <div className="course-main-content" style={{display: 'flex', gap: '20px'}}>
            <div style={{flex: '1'}}>
              <h2>CS4550 - Web Development</h2>
              <p>Welcome to CS4550 Web Development! This course covers modern web development technologies including HTML, CSS, JavaScript, React, and Node.js.</p>
              
              <div className="course-section">
                <h3>Course Information</h3>
                <p><strong>Instructor:</strong> Dr. Johnson</p>
                <p><strong>Credits:</strong> 4</p>
                <p><strong>Prerequisites:</strong> CS3500 Object-Oriented Design</p>
                <p><strong>Meeting Time:</strong> MWF 2:50-3:55 PM</p>
              </div>

              <div className="course-section">
                <h3>Course Description</h3>
                <p>
                  This course introduces students to web development using modern technologies. 
                  Students will learn to create interactive web applications using HTML5, CSS3, 
                  JavaScript ES6+, React, and server-side development with Node.js and Express.
                </p>
              </div>

              <div className="course-section">
                <h3>Recent Activity</h3>
                <ul>
                  <li>Assignment 1: HTML/CSS Portfolio - Due Sept 30</li>
                  <li>Lab 2: JavaScript Fundamentals - Due Oct 5</li>
                  <li>Quiz 1: Web Basics - Oct 10</li>
                </ul>
              </div>
            </div>
            
            <div style={{width: '250px', padding: '20px'}}>
              <h3>Course Status</h3>
              <div style={{marginBottom: '10px'}}>
                <button style={{marginRight: '10px'}}>Unpublish</button>
                <button>Publish</button>
              </div>
              <div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>Import Existing Content</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>Import from Commons</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>Choose Home Page</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>View Course Stream</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>New Announcement</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>New Analytics</button></div>
                <div><button style={{display: 'block', marginBottom: '5px', width: '100%', textAlign: 'left'}}>View Course Notifications</button></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}