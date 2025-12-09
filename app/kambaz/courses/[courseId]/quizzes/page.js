'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEllipsisV, FaEdit, FaTrash, FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as client from '../../../client';
import '../../styles.css';

export default function QuizzesPage({ params }) {
  const router = useRouter();
  const { courseId } = use(params);
  const currentUser = useSelector((state) => state.users.currentUser);
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchCourseAndQuizzes();
  }, [courseId]);

  const fetchCourseAndQuizzes = async () => {
    try {
      setLoading(true);
      const [courseData, quizzesData] = await Promise.all([
        client.getCourse(courseId),
        client.getCourseQuizzes(courseId)
      ]);
      setCourse(courseData);
      // Sort quizzes by available date (most recent first)
      const sortedData = quizzesData.sort((a, b) => {
        const dateA = a.availableDate ? new Date(a.availableDate) : new Date(0);
        const dateB = b.availableDate ? new Date(b.availableDate) : new Date(0);
        return dateB - dateA;
      });
      setQuizzes(sortedData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load course or quizzes');
    } finally {
      setLoading(false);
    }
  };



  const handleAddQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(courseId, {
        title: 'Unnamed Quiz',
        course: courseId
      });
      router.push(`/kambaz/courses/${courseId}/quizzes/${newQuiz._id}/edit`);
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Failed to create quiz');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    
    try {
      await client.deleteQuiz(quizId);
      setQuizzes(quizzes.filter(q => q._id !== quizId));
      setOpenMenuId(null);
    } catch (err) {
      console.error('Error deleting quiz:', err);
      alert('Failed to delete quiz');
    }
  };

  const handleTogglePublish = async (quiz) => {
    try {
      const updated = await client.publishQuiz(quiz._id, !quiz.published);
      setQuizzes(quizzes.map(q => q._id === quiz._id ? updated : q));
      setOpenMenuId(null);
    } catch (err) {
      console.error('Error publishing quiz:', err);
      alert('Failed to update quiz');
    }
  };

  const getAvailabilityStatus = (quiz) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return 'Closed';
    } else if (available && now < available) {
      return `Not available until ${new Date(available).toLocaleDateString()}`;
    } else if (available && until && now >= available && now <= until) {
      return 'Available';
    }
    return 'Available';
  };

  const isFaculty = currentUser?.role === 'FACULTY' || currentUser?.role === 'ADMIN';

  // Filter quizzes for students (only show published)
  const displayedQuizzes = isFaculty ? quizzes : quizzes.filter(q => q.published);

  if (loading) {
    return <div className="kambaz-container">Loading quizzes...</div>;
  }

  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" alt="NEU" style={{width: '20px', height: '20px'}} />
              NEU
            </a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/account"><FaUser className="nav-icon" />Account</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard"><FaTachometerAlt className="nav-icon" />Dashboard</a>
          </div>
          <div className="nav-item active">
            <a href="/kambaz/courses"><FaBook className="nav-icon" />Courses</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar"><FaCalendarAlt className="nav-icon" />Calendar</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox"><FaInbox className="nav-icon" />Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs"><FaFlask className="nav-icon" />Labs</a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {course && (
          <div className="course-header">
            <h1>{course.number} - {course.name}</h1>
          </div>
        )}
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item"><a href={`/kambaz/courses/${courseId}/home`}>Home</a></div>
            <div className="course-nav-item"><a href={`/kambaz/courses/${courseId}/modules`}>Modules</a></div>
            <div className="course-nav-item"><a href={`/kambaz/courses/${courseId}/assignments`}>Assignments</a></div>
            <div className="course-nav-item active"><a href={`/kambaz/courses/${courseId}/quizzes`}>Quizzes</a></div>
            <div className="course-nav-item"><a href={`/kambaz/courses/${courseId}/people`}>People</a></div>
            <div className="course-nav-item"><a href="#">Grades</a></div>
          </div>

          <div className="course-main-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1>Quizzes</h1>
              {isFaculty && (
                <button 
                  onClick={handleAddQuiz}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}
                >
                  <FaPlus /> Quiz
                </button>
              )}
            </div>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            {displayedQuizzes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {isFaculty ? (
                  <>
                    <p>No quizzes yet.</p>
                    <p>Click the "+ Quiz" button to create your first quiz.</p>
                  </>
                ) : (
                  <p>No quizzes available yet.</p>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {displayedQuizzes.map(quiz => (
                  <div 
                    key={quiz._id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '20px',
                      backgroundColor: 'white',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <span 
                            style={{ 
                              fontSize: '20px', 
                              cursor: isFaculty ? 'pointer' : 'default',
                              title: quiz.published ? 'Published' : 'Unpublished'
                            }}
                            onClick={() => isFaculty && handleTogglePublish(quiz)}
                          >
                            {quiz.published ? '✅' : '🚫'}
                          </span>
                          <h3 
                            style={{ 
                              margin: 0, 
                              cursor: 'pointer',
                              color: '#0066cc'
                            }}
                            onClick={() => {
                              if (isFaculty) {
                                router.push(`/kambaz/courses/${courseId}/quizzes/${quiz._id}`);
                              } else {
                                router.push(`/kambaz/courses/${courseId}/quizzes/${quiz._id}/take`);
                              }
                            }}
                          >
                            {quiz.title}
                          </h3>
                        </div>
                        
                        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                          <div><strong>{getAvailabilityStatus(quiz)}</strong></div>
                          {quiz.dueDate && <div>Due: {new Date(quiz.dueDate).toLocaleDateString()}</div>}
                          <div>{quiz.points} pts</div>
                          <div>Questions: {quiz.questionCount || 0}</div>
                        </div>
                      </div>

                      {isFaculty && (
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === quiz._id ? null : quiz._id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '18px',
                              padding: '5px 10px'
                            }}
                          >
                            <FaEllipsisV />
                          </button>
                          
                          {openMenuId === quiz._id && (
                            <div style={{
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              backgroundColor: 'white',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              zIndex: 100,
                              minWidth: '150px'
                            }}>
                              <div
                                onClick={() => {
                                  router.push(`/kambaz/courses/${courseId}/quizzes/${quiz._id}/edit`);
                                  setOpenMenuId(null);
                                }}
                                style={{
                                  padding: '10px 15px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #eee',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                              >
                                <FaEdit /> Edit
                              </div>
                              <div
                                onClick={() => handleDeleteQuiz(quiz._id)}
                                style={{
                                  padding: '10px 15px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #eee',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  color: '#dc3545'
                                }}
                              >
                                <FaTrash /> Delete
                              </div>
                              <div
                                onClick={() => handleTogglePublish(quiz)}
                                style={{
                                  padding: '10px 15px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                              >
                                {quiz.published ? '🚫 Unpublish' : '✅ Publish'}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
