'use client';

export default function AssignmentEditorPage() {
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
          <h1>Course 1234 - Web Development</h1>
        </div>
        
        <div className="course-layout">
          <div className="course-nav-sidebar">
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/home">Home</a>
            </div>
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/modules">Modules</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Piazza</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Zoom</a>
            </div>
            <div className="course-nav-item active">
              <a href="/kambaz/courses/1234/assignments">Assignments</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Quizzes</a>
            </div>
            <div className="course-nav-item">
              <a href="#">Grades</a>
            </div>
          </div>
          
          <div className="course-main-content">
            <div className="assignment-editor">
          <h2>Assignment Editor</h2>
          
          <form className="assignment-form">
            <div className="form-group">
              <label htmlFor="assignmentName">Assignment Name:</label>
              <input 
                type="text" 
                id="assignmentName" 
                name="assignmentName" 
                defaultValue="A1 - ENV + HTML"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea 
                id="description" 
                name="description" 
                rows="4"
                defaultValue="Create a simple HTML page with basic elements and deploy it to the web."
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="points">Points:</label>
              <input 
                type="number" 
                id="points" 
                name="points" 
                defaultValue="100"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="assignmentGroup">Assignment Group:</label>
              <select id="assignmentGroup" name="assignmentGroup" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="displayGrade">Display Grade as:</label>
              <select id="displayGrade" name="displayGrade" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter Grade</option>
                <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="submissionType">Submission Type:</label>
              <select id="submissionType" name="submissionType" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
                <option value="NO_SUBMISSION">No Submission</option>
                <option value="EXTERNAL_TOOL">External Tool</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Online Entry Options:</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="entryOptions" value="text" defaultChecked />
                  Text Entry
                </label>
                <label>
                  <input type="checkbox" name="entryOptions" value="website" />
                  Website URL
                </label>
                <label>
                  <input type="checkbox" name="entryOptions" value="media" />
                  Media Recordings
                </label>
                <label>
                  <input type="checkbox" name="entryOptions" value="file" defaultChecked />
                  File Uploads
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="assignTo">Assign to:</label>
              <input 
                type="text" 
                id="assignTo" 
                name="assignTo" 
                defaultValue="Everyone"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">Due Date:</label>
              <input 
                type="date" 
                id="dueDate" 
                name="dueDate" 
                defaultValue="2025-10-15"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="availableFrom">Available from:</label>
              <input 
                type="date" 
                id="availableFrom" 
                name="availableFrom" 
                defaultValue="2025-09-22"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="until">Until:</label>
              <input 
                type="date" 
                id="until" 
                name="until" 
                defaultValue="2025-12-15"
              />
            </div>
            
            <div className="form-buttons">
              <button type="button" onClick={() => window.location.href='/kambaz/courses/1234/assignments'}>
                Cancel
              </button>
              <button type="submit">
                Save
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}