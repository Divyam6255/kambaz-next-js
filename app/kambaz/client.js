import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

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
