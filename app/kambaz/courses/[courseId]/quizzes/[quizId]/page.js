'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as client from '../../../../client';
import '../../../styles.css';

export default function QuizDetailsPage({ params }) {
  const router = useRouter();
  const { courseId, quizId } = use(params);
  const currentUser = useSelector((state) => state.users.currentUser);
  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const [courseData, quizData, questionsData, attemptsData] = await Promise.all([
        client.getCourse(courseId),
        client.getQuiz(quizId),
        client.getQuizQuestions(quizId),
        client.getQuizAttempts(quizId).catch(() => [])
      ]);
      setCourse(courseData);
      setQuiz(quizData);
      setQuestions(questionsData);
      setAttempts(attemptsData);
    } catch (err) {
      console.error('Error fetching quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFaculty = currentUser?.role === 'FACULTY' || currentUser?.role === 'ADMIN';

  const getAvailabilityStatus = () => {
    if (!quiz) return '';
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return 'Closed';
    } else if (available && now < available) {
      return `Not available until ${new Date(available).toLocaleDateString()}`;
    }
    return 'Available';
  };

  const getQuizType = (type) => {
    const types = {
      'GRADED_QUIZ': 'Graded Quiz',
      'PRACTICE_QUIZ': 'Practice Quiz',
      'GRADED_SURVEY': 'Graded Survey',
      'UNGRADED_SURVEY': 'Ungraded Survey'
    };
    return types[type] || type;
  };

  if (loading) {
    return <div className="kambaz-container">Loading...</div>;
  }

  if (!quiz) {
    return <div className="kambaz-container">Quiz not found</div>;
  }

  const lastAttempt = attempts.length > 0 ? attempts[0] : null;
  const canTakeQuiz = !isFaculty && quiz.published && 
    (quiz.multipleAttempts ? attempts.length < quiz.howManyAttempts : attempts.length === 0);

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
            <div style={{ maxWidth: '800px' }}>
              <h1>{quiz.title}</h1>
              
              <div style={{ 
                backgroundColor: 'white', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                padding: '20px',
                marginBottom: '20px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold', width: '200px' }}>Quiz Type</td>
                      <td style={{ padding: '12px 0' }}>{getQuizType(quiz.quizType)}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Points</td>
                      <td style={{ padding: '12px 0' }}>{quiz.points}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Assignment Group</td>
                      <td style={{ padding: '12px 0' }}>{quiz.assignmentGroup}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Shuffle Answers</td>
                      <td style={{ padding: '12px 0' }}>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Time Limit</td>
                      <td style={{ padding: '12px 0' }}>{quiz.timeLimit} Minutes</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Multiple Attempts</td>
                      <td style={{ padding: '12px 0' }}>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
                    </tr>
                    {quiz.multipleAttempts && (
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>How Many Attempts</td>
                        <td style={{ padding: '12px 0' }}>{quiz.howManyAttempts}</td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Show Correct Answers</td>
                      <td style={{ padding: '12px 0' }}>{quiz.showCorrectAnswers}</td>
                    </tr>
                    {quiz.accessCode && (
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Access Code</td>
                        <td style={{ padding: '12px 0' }}>{quiz.accessCode}</td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>One Question at a Time</td>
                      <td style={{ padding: '12px 0' }}>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Webcam Required</td>
                      <td style={{ padding: '12px 0' }}>{quiz.webcamRequired ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Lock Questions After Answering</td>
                      <td style={{ padding: '12px 0' }}>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</td>
                    </tr>
                    {quiz.dueDate && (
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Due Date</td>
                        <td style={{ padding: '12px 0' }}>{new Date(quiz.dueDate).toLocaleString()}</td>
                      </tr>
                    )}
                    {quiz.availableDate && (
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Available Date</td>
                        <td style={{ padding: '12px 0' }}>{new Date(quiz.availableDate).toLocaleString()}</td>
                      </tr>
                    )}
                    {quiz.untilDate && (
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Until Date</td>
                        <td style={{ padding: '12px 0' }}>{new Date(quiz.untilDate).toLocaleString()}</td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Number of Questions</td>
                      <td style={{ padding: '12px 0' }}>{questions.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {!isFaculty && lastAttempt && (
                <div style={{ 
                  backgroundColor: '#e7f3ff', 
                  border: '1px solid #0066cc', 
                  borderRadius: '4px', 
                  padding: '15px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>Last Attempt Score</h3>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    {lastAttempt.score} / {lastAttempt.totalPoints} points
                  </p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                    Submitted: {new Date(lastAttempt.submittedAt).toLocaleString()}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {isFaculty && (
                  <>
                    <button
                      onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/preview`)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/edit`)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </>
                )}
                
                {!isFaculty && canTakeQuiz && (
                  <button
                    onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/take`)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Take Quiz
                  </button>
                )}
                
                {!isFaculty && !canTakeQuiz && quiz.published && (
                  <div style={{ color: '#666', fontStyle: 'italic' }}>
                    {attempts.length >= quiz.howManyAttempts 
                      ? 'You have used all available attempts' 
                      : 'Quiz not available'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
