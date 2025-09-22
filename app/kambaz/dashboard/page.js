import Image from 'next/image';

export default function DashboardPage() {
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
          <div className="nav-item active">
            <a href="/kambaz/dashboard">Dashboard</a>
          </div>
          <div className="nav-item">
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
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <h2>Published Courses</h2>
          
          <div className="courses-grid">
            <div className="course-card">
              <a href="/kambaz/courses/1234">
                <Image src="/1_V-Jp13LvtVc2IiY2fp4qYw.jpg" alt="Course 1234" width={200} height={150} style={{borderRadius: '8px'}} />
                <div className="course-info">
                  <h3>Course 1234</h3>
                  <p>Web Development</p>
                </div>
              </a>
            </div>
            
            <div className="course-card">
              <a href="/kambaz/courses/5678">
                <Image src="/PDP_textbook.jpg" alt="Course 5678" width={200} height={150} style={{borderRadius: '8px'}} />
                <div className="course-info">
                  <h3>Course 5678</h3>
                  <p>Programming Design and Paradigm</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}