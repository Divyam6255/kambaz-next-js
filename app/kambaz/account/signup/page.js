'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';
import * as client from '../../client';
import { setCurrentUser } from '../../store';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    verifyPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (userData.password !== userData.verifyPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const user = await client.signup({
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dob: userData.dob,
        role: userData.role
      });
      
      // Auto sign in after signup
      const signedInUser = await client.signin({
        username: userData.username,
        password: userData.password
      });
      
      console.log('✅ User signed up and signed in:', signedInUser.username, 'Role:', signedInUser.role);
      dispatch(setCurrentUser(signedInUser));
      router.push('/kambaz/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Error creating account');
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
          <div className="nav-item dashboard">
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
              <div className="account-nav-item">
                <a href="/kambaz/account/signin">Signin</a>
              </div>
              <div className="account-nav-item active">
                <a href="/kambaz/account/signup">Signup</a>
              </div>
              <div className="account-nav-item">
                <a href="/kambaz/account/profile">Profile</a>
              </div>
            </div>
          </div>
          
          <div className="signup-form">
            <h2>Sign Up</h2>
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
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="verifyPassword">Verify Password:</label>
                <input 
                  type="password" 
                  id="verifyPassword" 
                  name="verifyPassword" 
                  value={userData.verifyPassword}
                  onChange={(e) => setUserData({ ...userData, verifyPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  value={userData.dob}
                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role: <span style={{ color: 'red' }}>*</span></label>
                <select 
                  id="role" 
                  name="role" 
                  value={userData.role}
                  onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                  required
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="TA">TA</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <small style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '4px', display: 'block' }}>
                  Choose carefully - role cannot be changed after signup
                </small>
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => router.push('/kambaz/account/signin')}>
                  Sign In
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}