import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;
const ATTEMPTS_API = `${HTTP_SERVER}/api/attempts`;

// Configure axios to send cookies
axios.defaults.withCredentials = true;

// User Authentication APIs
export const signup = async (userData) => {
  const response = await axios.post(`${USERS_API}/signup`, userData);
  return response.data;
};

export const signin = async (credentials) => {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${USERS_API}/current`);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${USERS_API}/profile`);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(`${USERS_API}/profile`, profileData);
  return response.data;
};

// Admin User Management APIs
export const getAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(USERS_API, userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${USERS_API}/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

// Courses APIs
export const getAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const getCourse = async (id) => {
  const response = await axios.get(`${COURSES_API}/${id}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axios.post(COURSES_API, courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await axios.put(`${COURSES_API}/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};

// Modules APIs
export const addModule = async (courseId, moduleData) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/modules`, moduleData);
  return response.data;
};

export const updateModule = async (courseId, moduleId, updates) => {
  const response = await axios.put(`${COURSES_API}/${courseId}/modules/${moduleId}`, updates);
  return response.data;
};

export const deleteModule = async (courseId, moduleId) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return response.data;
};

// Assignments APIs
export const addAssignment = async (courseId, assignmentData) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignmentData);
  return response.data;
};

export const updateAssignment = async (courseId, assignmentId, updates) => {
  const response = await axios.put(`${COURSES_API}/${courseId}/assignments/${assignmentId}`, updates);
  return response.data;
};

export const deleteAssignment = async (courseId, assignmentId) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return response.data;
};

// Enrollments APIs
export const enrollInCourse = async (userId, courseId, role = 'STUDENT') => {
  const response = await axios.post(ENROLLMENTS_API, { userId, courseId, role });
  return response.data;
};

export const unenrollFromCourse = async (userId, courseId) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const getUserEnrollments = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return response.data;
};

export const getCurrentUserEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENTS_API}/current`);
  return response.data;
};

export const getCourseEnrollments = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
  return response.data;
};

export const checkEnrollment = async (courseId) => {
  const response = await axios.get(`${ENROLLMENTS_API}/check/${courseId}`);
  return response.data;
};

// Quizzes APIs
export const getCourseQuizzes = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const getQuiz = async (quizId) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId, quizData) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quizData);
  return response.data;
};

export const updateQuiz = async (quizId, quizData) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}`, quizData);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId, published) => {
  const response = await axios.patch(`${QUIZZES_API}/${quizId}/publish`, { published });
  return response.data;
};

// Questions APIs
export const getQuizQuestions = async (quizId) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (quizId, questionData) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, questionData);
  return response.data;
};

export const updateQuestion = async (questionId, questionData) => {
  const response = await axios.put(`${QUESTIONS_API}/${questionId}`, questionData);
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Quiz Attempts APIs
export const getQuizAttempts = async (quizId) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

export const getAttempt = async (attemptId) => {
  const response = await axios.get(`${ATTEMPTS_API}/${attemptId}`);
  return response.data;
};

export const startQuizAttempt = async (quizId) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

export const submitQuizAttempt = async (attemptId, answers) => {
  const response = await axios.post(`${ATTEMPTS_API}/${attemptId}/submit`, { answers });
  return response.data;
};

