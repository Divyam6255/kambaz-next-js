'use client';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles.css';

export default function AssignmentEditorPage() {
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
            <div className="course-nav-item">
              <a href="/kambaz/courses/1234/people">People</a>
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
            <div className="container-fluid p-4">
              <h2 className="mb-4">Assignment Editor</h2>
              
              <form className="assignment-form">
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="assignmentName" className="form-label">Assignment Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      id="assignmentName" 
                      name="assignmentName" 
                      defaultValue="A1 - ENV + HTML"
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                      className="form-control"
                      id="description" 
                      name="description" 
                      rows="4"
                      defaultValue="Create a simple HTML page with basic elements and deploy it to the web."
                    ></textarea>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="points" className="form-label">Points</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="points" 
                      name="points" 
                      defaultValue="100"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                    <select className="form-select" id="assignmentGroup" name="assignmentGroup" defaultValue="ASSIGNMENTS">
                      <option value="ASSIGNMENTS">Assignments</option>
                      <option value="QUIZZES">Quizzes</option>
                      <option value="EXAMS">Exams</option>
                      <option value="PROJECT">Project</option>
                    </select>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="displayGrade" className="form-label">Display Grade as</label>
                    <select className="form-select" id="displayGrade" name="displayGrade" defaultValue="PERCENTAGE">
                      <option value="PERCENTAGE">Percentage</option>
                      <option value="POINTS">Points</option>
                      <option value="LETTER">Letter Grade</option>
                      <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="submissionType" className="form-label">Submission Type</label>
                    <select className="form-select" id="submissionType" name="submissionType" defaultValue="ONLINE">
                      <option value="ONLINE">Online</option>
                      <option value="ON_PAPER">On Paper</option>
                      <option value="NO_SUBMISSION">No Submission</option>
                      <option value="EXTERNAL_TOOL">External Tool</option>
                    </select>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Online Entry Options</label>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="entryOptions" value="text" defaultChecked id="textEntry" />
                          <label className="form-check-label" htmlFor="textEntry">
                            Text Entry
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="entryOptions" value="website" id="websiteURL" />
                          <label className="form-check-label" htmlFor="websiteURL">
                            Website URL
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="entryOptions" value="media" id="mediaRecordings" />
                          <label className="form-check-label" htmlFor="mediaRecordings">
                            Media Recordings
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="entryOptions" value="file" defaultChecked id="fileUploads" />
                          <label className="form-check-label" htmlFor="fileUploads">
                            File Uploads
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Assign</label>
                    <div className="border p-3 rounded">
                      <div className="row mb-2">
                        <div className="col-md-4">
                          <label htmlFor="assignTo" className="form-label">Assign to</label>
                          <input 
                            type="text" 
                            className="form-control"
                            id="assignTo" 
                            name="assignTo" 
                            defaultValue="Everyone"
                          />
                        </div>
                        <div className="col-md-8"></div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor="dueDate" className="form-label">Due</label>
                          <input 
                            type="datetime-local" 
                            className="form-control"
                            id="dueDate" 
                            name="dueDate" 
                            defaultValue="2025-10-15T23:59"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="availableFrom" className="form-label">Available from</label>
                          <input 
                            type="datetime-local" 
                            className="form-control"
                            id="availableFrom" 
                            name="availableFrom" 
                            defaultValue="2025-09-22T00:00"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="until" className="form-label">Until</label>
                          <input 
                            type="datetime-local" 
                            className="form-control"
                            id="until" 
                            name="until" 
                            defaultValue="2025-12-15T23:59"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-12">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => window.location.href='/kambaz/courses/1234/assignments'}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}