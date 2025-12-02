'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaTrash, FaEdit, FaUsers } from 'react-icons/fa';
import './styles.css';
import { navigationLinks } from '../data/navigation';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses, addCourse, updateCourse, deleteCourse, setCurrentUser } from '../store';
import * as client from '../client';


export default function DashboardPage() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const currentUser = useSelector((state) => state.users.currentUser);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    number: '',
    startDate: '',
    endDate: '',
    department: '',
    credits: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [userLoading, setUserLoading] = useState(true);
  const [showAllCourses, setShowAllCourses] = useState(true);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await client.getCurrentUser();
        dispatch(setCurrentUser(user));
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setUserLoading(false);
      }
    };
    if (!currentUser) {
      fetchUser();
    } else {
      setUserLoading(false);
    }
  }, [currentUser, dispatch]);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await client.getAllCourses();
        dispatch(setCourses(coursesData));
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      }
    };
    fetchCourses();
  }, [dispatch]);

  // Fetch user's enrollments separately when user is available
  useEffect(() => {
    const fetchEnrollments = async () => {
      console.log('Fetch enrollments called - userLoading:', userLoading, 'currentUser:', currentUser?._id);
      
      // Wait for user loading to complete
      if (userLoading) {
        console.log('Still loading user, skipping enrollment fetch');
        return;
      }
      
      // If no user after loading, clear enrollments
      if (!currentUser) {
        console.log('No current user, clearing enrollments');
        setEnrollments([]);
        setEnrolledCourseIds(new Set());
        return;
      }
      
      console.log('Fetching enrollments for user:', currentUser._id);
      
      try {
        const userEnrollments = await client.getCurrentUserEnrollments();
        console.log('Raw enrollment response:', userEnrollments);
        setEnrollments(userEnrollments);
        
        // Store both _id and number to ensure proper matching
        const enrolledIds = new Set();
        userEnrollments.forEach(e => {
          console.log('Processing enrollment:', e);
          // Handle both populated (e.course is object) and non-populated (e.course is string ID)
          if (typeof e.course === 'string') {
            enrolledIds.add(e.course);
          } else if (e.course && typeof e.course === 'object') {
            if (e.course._id) enrolledIds.add(e.course._id);
            if (e.course.number) enrolledIds.add(e.course.number);
            if (e.course.id) enrolledIds.add(e.course.id);
          }
          // Also try direct enrollment fields
          if (e._id) enrolledIds.add(e._id);
          if (e.courseId) enrolledIds.add(e.courseId);
        });
        
        setEnrolledCourseIds(enrolledIds);
        console.log('Loaded enrollments - enrolled IDs:', Array.from(enrolledIds));
        console.log('Enrollments details:', userEnrollments.map(e => ({
          enrollmentId: e._id,
          courseId: typeof e.course === 'string' ? e.course : e.course?._id,
          courseNumber: typeof e.course === 'object' ? e.course?.number : null,
          courseName: typeof e.course === 'object' ? e.course?.name : null
        })));
      } catch (err) {
        console.error('Error fetching enrollments - full error:', err);
        // Silently handle 401 errors - user is not authenticated, which is expected
        if (err.response?.status === 401) {
          console.log('Got 401 - user not authenticated');
          setEnrollments([]);
          setEnrolledCourseIds(new Set());
          return;
        }
        console.error('Error fetching enrollments:', err);
        setError('Failed to load enrollments');
      }
    };
    fetchEnrollments();
  }, [currentUser, userLoading]);

  const handleAddCourse = async () => {
    if (newCourse.name && newCourse.number) {
      try {
        const createdCourse = await client.createCourse(newCourse);
        dispatch(addCourse(createdCourse));
        
        // Auto-enroll faculty when creating course
        if (currentUser && currentUser.role === 'FACULTY') {
          try {
            await client.enrollInCourse(currentUser._id, createdCourse._id || createdCourse.number, 'FACULTY');
            // Update enrolled courses set
            setEnrolledCourseIds(prev => {
              const newSet = new Set(prev);
              if (createdCourse._id) newSet.add(createdCourse._id);
              if (createdCourse.number) newSet.add(createdCourse.number);
              return newSet;
            });
            console.log('Faculty auto-enrolled in new course');
          } catch (enrollErr) {
            console.error('Error auto-enrolling faculty:', enrollErr);
          }
        }
        
        setNewCourse({ 
          name: '', 
          number: '', 
          startDate: '', 
          endDate: '', 
          department: '', 
          credits: '', 
          description: '' 
        });
        setShowAddDialog(false);
        setError('');
      } catch (err) {
        console.error('Error creating course:', err);
        setError('Failed to create course');
      }
    }
  };

  const handleEditCourse = async () => {
    if (editingCourse) {
      try {
        const updatedCourse = await client.updateCourse(editingCourse._id, editingCourse);
        dispatch(updateCourse(updatedCourse));
        setShowEditDialog(false);
        setEditingCourse(null);
        setError('');
      } catch (err) {
        console.error('Error updating course:', err);
        setError('Failed to update course');
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await client.deleteCourse(courseId);
        dispatch(deleteCourse(courseId));
        setError('');
      } catch (err) {
        console.error('Error deleting course:', err);
        setError('Failed to delete course');
      }
    }
  };

  const handleToggleEnrollment = async (courseId) => {
    if (!currentUser) {
      alert('Please sign in to enroll');
      return;
    }
    
    const course = courses.find(c => c._id === courseId || c.number === courseId);
    const isEnrolled = enrolledCourseIds.has(courseId) || 
                       enrolledCourseIds.has(course?._id) || 
                       enrolledCourseIds.has(course?.number);
    
    if (isEnrolled) {
      // Unenroll
      try {
        await client.unenrollFromCourse(currentUser._id, courseId);
        setEnrolledCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          if (course) {
            if (course._id) newSet.delete(course._id);
            if (course.number) newSet.delete(course.number);
          }
          return newSet;
        });
        alert('✓ Successfully unenrolled from course');
        // Refresh enrollments in background
        setTimeout(async () => {
          try {
            const userEnrollments = await client.getCurrentUserEnrollments();
            setEnrollments(userEnrollments);
            const enrolledIds = new Set();
            userEnrollments.forEach(e => {
              if (e.course._id) enrolledIds.add(e.course._id);
              if (e.course.number) enrolledIds.add(e.course.number);
            });
            setEnrolledCourseIds(enrolledIds);
          } catch (err) {
            console.error('Error refreshing enrollments:', err);
          }
        }, 100);
      } catch (err) {
        console.error('Error unenrolling:', err);
        const errorMsg = err.response?.data?.message || 'Failed to unenroll from course';
        alert('❌ ' + errorMsg);
      }
    } else {
      // Enroll
      try {
        await client.enrollInCourse(currentUser._id, courseId, 'STUDENT');
        setEnrolledCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.add(courseId);
          if (course) {
            if (course._id) newSet.add(course._id);
            if (course.number) newSet.add(course.number);
          }
          return newSet;
        });
        alert('✓ Successfully enrolled in course!');
        // Refresh enrollments in background
        setTimeout(async () => {
          try {
            const userEnrollments = await client.getCurrentUserEnrollments();
            setEnrollments(userEnrollments);
            const enrolledIds = new Set();
            userEnrollments.forEach(e => {
              if (typeof e.course === 'string') {
                enrolledIds.add(e.course);
              } else if (e.course && typeof e.course === 'object') {
                if (e.course._id) enrolledIds.add(e.course._id);
                if (e.course.number) enrolledIds.add(e.course.number);
                if (e.course.id) enrolledIds.add(e.course.id);
              }
            });
            setEnrolledCourseIds(enrolledIds);
          } catch (err) {
            console.error('Error refreshing enrollments:', err);
          }
        }, 100);
      } catch (err) {
        console.error('Error enrolling:', err);
        const errorMsg = err.response?.data?.message || 'Failed to enroll in course';
        alert('❌ ' + errorMsg);
      }
    }
  };

  const handleEnroll = async (courseId) => {
    if (!currentUser) {
      alert('Please sign in to enroll');
      return;
    }
    try {
      await client.enrollInCourse(currentUser._id, courseId, 'STUDENT');
      // Add both _id and number to enrolled set for immediate UI update
      const course = courses.find(c => c._id === courseId || c.number === courseId);
      setEnrolledCourseIds(prev => {
        const newSet = new Set(prev);
        newSet.add(courseId);
        if (course) {
          if (course._id) newSet.add(course._id);
          if (course.number) newSet.add(course.number);
        }
        return newSet;
      });
      alert('✓ Successfully enrolled in course!');
      // Refresh enrollments in background
      setTimeout(async () => {
        try {
          const userEnrollments = await client.getCurrentUserEnrollments();
          setEnrollments(userEnrollments);
          const enrolledIds = new Set();
          userEnrollments.forEach(e => {
            if (e.course._id) enrolledIds.add(e.course._id);
            if (e.course.number) enrolledIds.add(e.course.number);
          });
          setEnrolledCourseIds(enrolledIds);
        } catch (err) {
          console.error('Error refreshing enrollments:', err);
        }
      }, 100);
    } catch (err) {
      console.error('Error enrolling:', err);
      const errorMsg = err.response?.data?.message || 'Failed to enroll in course';
      alert('❌ ' + errorMsg);
    }
  };

  const handleUnenroll = async (courseId) => {
    if (!currentUser) return;
    if (confirm('Are you sure you want to unenroll from this course?')) {
      try {
        await client.unenrollFromCourse(currentUser._id, courseId);
        // Remove both _id and number from enrolled set
        const course = courses.find(c => c._id === courseId || c.number === courseId);
        setEnrolledCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          if (course) {
            if (course._id) newSet.delete(course._id);
            if (course.number) newSet.delete(course.number);
          }
          return newSet;
        });
        alert('✓ Successfully unenrolled from course');
        // Refresh enrollments in background
        setTimeout(async () => {
          try {
            const userEnrollments = await client.getCurrentUserEnrollments();
            setEnrollments(userEnrollments);
            const enrolledIds = new Set();
            userEnrollments.forEach(e => {
              if (typeof e.course === 'string') {
                enrolledIds.add(e.course);
              } else if (e.course && typeof e.course === 'object') {
                if (e.course._id) enrolledIds.add(e.course._id);
                if (e.course.number) enrolledIds.add(e.course.number);
                if (e.course.id) enrolledIds.add(e.course.id);
              }
            });
            setEnrolledCourseIds(enrolledIds);
          } catch (err) {
            console.error('Error refreshing enrollments:', err);
          }
        }, 100);
      } catch (err) {
        console.error('Error unenrolling:', err);
        const errorMsg = err.response?.data?.message || 'Failed to unenroll from course';
        alert('❌ ' + errorMsg);
      }
    }
  };

  const openEditDialog = (course) => {
    setEditingCourse({ ...course });
    setShowEditDialog(true);
  };

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
                  {link.label === 'Users' && <FaUsers className="nav-icon" />}
                  {link.label === 'Labs' && <FaFlask className="nav-icon" />}
                  {link.label}
                </a>
              </div>
            );
          })}
        </div>
      </nav>
      <main className="main-content">
        <div className="dashboard-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              {currentUser && (
                <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
                  <button
                    onClick={() => setShowAllCourses(true)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: showAllCourses ? '#007bff' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: showAllCourses ? 'bold' : 'normal'
                    }}
                  >
                    All Courses
                  </button>
                  <button
                    onClick={() => setShowAllCourses(false)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: !showAllCourses ? '#007bff' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: !showAllCourses ? 'bold' : 'normal'
                    }}
                  >
                    My Courses
                  </button>
                </div>
              )}
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
                <FaPlus /> Add Course
              </button>
            </div>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <h2>{showAllCourses ? 'Published Courses' : 'My Enrolled Courses'}</h2>
          <div className="courses-grid">
            {courses && Array.isArray(courses) && courses
              .filter(course => {
                if (showAllCourses) return true;
                // Show only enrolled courses
                const isEnrolled = enrolledCourseIds.has(course._id) || 
                                   enrolledCourseIds.has(course.number) ||
                                   enrolledCourseIds.has(course.id);
                return isEnrolled;
              })
              .map((course) => {
              let imgSrc = "/1_V-Jp13LvtVc2IiY2fp4qYw.jpg";
              let desc = course.name;
              if (course.number === '5678') imgSrc = "/PDP_textbook.jpg";

              // Check if this course is currently active (user is viewing it)
              const isActive = pathname.includes(`/courses/${course.number}`);
              const courseKey = course._id || course.id || course.number;
              
              // More comprehensive enrollment check
              const isEnrolled = enrolledCourseIds.has(course._id) || 
                                 enrolledCourseIds.has(course.number) ||
                                 enrolledCourseIds.has(course.id) ||
                                 enrolledCourseIds.has(courseKey);
              
              // Debug logging for enrollment status
              console.log(`Course ${course.number} enrollment check:`, {
                courseId: course._id,
                courseNumber: course.number,
                courseKey,
                enrolledIdsArray: Array.from(enrolledCourseIds),
                isEnrolled,
                enrollmentCount: enrollments.length
              });

              return (
                <div className={`course-card ${isActive ? 'active' : ''}`} key={courseKey} style={{ position: 'relative' }}>
                  <a href={`/kambaz/courses/${course.number}/home`}>
                    <Image src={imgSrc} alt={`Course ${course.number}`} width={300} height={150} />
                    <div className="course-info">
                      <h3>{course.number}</h3>
                      <p>{desc}</p>
                      {isEnrolled && (
                        <span style={{ 
                          color: '#28a745', 
                          fontSize: '12px', 
                          fontWeight: 'bold',
                          display: 'block',
                          marginTop: '5px'
                        }}>
                          ✓ Enrolled
                        </span>
                      )}
                    </div>
                  </a>
                  <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    display: 'flex', 
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px',
                    borderRadius: '4px'
                  }}>
                    {currentUser && showAllCourses && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleEnrollment(course._id);
                        }}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: isEnrolled ? '#ffc107' : '#28a745',
                          color: isEnrolled ? 'black' : 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                        title={isEnrolled ? 'Unenroll from Course' : 'Enroll in Course'}
                      >
                        {isEnrolled ? 'Unenroll' : 'Enroll'}
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openEditDialog(course);
                      }}
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
                      title="Edit Course"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCourse(course._id);
                      }}
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
                      title="Delete Course"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Course Dialog */}
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
                <h2>Add New Course</h2>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Number *</label>
                  <input
                    type="text"
                    value={newCourse.number}
                    onChange={(e) => setNewCourse({ ...newCourse, number: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="e.g., CS5610"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Name *</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department</label>
                  <input
                    type="text"
                    value={newCourse.department}
                    onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Credits</label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="e.g., 4"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date</label>
                  <input
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date</label>
                  <input
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
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
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px',
                      minHeight: '80px'
                    }}
                    placeholder="Course description..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setShowAddDialog(false);
                      setNewCourse({ 
                        name: '', 
                        number: '', 
                        startDate: '', 
                        endDate: '', 
                        department: '', 
                        credits: '', 
                        description: '' 
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
                    onClick={handleAddCourse}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Course Dialog */}
          {showEditDialog && editingCourse && (
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
                <h2>Edit Course</h2>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Number *</label>
                  <input
                    type="text"
                    value={editingCourse.number}
                    onChange={(e) => setEditingCourse({ ...editingCourse, number: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Name *</label>
                  <input
                    type="text"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department</label>
                  <input
                    type="text"
                    value={editingCourse.department || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, department: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Credits</label>
                  <input
                    type="number"
                    value={editingCourse.credits || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, credits: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date</label>
                  <input
                    type="date"
                    value={editingCourse.startDate ? new Date(editingCourse.startDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, startDate: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date</label>
                  <input
                    type="date"
                    value={editingCourse.endDate ? new Date(editingCourse.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, endDate: e.target.value })}
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
                    value={editingCourse.description || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      fontSize: '14px',
                      minHeight: '80px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Instructor</label>
                  <input
                    type="text"
                    value={editingCourse.instructor}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
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
                      setEditingCourse(null);
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
                    onClick={handleEditCourse}
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
        </div>
      </main>
    </div>
  );
}              