'use client';
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* Retrieving Arrays */}
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary"
        href={API}
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
        Get Todos
      </a>
      <hr />

      {/* Retrieving an Item by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        id="wd-todo-id"
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        style={{
          width: '50%',
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          display: 'block'
        }}
      />
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
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
        Get Todo by ID
      </a>
      <hr />

      {/* Filtering Array Items */}
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
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
        Get Completed Todos
      </a>
      <hr />

      {/* Creating New Items */}
      <h4>Creating new Items in an Array</h4>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}
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
        Create Todo
      </a>
      <hr />

      {/* Removing from an Array */}
      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
        style={{
          display: 'inline-block',
          background: '#dc3545',
          color: 'white',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <input
        id="wd-todo-id-delete"
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        style={{
          width: '50%',
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          display: 'block'
        }}
      />
      <hr />

      {/* Updating an Item in an Array */}
      <h4>Updating an Item in an Array</h4>
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
        style={{
          display: 'inline-block',
          background: '#ffc107',
          color: 'black',
          borderRadius: 5,
          padding: '8px 16px',
          textDecoration: 'none',
          marginBottom: 8
        }}
      >
        Update Todo
      </a>
      <input
        id="wd-todo-id-update"
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        style={{
          width: '25%',
          padding: '8px',
          fontSize: 16,
          marginRight: 8,
          marginBottom: 8,
          display: 'inline-block'
        }}
      />
      <input
        id="wd-todo-title-update"
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        style={{
          width: '50%',
          padding: '8px',
          fontSize: 16,
          marginBottom: 8,
          display: 'inline-block'
        }}
      />
      <br /><br />
      <hr />
    </div>
  );
}
