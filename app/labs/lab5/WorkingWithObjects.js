'use client';
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "Introduction to Computer Science",
    description: "Learn the fundamentals of programming and computer science",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* Retrieving Objects */}
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
        style={{
          display: 'inline-block',
          background: '#1976d2',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Get Assignment
      </a>
      <hr />

      {/* Retrieving Properties */}
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
        style={{
          display: 'inline-block',
          background: '#1976d2',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Get Title
      </a>
      <hr />

      {/* Get Module */}
      <h4>Get Module</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${MODULE_API_URL}`}
        style={{
          display: 'inline-block',
          background: '#1976d2',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Get Module
      </a>
      <hr />

      {/* Get Module Name */}
      <h4>Get Module Name</h4>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
        style={{
          display: 'inline-block',
          background: '#1976d2',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Get Module Name
      </a>
      <hr />

      {/* Modifying Assignment Properties */}
      <h4>Modifying Properties</h4>
      <input
        id="wd-assignment-title"
        type="text"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        style={{
          width: '75%',
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          display: 'block'
        }}
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        style={{
          display: 'inline-block',
          background: '#28a745',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Update Title
      </a>
      <hr />
    </div>
  );
}
