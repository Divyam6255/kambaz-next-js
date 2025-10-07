'use client';
import Image from 'next/image';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask, FaPlus, FaEllipsisV, FaChevronDown, FaFile, FaVideo, FaPencilAlt, FaCheckCircle } from 'react-icons/fa';
import '../../styles.css';

export default function Course5678ModulesPage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <a href="/kambaz" className="kambaz-brand">Kambaz</a>
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">
              <img src="/org-neu.svg" 
                   alt="NEU" style={{width: '20px', height: '20px'}} />
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
          <div className="nav-item active">
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
          <h1>Course 5678 - Programming Design and Paradigm</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item">
              <a href="/kambaz/courses/5678/home">Home</a>
            </div>
            <div className="course-nav-item active">
              <a href="/kambaz/courses/5678/modules">Modules</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item">
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
                <button className="btn-grey">
                  Collapse All
                </button>
                <button className="btn-grey">
                  View Progress
                </button>
                <button className="btn-red">
                  <FaPlus /> Module
                </button>
                <div className="dropdown">
                  <button className="btn-grey">
                    <FaCheckCircle /> Publish All <FaChevronDown />
                  </button>
                  <div className="dropdown-content">
                    <a href="#"><FaCheckCircle /> Publish All</a>
                    <a href="#"><FaCheckCircle /> Publish All & Notify</a>
                    <a href="#">📋 Unpublish All</a>
                    <a href="#">👀 View All Modules</a>
                  </div>
                </div>
              </div>

              <div className="module">
                <div className="module-header">
                  <div className="module-title">
                    <FaChevronDown />
                    Week 1 - Object-Oriented Fundamentals
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-title">
                    <FaFile />
                    Learning Objectives
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-title">
                    <FaVideo />
                    OOP Concepts Video
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-title">
                    <FaPencilAlt />
                    Design Patterns Assignment
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
              </div>

              <div className="module">
                <div className="module-header">
                  <div className="module-title">
                    <FaChevronDown />
                    Week 2 - SOLID Principles
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-title">
                    <FaFile />
                    SOLID Overview
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
                <div className="lesson">
                  <div className="lesson-title">
                    <FaFile />
                    Code Examples
                  </div>
                  <div className="module-controls">
                    <FaEllipsisV />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}