export default function InboxPage() {
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
          <div className="nav-item">
            <a href="/kambaz/courses">Courses</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar">Calendar</a>
          </div>
          <div className="nav-item active">
            <a href="/kambaz/inbox">Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs">Labs</a>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="inbox-container">
          <h1>Inbox</h1>
          <p>Inbox functionality will be implemented here.</p>
        </div>
      </main>
    </div>
  );
}