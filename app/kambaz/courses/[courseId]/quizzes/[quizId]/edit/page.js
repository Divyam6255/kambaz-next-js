'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as client from '../../../../../client';
import '../../../../styles.css';

export default function QuizEditorPage({ params }) {
  const router = useRouter();
  const { courseId, quizId } = use(params);
  const currentUser = useSelector((state) => state.users.currentUser);
  
  const [activeTab, setActiveTab] = useState('details');
  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const [courseData, quizData, questionsData] = await Promise.all([
        client.getCourse(courseId),
        client.getQuiz(quizId),
        client.getQuizQuestions(quizId)
      ]);
      setCourse(courseData);
      setQuiz(quizData);
      setQuestions(questionsData);
    } catch (err) {
      console.error('Error fetching quiz:', err);
      alert('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuiz = async () => {
    try {
      await client.updateQuiz(quizId, quiz);
      alert('Quiz saved successfully!');
      router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}`);
    } catch (err) {
      console.error('Error saving quiz:', err);
      alert('Failed to save quiz');
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      await client.updateQuiz(quizId, { ...quiz, published: true });
      alert('Quiz saved and published!');
      router.push(`/kambaz/courses/${courseId}/quizzes`);
    } catch (err) {
      console.error('Error saving quiz:', err);
      alert('Failed to save and publish quiz');
    }
  };

  const handleCancel = () => {
    router.push(`/kambaz/courses/${courseId}/quizzes`);
  };

  const handleAddQuestion = () => {
    setEditingQuestion({
      _id: null,
      title: 'New Question',
      type: 'MULTIPLE_CHOICE',
      points: 1,
      question: 'Enter your question text here',
      choices: [
        { text: 'Option 1', isCorrect: true },
        { text: 'Option 2', isCorrect: false }
      ],
      correctAnswer: true,
      possibleAnswers: [{ text: '', caseSensitive: false }]
    });
  };

  const handleSaveQuestion = async () => {
    try {
      if (editingQuestion._id) {
        // Update existing question
        const updated = await client.updateQuestion(editingQuestion._id, editingQuestion);
        setQuestions(questions.map(q => q._id === updated._id ? updated : q));
      } else {
        // Create new question
        const created = await client.createQuestion(quizId, editingQuestion);
        setQuestions([...questions, created]);
      }
      setEditingQuestion(null);
      
      // Refresh quiz to get updated points
      const updatedQuiz = await client.getQuiz(quizId);
      setQuiz(updatedQuiz);
    } catch (err) {
      console.error('Error saving question:', err);
      alert('Failed to save question');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      await client.deleteQuestion(questionId);
      setQuestions(questions.filter(q => q._id !== questionId));
      
      // Refresh quiz to get updated points
      const updatedQuiz = await client.getQuiz(quizId);
      setQuiz(updatedQuiz);
    } catch (err) {
      console.error('Error deleting question:', err);
      alert('Failed to delete question');
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion({ ...question });
  };

  const addChoice = () => {
    setEditingQuestion({
      ...editingQuestion,
      choices: [...editingQuestion.choices, { text: '', isCorrect: false }]
    });
  };

  const removeChoice = (index) => {
    const newChoices = editingQuestion.choices.filter((_, i) => i !== index);
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const updateChoice = (index, field, value) => {
    const newChoices = [...editingQuestion.choices];
    if (field === 'isCorrect' && value) {
      // Only one choice can be correct for multiple choice
      newChoices.forEach((c, i) => c.isCorrect = i === index);
    } else {
      newChoices[index][field] = value;
    }
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const addPossibleAnswer = () => {
    setEditingQuestion({
      ...editingQuestion,
      possibleAnswers: [...editingQuestion.possibleAnswers, { text: '', caseSensitive: false }]
    });
  };

  const removePossibleAnswer = (index) => {
    const newAnswers = editingQuestion.possibleAnswers.filter((_, i) => i !== index);
    setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
  };

  const updatePossibleAnswer = (index, field, value) => {
    const newAnswers = [...editingQuestion.possibleAnswers];
    newAnswers[index][field] = value;
    setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
  };

  if (loading) {
    return <div className="kambaz-container">Loading...</div>;
  }

  if (!quiz) {
    return <div className="kambaz-container">Quiz not found</div>;
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
            <h1>Edit Quiz</h1>
            
            {/* Tabs */}
            <div style={{ borderBottom: '2px solid #ddd', marginBottom: '20px' }}>
              <button
                onClick={() => setActiveTab('details')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'details' ? '3px solid #dc3545' : '3px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'details' ? 'bold' : 'normal',
                  fontSize: '16px'
                }}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'questions' ? '3px solid #dc3545' : '3px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'questions' ? 'bold' : 'normal',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
              >
                Questions
              </button>
            </div>

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div style={{ maxWidth: '800px' }}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                  <input
                    type="text"
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                  <textarea
                    value={quiz.description}
                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
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

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quiz Type</label>
                  <select
                    value={quiz.quizType}
                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="GRADED_QUIZ">Graded Quiz</option>
                    <option value="PRACTICE_QUIZ">Practice Quiz</option>
                    <option value="GRADED_SURVEY">Graded Survey</option>
                    <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points</label>
                  <input
                    type="number"
                    value={quiz.points}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: '#f5f5f5'
                    }}
                    title="Points are calculated from questions"
                  />
                  <small style={{ color: '#666' }}>Points are automatically calculated from questions</small>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment Group</label>
                  <select
                    value={quiz.assignmentGroup}
                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="QUIZZES">Quizzes</option>
                    <option value="EXAMS">Exams</option>
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="PROJECT">Project</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={quiz.shuffleAnswers}
                      onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                    />
                    <span style={{ fontWeight: 'bold' }}>Shuffle Answers</span>
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Time Limit (Minutes)</label>
                  <input
                    type="number"
                    value={quiz.timeLimit}
                    onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={quiz.multipleAttempts}
                      onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                    />
                    <span style={{ fontWeight: 'bold' }}>Multiple Attempts</span>
                  </label>
                </div>

                {quiz.multipleAttempts && (
                  <div className="form-group" style={{ marginBottom: '20px', marginLeft: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>How Many Attempts</label>
                    <input
                      type="number"
                      value={quiz.howManyAttempts}
                      onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })}
                      min="1"
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Show Correct Answers</label>
                  <input
                    type="text"
                    value={quiz.showCorrectAnswers}
                    onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
                    placeholder="e.g., Immediately, After due date"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Access Code (optional)</label>
                  <input
                    type="text"
                    value={quiz.accessCode}
                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={quiz.oneQuestionAtATime}
                      onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                    />
                    <span style={{ fontWeight: 'bold' }}>One Question at a Time</span>
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={quiz.webcamRequired}
                      onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                    />
                    <span style={{ fontWeight: 'bold' }}>Webcam Required</span>
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={quiz.lockQuestionsAfterAnswering}
                      onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                    />
                    <span style={{ fontWeight: 'bold' }}>Lock Questions After Answering</span>
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date</label>
                  <input
                    type="datetime-local"
                    value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Available Date</label>
                  <input
                    type="datetime-local"
                    value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Until Date</label>
                  <input
                    type="datetime-local"
                    value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                  <button
                    onClick={handleSaveQuiz}
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
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={handleSaveAndPublish}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Save & Publish
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div style={{ maxWidth: '900px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2>Questions (Total Points: {quiz.points})</h2>
                  <button
                    onClick={handleAddQuestion}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    + New Question
                  </button>
                </div>

                {questions.length === 0 && !editingQuestion && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <p>No questions yet.</p>
                    <p>Click "+ New Question" to add your first question.</p>
                  </div>
                )}

                {/* Question List */}
                {questions.map((q, index) => (
                  <div 
                    key={q._id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '15px',
                      marginBottom: '15px',
                      backgroundColor: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>
                          Question {index + 1}: {q.title} ({q.points} pts)
                        </h4>
                        <div style={{ color: '#666', fontSize: '14px' }}>
                          <div><strong>Type:</strong> {q.type.replace('_', ' ')}</div>
                          <div style={{ marginTop: '5px' }}><strong>Question:</strong> {q.question}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          onClick={() => handleEditQuestion(q)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q._id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Question Editor */}
                {editingQuestion && (
                  <div style={{
                    border: '2px solid #007bff',
                    borderRadius: '4px',
                    padding: '20px',
                    marginBottom: '20px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <h3>{editingQuestion._id ? 'Edit Question' : 'New Question'}</h3>
                    
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Question Type</label>
                      <select
                        value={editingQuestion.type}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      >
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="TRUE_FALSE">True/False</option>
                        <option value="FILL_IN_BLANK">Fill in the Blank</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                      <input
                        type="text"
                        value={editingQuestion.title}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points</label>
                      <input
                        type="number"
                        value={editingQuestion.points}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) })}
                        min="0"
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Question Text</label>
                      <textarea
                        value={editingQuestion.question}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          minHeight: '80px'
                        }}
                      />
                    </div>

                    {/* Multiple Choice Options */}
                    {editingQuestion.type === 'MULTIPLE_CHOICE' && (
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Choices</label>
                        {editingQuestion.choices.map((choice, index) => (
                          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <input
                              type="radio"
                              checked={choice.isCorrect}
                              onChange={() => updateChoice(index, 'isCorrect', true)}
                              title="Mark as correct answer"
                            />
                            <input
                              type="text"
                              value={choice.text}
                              onChange={(e) => updateChoice(index, 'text', e.target.value)}
                              placeholder={`Choice ${index + 1}`}
                              style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                              }}
                            />
                            <button
                              onClick={() => removeChoice(index)}
                              style={{
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addChoice}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          + Add Choice
                        </button>
                      </div>
                    )}

                    {/* True/False Options */}
                    {editingQuestion.type === 'TRUE_FALSE' && (
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Correct Answer</label>
                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <input
                              type="radio"
                              checked={editingQuestion.correctAnswer === true}
                              onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: true })}
                            />
                            <span>True</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="radio"
                              checked={editingQuestion.correctAnswer === false}
                              onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: false })}
                            />
                            <span>False</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Fill in Blank Options */}
                    {editingQuestion.type === 'FILL_IN_BLANK' && (
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Possible Correct Answers</label>
                        {editingQuestion.possibleAnswers.map((answer, index) => (
                          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={answer.text}
                              onChange={(e) => updatePossibleAnswer(index, 'text', e.target.value)}
                              placeholder={`Answer ${index + 1}`}
                              style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                              }}
                            />
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                              <input
                                type="checkbox"
                                checked={answer.caseSensitive}
                                onChange={(e) => updatePossibleAnswer(index, 'caseSensitive', e.target.checked)}
                              />
                              <span style={{ fontSize: '13px' }}>Case Sensitive</span>
                            </label>
                            <button
                              onClick={() => removePossibleAnswer(index)}
                              style={{
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addPossibleAnswer}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          + Add Possible Answer
                        </button>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button
                        onClick={handleSaveQuestion}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {editingQuestion._id ? 'Update Question' : 'Save Question'}
                      </button>
                      <button
                        onClick={() => setEditingQuestion(null)}
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
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                  <button
                    onClick={handleSaveQuiz}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
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
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
