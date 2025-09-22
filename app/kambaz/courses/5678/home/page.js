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
          
          <div className="course-main-content">
            <div className="course-home-content">
              <div className="course-hero-image">
                <img src="/PDP_textbook.jpg" alt="Programming Design and Paradigm" style={{width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px', marginBottom: '20px'}} />
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
                  <h4>Week 1 - Introduction to Programming Paradigms</h4>
                  <ul>
                    <li>Object-Oriented Programming Concepts</li>
                    <li>Functional Programming Fundamentals</li>
                    <li>Procedural vs OOP Design</li>
                  </ul>
                </div>
                
                <div className="module">
                  <h4>Week 2 - Design Patterns and SOLID Principles</h4>
                  <ul>
                    <li>Single Responsibility Principle</li>
                    <li>Observer and Factory Patterns</li>
                    <li>Dependency Injection</li>
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