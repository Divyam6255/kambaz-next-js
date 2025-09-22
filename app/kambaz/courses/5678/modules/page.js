import Image from 'next/image';

export default function Course5678ModulesPage() {
  return (
    <div className="kambaz-container">
      <nav className="sidebar">
        <div className="nav-links">
          <div className="nav-item">
            <a href="https://northeastern.edu" target="_blank">NEU</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/account">Account</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/dashboard">Dashboard</a>
          </div>
          <div className="nav-item active">
            <a href="/kambaz/courses">Courses</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/calendar">Calendar</a>
          </div>
          <div className="nav-item">
            <a href="/kambaz/inbox">Inbox</a>
          </div>
          <div className="nav-item">
            <a href="/labs">Labs</a>
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
              <div className="course-hero-image">
                <Image src="/PDP_textbook.jpg" alt="Programming Design and Paradigm" width={300} height={200} style={{borderRadius: '8px', marginBottom: '20px'}} />
              </div>
              <div className="modules-controls">
                <button>Collapse All</button>
                <button>View Progress</button>
                <select>
                  <option>Publish All</option>
                </select>
                <button>+ Module</button>
              </div>
              
              <div className="module-list">
                <div className="module-item">
                  <h3>Week 1 - Introduction to Programming Paradigms</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Understand different programming paradigms</li>
                      <li>Learn Object-Oriented Programming principles</li>
                    </ul>
                    <h4>READING</h4>
                    <ul>
                      <li>Design Patterns - Chapter 1 - Introduction</li>
                      <li>Clean Code - Chapter 2 - Functions</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>OOP vs Functional Programming</li>
                      <li>Encapsulation and Inheritance</li>
                      <li>Polymorphism Concepts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="module-item">
                  <h3>Week 2 - Design Patterns and SOLID Principles</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Apply SOLID principles in code design</li>
                      <li>Implement common design patterns</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>Single Responsibility Principle</li>
                      <li>Observer Pattern Implementation</li>
                      <li>Factory Pattern Examples</li>
                    </ul>
                  </div>
                </div>
                
                <div className="module-item">
                  <h3>Week 3 - Functional Programming Concepts</h3>
                  <div className="module-content">
                    <h4>LEARNING OBJECTIVES</h4>
                    <ul>
                      <li>Understand functional programming principles</li>
                      <li>Apply immutability and pure functions</li>
                    </ul>
                    <h4>SLIDES</h4>
                    <ul>
                      <li>Higher-Order Functions</li>
                      <li>Lambda Expressions</li>
                      <li>Map, Filter, Reduce Operations</li>
                    </ul>
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