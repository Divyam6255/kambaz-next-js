import Image from 'next/image';

export default function Course5678HomePage() {
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
          <h1>Course 5678 - Programming Design and Paradigm</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item active">
              <a href="/kambaz/courses/5678/home">Home</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/5678/modules">Modules</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/5678/assignments">Assignments</a>
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
              <h2>CS5678 - Programming Design and Paradigm</h2>
              <p>Welcome to CS5678 Programming Design and Paradigm! This course covers object-oriented design, design patterns, and programming paradigms.</p>
              
              <div className="course-section">
                <h3>Course Information</h3>
                <p><strong>Instructor:</strong> Dr. Smith</p>
                <p><strong>Credits:</strong> 4</p>
                <p><strong>Prerequisites:</strong> CS3500 Object-Oriented Design</p>
                <p><strong>Meeting Time:</strong> TTh 1:35-3:15 PM</p>
              </div>

              <div className="course-section">
                <h3>Course Description</h3>
                <p>
                  This course examines object-oriented programming and contrasts it with functional programming. 
                  Students will learn design patterns, SOLID principles, and how to apply different programming 
                  paradigms to solve complex software engineering problems.
                </p>
              </div>

              <div className="course-section">
                <h3>Recent Activity</h3>
                <ul>
                  <li>Assignment 1: Design Patterns Implementation - Due Oct 2</li>
                  <li>Lab 2: SOLID Principles Practice - Due Oct 7</li>
                  <li>Quiz 1: OOP Concepts - Oct 12</li>
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