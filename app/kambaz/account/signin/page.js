'use client';

export default function SigninPage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <div className="nav-item">
            <a href="/kambaz" style={{fontWeight: 'bold', fontSize: '18px', color: 'red'}}>Kambaz</a>
          </div>
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
          <div className="nav-item">
            <a href="/kambaz/inbox">Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs">Labs</a>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="account-container">
          <div className="account-sidebar">
            <div className="account-nav">
              <div className="account-nav-item active">
                <a href="/kambaz/account/signin">Signin</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/signup">Signup</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/profile">Profile</a>
              </div>
            </div>
          </div>
          
          <div className="signin-form">
            <h2>Sign In</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  defaultValue="alice"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  defaultValue="secret123"
                />
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => window.location.href='/kambaz/dashboard'}>
                  Sign In
                </button>
                <button type="button" onClick={() => window.location.href='/kambaz/account/signup'}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}