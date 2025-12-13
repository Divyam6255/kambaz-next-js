'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEdit, FaTrash, FaSearch, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import '../dashboard/styles.css';
import './styles.css';
import { navigationLinks, adminLinks } from '../data/navigation';
import { usePathname } from 'next/navigation';
import * as client from '../client';

export default function UsersPage() {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.currentUser);
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    role: 'STUDENT'
  });

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Wait a moment for Redux store to load if it hasn't yet
        if (authChecking) {
          setTimeout(() => setAuthChecking(false), 100);
          return;
        }

        // Check if user is authenticated by trying to fetch data from backend
        // The backend will handle authentication via session
        const usersData = await client.getAllUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
        setError('');
      } catch (err) {
        console.error('Error fetching users:', err);
        if (err.response?.status === 403) {
          setError('Access denied. Admin privileges required.');
          setTimeout(() => {
            router.push('/kambaz/dashboard');
          }, 2000);
        } else if (err.response?.status === 401) {
          setError('Please sign in to access this page');
          setTimeout(() => {
            router.push('/kambaz/account/signin');
          }, 1500);
        } else {
          setError('Failed to load users');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authChecking, router]);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (roleFilter !== 'ALL') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by name or username
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleAddUser = async () => {
    if (!newUser.username) {
      alert('Username is required');
      return;
    }

    try {
      const createdUser = await client.createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        role: 'STUDENT'
      });
      setShowAddDialog(false);
      alert('✓ User created successfully!');
    } catch (err) {
      console.error('Error creating user:', err);
      alert('❌ ' + (err.response?.data?.message || 'Failed to create user'));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await client.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
      }
      alert('✓ User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('❌ Failed to delete user');
    }
  };

  const handleUpdateUser = async (userId, updates) => {
    try {
      const updatedUser = await client.updateUser(userId, updates);
      setUsers(users.map(u => u._id === userId ? updatedUser : u));
      if (selectedUser?._id === userId) {
        setSelectedUser(updatedUser);
      }
      alert('✓ User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('❌ Failed to update user');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) return <div className="kambaz-container"><div className="main-content"><p>Loading users...</p></div></div>;
  
  if (error) {
    return (
      <div className="kambaz-container">
        <div className="main-content">
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
            textAlign: 'center'
          }}>
            <h2>⚠️ {error}</h2>
            {error.includes('Access denied') && <p>You will be redirected to the dashboard...</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <Image src="/org-neu.svg" alt="NEU" width={30} height={20} />
              NEU
            </a>
          </div>
          {navigationLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/kambaz' && pathname.startsWith(link.href));
            return (
              <div className={`nav-item ${isActive ? 'active' : ''}`} key={link.href}>
                <a href={link.href}>
                  {link.label === 'Account' && <FaUser className="nav-icon" />}
                  {link.label === 'Dashboard' && <FaTachometerAlt className="nav-icon" />}
                  {link.label === 'Courses' && <FaBook className="nav-icon" />}
                  {link.label === 'Calendar' && <FaCalendarAlt className="nav-icon" />}
                  {link.label === 'Inbox' && <FaInbox className="nav-icon" />}
                  {link.label === 'Labs' && <FaFlask className="nav-icon" />}
                  {link.label}
                </a>
              </div>
            );
          })}
          {/* Admin-only links */}
          {currentUser && currentUser.role === 'ADMIN' && adminLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/kambaz' && pathname.startsWith(link.href));
            return (
              <div className={`nav-item ${isActive ? 'active' : ''}`} key={link.href}>
                <a href={link.href}>
                  {link.label === 'Users' && <FaUsers className="nav-icon" />}
                  {link.label}
                </a>
              </div>
            );
          })}
        </div>
      </nav>

      <main className="main-content">
        <div className="users-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1>Users Management</h1>
            <button 
              className="btn-red"
              onClick={() => setShowAddDialog(true)}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaPlus /> Add User
            </button>
          </div>

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          {/* Filters */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 35px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '150px'
                }}
              >
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">TA</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="users-layout">
            {/* Users List */}
            <div className="users-list">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Username</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user._id} 
                      style={{ 
                        borderBottom: '1px solid #dee2e6',
                        backgroundColor: selectedUser?._id === user._id ? '#e7f3ff' : 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleUserClick(user)}
                    >
                      <td style={{ padding: '12px' }}>
                        <strong>{user.firstName} {user.lastName}</strong>
                      </td>
                      <td style={{ padding: '12px' }}>{user.username}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: 
                            user.role === 'FACULTY' ? '#ffc107' :
                            user.role === 'TA' ? '#17a2b8' :
                            user.role === 'ADMIN' ? '#dc3545' : '#28a745',
                          color: 'white'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{user.email || '-'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user._id);
                          }}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  No users found
                </p>
              )}
            </div>

            {/* User Details Panel */}
            {selectedUser && (
              <div className="user-details">
                <h3>User Details</h3>
                <div className="user-detail-form">
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={selectedUser.firstName || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      value={selectedUser.lastName || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={selectedUser.email || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      value={selectedUser.dob ? new Date(selectedUser.dob).toISOString().split('T')[0] : ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, dob: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="FACULTY">Faculty</option>
                      <option value="TA">TA</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleUpdateUser(selectedUser._id, selectedUser)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Update User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add User Dialog */}
        {showAddDialog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              width: '500px',
              maxWidth: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2>Add New User</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="e.g., john_doe"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Leave empty for default: password123"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>First Name</label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Last Name</label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth</label>
                <input
                  type="date"
                  value={newUser.dob}
                  onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="TA">TA</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewUser({
                      username: '',
                      password: '',
                      firstName: '',
                      lastName: '',
                      email: '',
                      dob: '',
                      role: 'STUDENT'
                    });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
