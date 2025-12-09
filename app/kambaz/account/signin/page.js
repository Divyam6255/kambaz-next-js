'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';
import * as client from '../../client';
import { setCurrentUser } from '../../store';

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      router.push('/kambaz/dashboard');
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" 
                   alt="NEU" style={{width: '20px', height: '20px'}} />
              NEU
            </a>
          </div>
          <div className="nav-item account">
            <a href="/kambaz/account">
              <FaUser className="nav-icon" />
              Account
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard">
              <FaTachometerAlt className="nav-icon" />
              Dashboard
            </a>
          </div>
          <div className="nav-item">
            <Link href="/kambaz/courses">
              <FaBook className="nav-icon" />
              Courses
            </Link>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar">
              <FaCalendarAlt className="nav-icon" />
              Calendar
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox">
              <FaInbox className="nav-icon" />
              Inbox
            </a>
          </div>
          <div className="nav-item">
            <a href="/labs">
              <FaFlask className="nav-icon" />
              Labs
            </a>
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
            {error && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: 4,
                marginBottom: 16,
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSignin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <button type="button" onClick={() => router.push('/kambaz/account/signup')}>
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