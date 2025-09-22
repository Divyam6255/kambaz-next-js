export default function Course5678Page() {
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
            <div className="course-nav-item">
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
            <div className="course-content">
              <div className="course-hero-image">
                <img src="/PDP_textbook.jpg" alt="Programming Design and Paradigm" style={{width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px', marginBottom: '20px'}} />
              </div>
              <p>Welcome to Course 5678 - Programming Design and Paradigm</p>
              <p>This course covers programming design principles, design patterns, and programming paradigms including object-oriented and functional programming.</p>
              <p>Please select a section from the navigation above.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}