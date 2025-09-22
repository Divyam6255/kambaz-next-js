export default function ModulesPage() {
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
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/home">Home</a>
            </div>
            <div className="course-nav-item active">
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
            <div className="modules-content">
              <div className="course-hero-image">
                <img src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt="Web Development Technologies" style={{width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px', marginBottom: '20px'}} />
              </div>
              <div className="modules-controls">
                <button>Collapse All</button>
                <button>View Progress</button>
                <select>
                  <option>Publish All</option>
                </select>
                <button>+ Module</button>
              </div>
              
              <div className="module-list">
                <div className="module-item">
                  <h3>Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Brief introduction to the course</li>
                      <li>Learn what is Web Development</li>
                    </ul>
                    <h4>READING</h4>
                    <ul>
                      <li>Full Stack Developer - Chapter 1 - Introduction</li>
                      <li>Full Stack Developer - Chapter 2 - Creating Us</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>Introduction to Web Development</li>
                      <li>Creating an HTTP server with Node.js</li>
                      <li>Creating a React Application</li>
                    </ul>
                  </div>
                </div>
                
                <div className="module-item">
                  <h3>Week 1, Lecture 2 - Formatting User Interfaces with HTML</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Learn how to create user interfaces with HTML</li>
                      <li>Deploy the assignment to Netlify</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>Introduction to HTML and the DOM</li>
                      <li>Formatting Web content with Headings and</li>
                      <li>Formatting content with Lists and Tables</li>
                    </ul>
                  </div>
                </div>
                
                <div className="module-item">
                  <h3>Week 2 - Advanced HTML and CSS</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Advanced HTML elements and attributes</li>
                      <li>CSS styling and layout techniques</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>Forms and Input Elements</li>
                      <li>CSS Selectors and Properties</li>
                      <li>Responsive Design Principles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}