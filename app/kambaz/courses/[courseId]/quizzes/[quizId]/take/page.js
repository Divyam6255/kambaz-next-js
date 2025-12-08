'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as client from '../../../../../client';
import '../../../../styles.css';

export default function QuizTakePage({ params }) {
  const router = useRouter();
  const { courseId, quizId } = use(params);
  const currentUser = useSelector((state) => state.users.currentUser);
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const [quizData, questionsData] = await Promise.all([
        client.getQuiz(quizId),
        client.getQuizQuestions(quizId)
      ]);
      setQuiz(quizData);
      setQuestions(questionsData);
      
      // Check if user has previous attempts
      const attempts = await client.getQuizAttempts(quizId);
      if (attempts && attempts.length > 0) {
        const lastAttempt = attempts[0];
        if (lastAttempt.completed) {
          // Show last attempt results
          setSubmitted(true);
          setResult(lastAttempt);
          
          // Pre-fill answers from last attempt
          const answersMap = {};
          lastAttempt.answers.forEach(ans => {
            answersMap[ans.question] = ans;
          });
          setAnswers(answersMap);
        }
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      alert('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const attempt = await client.startQuizAttempt(quizId);
      setCurrentAttempt(attempt);
    } catch (err) {
      console.error('Error starting quiz:', err);
      if (err.response?.status === 403) {
        alert(err.response.data.message || 'You have reached the maximum number of attempts');
      } else {
        alert('Failed to start quiz');
      }
    }
  };

  const handleAnswerChange = (questionId, answerData) => {
    setAnswers({
      ...answers,
      [questionId]: answerData
    });
  };

  const handleSubmit = async () => {
    if (!currentAttempt) {
      // For students, must start attempt first
      if (!confirm('Submit quiz? You cannot change your answers after submission.')) return;
      
      try {
        // Start attempt and immediately submit
        const attempt = await client.startQuizAttempt(quizId);
        const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
          question: questionId,
          ...answer
        }));
        
        const submittedAttempt = await client.submitQuizAttempt(attempt._id, answersArray);
        setSubmitted(true);
        setResult(submittedAttempt);
      } catch (err) {
        console.error('Error submitting quiz:', err);
        alert('Failed to submit quiz');
      }
    } else {
      // Already have an attempt
      if (!confirm('Submit quiz? You cannot change your answers after submission.')) return;
      
      try {
        const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
          question: questionId,
          ...answer
        }));
        
        const submittedAttempt = await client.submitQuizAttempt(currentAttempt._id, answersArray);
        setSubmitted(true);
        setResult(submittedAttempt);
      } catch (err) {
        console.error('Error submitting quiz:', err);
        alert('Failed to submit quiz');
      }
    }
  };

  if (loading) {
    return <div className="kambaz-container">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="kambaz-container">Quiz not found</div>;
  }

  const isFaculty = currentUser?.role === 'FACULTY' || currentUser?.role === 'ADMIN';

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
            <div style={{ maxWidth: '900px' }}>
              <h1>{quiz.title}</h1>
              
              {submitted && result && (
                <div style={{
                  backgroundColor: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '4px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h2 style={{ margin: '0 0 15px 0', color: '#155724' }}>Quiz Submitted!</h2>
                  <div style={{ fontSize: '18px' }}>
                    <strong>Score: {result.score} / {result.totalPoints} points</strong>
                  </div>
                  <div style={{ fontSize: '14px', marginTop: '10px', color: '#155724' }}>
                    Submitted: {new Date(result.submittedAt).toLocaleString()}
                  </div>
                </div>
              )}

              {isFaculty && (
                <div style={{ 
                  backgroundColor: '#fff3cd', 
                  border: '1px solid #ffeaa7',
                  borderRadius: '4px',
                  padding: '15px',
                  marginBottom: '20px'
                }}>
                  <strong>Preview Mode:</strong> You are viewing this quiz as a student would see it. Your answers will not be saved.
                  {' '}
                  <a 
                    href={`/kambaz/courses/${courseId}/quizzes/${quizId}/edit`}
                    style={{ color: '#0066cc', textDecoration: 'underline' }}
                  >
                    Edit Quiz
                  </a>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <p><strong>Points:</strong> {quiz.points}</p>
                <p><strong>Questions:</strong> {questions.length}</p>
                {quiz.timeLimit && <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>}
              </div>

              {questions.length === 0 ? (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '40px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  <p>This quiz has no questions yet.</p>
                  {isFaculty && (
                    <button
                      onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/edit`)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px'
                      }}
                    >
                      Add Questions
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Question Navigation - Show all questions as clickable buttons */}
                  {quiz.oneQuestionAtATime && questions.length > 1 && (
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ width: '100%', marginBottom: '10px', fontWeight: 'bold' }}>Questions:</div>
                      {questions.map((q, idx) => {
                        const hasAnswer = answers[q._id];
                        return (
                          <button
                            key={q._id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            style={{
                              padding: '8px 12px',
                              backgroundColor: currentQuestionIndex === idx ? '#007bff' : (hasAnswer ? '#28a745' : '#fff'),
                              color: currentQuestionIndex === idx ? '#fff' : (hasAnswer ? '#fff' : '#000'),
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: currentQuestionIndex === idx ? 'bold' : 'normal'
                            }}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Display questions - one at a time or all */}
                  {(quiz.oneQuestionAtATime ? [questions[currentQuestionIndex]] : questions).map((question, displayIndex) => {
                    const actualIndex = quiz.oneQuestionAtATime ? currentQuestionIndex : displayIndex;
                    const userAnswer = answers[question._id];
                    const isCorrect = submitted && result ? 
                      result.answers.find(a => a.question.toString() === question._id)?.isCorrect : null;

                    return (
                      <div 
                        key={question._id}
                        style={{
                          border: submitted ? (isCorrect ? '2px solid #28a745' : '2px solid #dc3545') : '1px solid #ddd',
                          borderRadius: '4px',
                          padding: '20px',
                          marginBottom: '20px',
                          backgroundColor: 'white'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                          <h3 style={{ margin: 0 }}>
                            Question {actualIndex + 1} ({question.points} pts)
                          </h3>
                          {submitted && (
                            <div style={{ fontSize: '24px' }}>
                              {isCorrect ? (
                                <FaCheckCircle style={{ color: '#28a745' }} />
                              ) : (
                                <FaTimesCircle style={{ color: '#dc3545' }} />
                              )}
                            </div>
                          )}
                        </div>

                        <p style={{ fontSize: '16px', marginBottom: '15px' }}>{question.question}</p>

                        {/* Multiple Choice */}
                        {question.type === 'MULTIPLE_CHOICE' && (
                          <div>
                            {question.choices.map((choice, choiceIndex) => {
                              const isSelected = userAnswer?.selectedChoice === choiceIndex;
                              const showCorrect = submitted && choice.isCorrect;
                              
                              return (
                                <div 
                                  key={choiceIndex}
                                  style={{
                                    padding: '10px',
                                    marginBottom: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: showCorrect ? '#d4edda' : (isSelected ? '#e7f3ff' : 'white'),
                                    cursor: submitted ? 'default' : 'pointer'
                                  }}
                                  onClick={() => !submitted && handleAnswerChange(question._id, { selectedChoice: choiceIndex })}
                                >
                                  <label style={{ display: 'flex', alignItems: 'center', cursor: submitted ? 'default' : 'pointer' }}>
                                    <input
                                      type="radio"
                                      name={`question-${question._id}`}
                                      checked={isSelected}
                                      onChange={() => !submitted && handleAnswerChange(question._id, { selectedChoice: choiceIndex })}
                                      disabled={submitted}
                                      style={{ marginRight: '10px' }}
                                    />
                                    <span>{choice.text}</span>
                                    {showCorrect && <span style={{ marginLeft: '10px', color: '#28a745', fontWeight: 'bold' }}>✓ Correct</span>}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* True/False */}
                        {question.type === 'TRUE_FALSE' && (
                          <div>
                            {[true, false].map((value) => {
                              const isSelected = userAnswer?.selectedAnswer === value;
                              const showCorrect = submitted && question.correctAnswer === value;
                              
                              return (
                                <div 
                                  key={value.toString()}
                                  style={{
                                    padding: '10px',
                                    marginBottom: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: showCorrect ? '#d4edda' : (isSelected ? '#e7f3ff' : 'white'),
                                    cursor: submitted ? 'default' : 'pointer'
                                  }}
                                  onClick={() => !submitted && handleAnswerChange(question._id, { selectedAnswer: value })}
                                >
                                  <label style={{ display: 'flex', alignItems: 'center', cursor: submitted ? 'default' : 'pointer' }}>
                                    <input
                                      type="radio"
                                      name={`question-${question._id}`}
                                      checked={isSelected}
                                      onChange={() => !submitted && handleAnswerChange(question._id, { selectedAnswer: value })}
                                      disabled={submitted}
                                      style={{ marginRight: '10px' }}
                                    />
                                    <span>{value ? 'True' : 'False'}</span>
                                    {showCorrect && <span style={{ marginLeft: '10px', color: '#28a745', fontWeight: 'bold' }}>✓ Correct</span>}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Fill in Blank */}
                        {question.type === 'FILL_IN_BLANK' && (
                          <div>
                            <input
                              type="text"
                              value={userAnswer?.textAnswer || ''}
                              onChange={(e) => !submitted && handleAnswerChange(question._id, { textAnswer: e.target.value })}
                              disabled={submitted}
                              placeholder="Type your answer here"
                              style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                            {submitted && (
                              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                                <strong>Possible correct answers:</strong>
                                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                  {question.possibleAnswers.map((ans, idx) => (
                                    <li key={idx}>{ans.text} {ans.caseSensitive && '(case sensitive)'}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Navigation buttons for one-question-at-a-time */}
                        {quiz.oneQuestionAtATime && !submitted && (
                          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                            <button
                              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                              disabled={currentQuestionIndex === 0}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: currentQuestionIndex === 0 ? '#ccc' : '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              ← Previous
                            </button>
                            <button
                              onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                              disabled={currentQuestionIndex === questions.length - 1}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: currentQuestionIndex === questions.length - 1 ? '#ccc' : '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: currentQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              Next →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!submitted && questions.length > 0 && (
                    <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                      <button
                        onClick={handleSubmit}
                        style={{
                          padding: '12px 30px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        Submit Quiz
                      </button>
                      <button
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes`)}
                        style={{
                          padding: '12px 30px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {submitted && (
                    <div style={{ marginTop: '30px' }}>
                      <button
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes`)}
                        style={{
                          padding: '12px 30px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        Back to Quizzes
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
