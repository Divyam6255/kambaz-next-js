'use client';
import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async () => {
    const updatedAssignment = await client.updateTitle(assignment.title);
    setAssignment(updatedAssignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <input
        className="form-control mb-2"
        value={assignment.title || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        style={{
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          width: '100%',
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <textarea
        className="form-control mb-2"
        rows={3}
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        style={{
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          width: '100%',
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={assignment.due || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
        style={{
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          width: '100%',
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={updateTitle}
        style={{
          background: '#28a745',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: 8
        }}
      >
        Update Title
      </button>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: 4 }}>
        {JSON.stringify(assignment, null, 2)}
      </pre>
      <hr />
    </div>
  );
}
