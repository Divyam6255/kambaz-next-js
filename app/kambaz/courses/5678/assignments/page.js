"use client";
import { useState, useEffect } from 'react';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaSearch, FaPlus, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import '../../styles.css';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses, addAssignmentThunk, updateAssignmentThunk, deleteAssignmentThunk } from '../../../store';
import axios from 'axios';

export default function AssignmentsPage() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  
  useEffect(() => {
    const fetchCourses = async () => {
      if (courses.length === 0) {
        try {
          const response = await axios.get('http://localhost:4000/api/courses', {
            withCredentials: true
          });
          dispatch(setCourses(response.data));
        } catch (error) {
          console.error('Failed to fetch courses:', error);
        }
      }
    };
    fetchCourses();
  }, [dispatch, courses.length]);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    id: '',
    title: '',
    due: '',
    points: '',
    description: ''
  });

  const course = courses.find(c => c.id === '5678' || c.number === '5678');

  if (!course) {
    return <div>Loading course...</div>;
  }

  const handleAddAssignment = async () => {
    if (newAssignment.id && newAssignment.title && newAssignment.due && newAssignment.points) {
      await dispatch(addAssignmentThunk({ 
        courseId: '5678', 
        assignment: { 
          ...newAssignment, 
          points: parseInt(newAssignment.points) 
        } 
      }));
      setNewAssignment({ id: '', title: '', due: '', points: '', description: '' });
      setShowAddDialog(false);
    }
  };

  const handleEditAssignment = async () => {
    if (editingAssignment) {
      await dispatch(updateAssignmentThunk({
        courseId: '5678',
        assignmentId: editingAssignment.id,
        updates: { 
          title: editingAssignment.title,
          due: editingAssignment.due,
          points: parseInt(editingAssignment.points),
          description: editingAssignment.description
        }
      }));
      setShowEditDialog(false);
      setEditingAssignment(null);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      await dispatch(deleteAssignmentThunk({ courseId: '5678', assignmentId }));
    }
  };

  const openEditDialog = (assignment) => {
    setEditingAssignment({ ...assignment });
    setShowEditDialog(true);
  };

  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" alt="NEU" style={{ width: '20px', height: '20px' }} />
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
          <div className={`nav-item${pathname.includes('/courses') ? ' active' : ''}`}> 
            <a href="/kambaz/courses">
              <FaBook className="nav-icon" />
              Courses
            </a>
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
        <div className="course-header">
          <h1>{course?.number} - {course?.name}</h1>
        </div>
        <div className="course-layout">
          <div className="course-nav-sidebar" style={{ backgroundColor: 'white' }}>
            <div className={`course-nav-item${pathname.endsWith('/home') ? ' active' : ''}`}>
              <a href="/kambaz/courses/5678/home">Home</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/modules') ? ' active' : ''}`}>
              <a href="/kambaz/courses/5678/modules">Modules</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/people') ? ' active' : ''}`}>
              <a href="/kambaz/courses/5678/people">People</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className={`course-nav-item${pathname.includes('/assignments') ? ' active' : ''}`}>
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
            <div className="assignments-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="assignment-search">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search for Assignments" />
                </div>
                <div className="control-buttons">
                  <button className="btn-grey">
                    <FaPlus /> Group
                  </button>
                  <button className="btn-red" onClick={() => setShowAddDialog(true)}>
                    <FaPlus /> Assignment
                  </button>
                </div>
              </div>
              {course.assignments.map(assignment => (
                <div className="assignment-item" key={assignment.id} style={{ position: 'relative' }}>
                  <div className="assignment-info">
                    <h4>
                      <a href="/kambaz/courses/5678/assignments/editor" style={{ color: '#007bff', textDecoration: 'none' }}>
                        {assignment.title}
                      </a>
                    </h4>
                    <p><strong>Multiple Modules</strong> | <strong>Due</strong> {assignment.due} | <strong>Available until</strong> ... </p>
                    <p>{assignment.points} pts</p>
                  </div>
                  <div className="assignment-controls" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => openEditDialog(assignment)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Edit Assignment"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Delete Assignment"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Assignment Dialog */}
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
              <h2>Add New Assignment</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment ID</label>
                <input
                  type="text"
                  value={newAssignment.id}
                  onChange={(e) => setNewAssignment({ ...newAssignment, id: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., a3"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., Final Project"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date</label>
                <input
                  type="date"
                  value={newAssignment.due}
                  onChange={(e) => setNewAssignment({ ...newAssignment, due: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points</label>
                <input
                  type="number"
                  value={newAssignment.points}
                  onChange={(e) => setNewAssignment({ ...newAssignment, points: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., 100"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '100px'
                  }}
                  placeholder="Assignment description..."
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewAssignment({ id: '', title: '', due: '', points: '', description: '' });
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
                  onClick={handleAddAssignment}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add Assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Assignment Dialog */}
        {showEditDialog && editingAssignment && (
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
              <h2>Edit Assignment</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment ID</label>
                <input
                  type="text"
                  value={editingAssignment.id}
                  disabled
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#f0f0f0'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment Title</label>
                <input
                  type="text"
                  value={editingAssignment.title}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date</label>
                <input
                  type="date"
                  value={editingAssignment.due}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, due: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points</label>
                <input
                  type="number"
                  value={editingAssignment.points}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, points: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  value={editingAssignment.description}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, description: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '100px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditingAssignment(null);
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
                  onClick={handleEditAssignment}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
