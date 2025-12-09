'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaGraduationCap } from 'react-icons/fa';
import '../styles.css';
import * as client from '../../client';
import { setCurrentUser, updateCurrentUser, clearCurrentUser } from '../../store';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [profileData, setProfileData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await client.getProfile();
        setProfileData({
          username: user.username || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          dob: user.dob ? user.dob.split('T')[0] : '',
          role: user.role || 'STUDENT'
        });
        dispatch(setCurrentUser(user));
      } catch (err) {
        console.error('Load profile error:', err);
        if (err.response?.status === 401) {
          router.push('/kambaz/account/signin');
        } else {
          setError('Error loading profile');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [dispatch, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updatedUser = await client.updateProfile(profileData);
      dispatch(updateCurrentUser(updatedUser));
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
              <div className="account-nav-item">
                <a href="/kambaz/account/signup">Signup</a>
              </div>
              <div className="account-nav-item active">
                <a href="/kambaz/account/profile">Profile</a>
              </div>
            </div>
          </div>
          
          <div className="profile-form">
            <h2>Profile</h2>
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
            {success && (
              <div style={{
                background: '#d4edda',
                color: '#155724',
                padding: '12px',
                borderRadius: 4,
                marginBottom: 16,
                border: '1px solid #c3e6cb'
              }}>
                {success}
              </div>
            )}
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={profileData.username}
                  disabled
                  style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  value={profileData.dob}
                  onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select 
                  id="role" 
                  name="role" 
                  value={profileData.role}
                  onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="TA">TA</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  onClick={async () => {
                    try {
                      await client.signout();
                      dispatch(clearCurrentUser());
                      router.push('/kambaz/account/signin');
                    } catch (err) {
                      console.error('Signout error:', err);
                    }
                  }}
                  style={{ backgroundColor: '#dc3545' }}
                >
                  Sign Out
                </button>
                <button type="submit">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}