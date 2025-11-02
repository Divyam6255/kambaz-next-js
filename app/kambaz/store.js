import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial data
const initialCourses = [
  {
    id: '1234',
    name: 'Web Development',
    code: 'CS1234',
    instructor: 'Bob Johnson',
    modules: [
      { 
        id: 'm1', 
        title: 'Introduction', 
        items: [
          { type: 'file', title: 'Syllabus.pdf' },
          { type: 'video', title: 'Welcome Video' },
        ] 
      },
      { 
        id: 'm2', 
        title: 'JavaScript Basics', 
        items: [
          { type: 'file', title: 'Lecture Slides' },
          { type: 'assignment', title: 'JS Assignment 1' },
        ] 
      },
    ],
    assignments: [
      { id: 'a1', title: 'JS Assignment 1', due: '2025-10-25', points: 100, description: 'Complete the JavaScript exercises.' },
      { id: 'a2', title: 'React Project', due: '2025-11-05', points: 150, description: 'Build a React app.' },
    ],
    people: [1, 2, 3, 4],
    home: {
      welcome: 'Welcome to Web Development!',
      announcements: ['First class on Monday', 'Assignment 1 released'],
    },
  },
  {
    id: '5678',
    name: 'Programming Design and Paradigm',
    code: 'CS5678',
    instructor: 'Carol Lee',
    modules: [
      { 
        id: 'm1', 
        title: 'OOP Concepts', 
        items: [
          { type: 'file', title: 'OOP.pdf' },
          { type: 'assignment', title: 'OOP Assignment' },
        ] 
      },
      { 
        id: 'm2', 
        title: 'Functional Programming', 
        items: [
          { type: 'file', title: 'FP.pdf' },
          { type: 'assignment', title: 'FP Assignment' },
        ] 
      },
    ],
    assignments: [
      { id: 'a1', title: 'OOP Assignment', due: '2025-10-28', points: 120, description: 'Implement OOP patterns.' },
      { id: 'a2', title: 'FP Assignment', due: '2025-11-10', points: 130, description: 'Solve problems using FP.' },
    ],
    people: [1, 3],
    home: {
      welcome: 'Welcome to Programming Design and Paradigm!',
      announcements: ['Project proposal due next week'],
    },
  },
  {
    id: '9999',
    name: 'Advanced Algorithms',
    code: 'CS9999',
    instructor: 'Eve Davis',
    modules: [
      { 
        id: 'm1', 
        title: 'Graph Theory', 
        items: [
          { type: 'file', title: 'Graph Notes.pdf' },
          { type: 'video', title: 'Graph Intro Video' },
        ] 
      },
      { 
        id: 'm2', 
        title: 'Dynamic Programming', 
        items: [
          { type: 'file', title: 'DP Slides' },
          { type: 'assignment', title: 'DP Assignment' },
        ] 
      },
    ],
    assignments: [
      { id: 'a1', title: 'Graph Assignment', due: '2025-10-30', points: 110, description: 'Solve graph problems.' },
      { id: 'a2', title: 'DP Project', due: '2025-11-15', points: 140, description: 'Implement DP solutions.' },
      { id: 'a3', title: 'Algorithm Analysis', due: '2025-11-20', points: 150, description: 'Analyze algorithm efficiency.' },
      { id: 'a4', title: 'Approximation Algorithms', due: '2025-11-30', points: 160, description: 'Design approximation algorithms.' },
    ],
    people: [1, 2],
    home: {
      welcome: 'Welcome to Advanced Algorithms!',
      announcements: ['Midterm next month'],
    },
  },
];

// Courses Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState: initialCourses,
  reducers: {
    addCourse: (state, action) => {
      state.push({
        ...action.payload,
        modules: [],
        assignments: [],
        people: [],
        home: {
          welcome: `Welcome to ${action.payload.name}!`,
          announcements: [],
        },
      });
    },
    updateCourse: (state, action) => {
      const index = state.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteCourse: (state, action) => {
      return state.filter(c => c.id !== action.payload);
    },
    addModule: (state, action) => {
      const { courseId, module } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        course.modules.push(module);
      }
    },
    updateModule: (state, action) => {
      const { courseId, moduleId, updates } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        const module = course.modules.find(m => m.id === moduleId);
        if (module) {
          Object.assign(module, updates);
        }
      }
    },
    deleteModule: (state, action) => {
      const { courseId, moduleId } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        course.modules = course.modules.filter(m => m.id !== moduleId);
      }
    },
    addAssignment: (state, action) => {
      const { courseId, assignment } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        course.assignments.push(assignment);
      }
    },
    updateAssignment: (state, action) => {
      const { courseId, assignmentId, updates } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        const assignment = course.assignments.find(a => a.id === assignmentId);
        if (assignment) {
          Object.assign(assignment, updates);
        }
      }
    },
    deleteAssignment: (state, action) => {
      const { courseId, assignmentId } = action.payload;
      const course = state.find(c => c.id === courseId);
      if (course) {
        course.assignments = course.assignments.filter(a => a.id !== assignmentId);
      }
    },
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  addModule,
  updateModule,
  deleteModule,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = coursesSlice.actions;

const store = configureStore({
  reducer: {
    courses: coursesSlice.reducer,
  },
});

export default store;
