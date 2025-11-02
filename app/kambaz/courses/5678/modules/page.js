"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEllipsisV, FaChevronDown, FaFile, FaVideo, FaPencilAlt, FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addModule, updateModule, deleteModule } from '../../../store';

export default function ModulesPage() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const course = courses.find(c => c.id === '5678');

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [newModule, setNewModule] = useState({
    id: '',
    title: '',
    items: []
  });

  const handleAddModule = () => {
    if (newModule.id && newModule.title) {
      dispatch(addModule({ 
        courseId: '5678', 
        module: { ...newModule, items: [] } 
      }));
      setNewModule({ id: '', title: '', items: [] });
      setShowAddDialog(false);
    }
  };

  const handleEditModule = () => {
    if (editingModule) {
      dispatch(updateModule({
        courseId: '5678',
        moduleId: editingModule.id,
        updates: { title: editingModule.title }
      }));
      setShowEditDialog(false);
      setEditingModule(null);
    }
  };

  const handleDeleteModule = (moduleId) => {
    if (confirm('Are you sure you want to delete this module?')) {
      dispatch(deleteModule({ courseId: '5678', moduleId }));
    }
  };

  const openEditDialog = (module) => {
    setEditingModule({ ...module });
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
          <h1>{course.code} - {course.name}</h1>
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
            <div className="modules-content">
              <div className="control-buttons">
                <button className="btn-grey">Collapse All</button>
                <button className="btn-grey">View Progress</button>
                <button className="btn-red" onClick={() => setShowAddDialog(true)}><FaPlus /> Module</button>
                <div className="dropdown">
                  <button className="btn-grey">
                    <FaCheckCircle /> Publish All <FaChevronDown />
                  </button>
                  <div className="dropdown-content">
                    <a href="#"><FaCheckCircle /> Publish All</a>
                    <a href="#"><FaCheckCircle /> Publish All & Notify</a>
                    <a href="#">Unpublish All</a>
                    <a href="#">View All Modules</a>
                  </div>
                </div>
              </div>
              {/* Render modules from Redux store */}
              {course.modules.map(module => (
                <div className="module" key={module.id}>
                  <div className="module-header">
                    <div className="module-title">
                      <FaChevronDown /> {module.title}
                    </div>
                    <div className="module-controls" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button
                        onClick={() => openEditDialog(module)}
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
                        title="Edit Module"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
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
                        title="Delete Module"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {module.items.map((item, idx) => (
                    <div className="lesson" key={idx}>
                      <div className="lesson-title">
                        {item.type === 'file' && <FaFile />}
                        {item.type === 'video' && <FaVideo />}
                        {item.type === 'assignment' && <FaPencilAlt />}
                        {item.title}
                      </div>
                      <div className="module-controls">
                        <FaEllipsisV />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Module Dialog */}
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
              maxWidth: '90%'
            }}>
              <h2>Add New Module</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Module ID</label>
                <input
                  type="text"
                  value={newModule.id}
                  onChange={(e) => setNewModule({ ...newModule, id: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., m3"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Module Title</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., React Hooks"
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewModule({ id: '', title: '', items: [] });
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
                  onClick={handleAddModule}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add Module
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Module Dialog */}
        {showEditDialog && editingModule && (
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
              maxWidth: '90%'
            }}>
              <h2>Edit Module</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Module ID</label>
                <input
                  type="text"
                  value={editingModule.id}
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
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Module Title</label>
                <input
                  type="text"
                  value={editingModule.title}
                  onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditingModule(null);
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
                  onClick={handleEditModule}
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

