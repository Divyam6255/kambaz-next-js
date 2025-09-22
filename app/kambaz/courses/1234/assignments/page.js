export default function AssignmentsPage() {
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
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/modules">Modules</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item active">
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
            <div className="assignments-content">
          <div className="assignments-header">
            <input type="text" placeholder="Search for Assignments" className="search-field" />
            <div className="assignment-buttons">
              <button>+ Group</button>
              <button>+ Assignment</button>
              <button>+ Manage</button>
              <button>Import</button>
            </div>
          </div>
          
          <div className="assignments-sections">
            <div className="assignment-section">
              <h3>ASSIGNMENTS</h3>
              <ul>
                <li><a href="/kambaz/courses/1234/assignments/editor">A1 - ENV + HTML</a></li>
                <li><a href="/kambaz/courses/1234/assignments/editor">A2 - CSS + BOOTSTRAP</a></li>
                <li><a href="/kambaz/courses/1234/assignments/editor">A3 - JS + REACT</a></li>
              </ul>
            </div>
            
            <div className="assignment-section">
              <h3>QUIZZES</h3>
              <ul>
                <li><a href="#">Q1 - HTML</a></li>
                <li><a href="#">Q2 - CSS</a></li>
              </ul>
            </div>
            
            <div className="assignment-section">
              <h3>EXAMS</h3>
              <ul>
                <li><a href="#">Midterm Exam</a></li>
                <li><a href="#">Final Exam</a></li>
              </ul>
            </div>
            
            <div className="assignment-section">
              <h3>PROJECT</h3>
              <ul>
                <li><a href="#">Final Project</a></li>
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