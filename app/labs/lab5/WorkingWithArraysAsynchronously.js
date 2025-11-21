'use client';
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  const removeTodo = async (todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || `Unable to Delete Todo with ID: ${todo.id}`);
    }
  };

  const createTodo = async () => {
    const newTodo = {
      title: "New Task",
      completed: false,
    };
    try {
      const createdTodo = await client.postTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating todo");
    }
  };

  const postTodo = async () => {
    const newTodo = {
      title: "New Posted Task",
      completed: false,
    };
    try {
      const createdTodo = await client.postTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating todo");
    }
  };

  const updateTodo = async (todo) => {
    try {
      const updatedTodo = await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
      setEditingTodoId(null);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || `Unable to update todo with ID: ${todo.id}`);
    }
  };

  const handleUpdateClick = (todo) => {
    if (editingTodoId === todo.id) {
      // Currently editing, save the changes
      const currentTodo = todos.find((t) => t.id === todo.id);
      if (currentTodo) {
        updateTodo(currentTodo);
      }
    } else {
      // Not editing, enable edit mode
      setEditingTodoId(todo.id);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      
      {errorMessage && (
        <div className="alert alert-danger" style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          borderRadius: 4, 
          marginBottom: 16,
          border: '1px solid #f5c6cb'
        }}>
          {errorMessage}
        </div>
      )}

      <h4>Todos</h4>
      
      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-primary mb-2 me-2"
          onClick={createTodo}
          style={{
            background: '#28a745',
            color: 'white',
            borderRadius: 5,
            padding: '8px 16px',
            border: 'none',
            cursor: 'pointer',
            marginRight: 8,
            marginBottom: 8
          }}
        >
          Create Todo
        </button>
        
        <button
          id="wd-post-todo"
          className="btn btn-primary mb-2"
          onClick={postTodo}
          style={{
            background: '#007bff',
            color: 'white',
            borderRadius: 5,
            padding: '8px 16px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 8
          }}
        >
          Post Todo
        </button>
      </div>

      <ul className="list-group" style={{ marginBottom: 16 }}>
        {todos.map((todo) => {
          const isEditing = editingTodoId === todo.id;

          return (
          <li
            key={todo.id}
            className="list-group-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 15px',
              marginBottom: 4
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={(e) => {
                  const updatedTodo = { ...todo, completed: e.target.checked };
                  setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
                }}
                disabled={!isEditing}
                style={{ marginRight: 8 }}
              />
              <input
                type="text"
                value={todo.title}
                onChange={(e) => {
                  const updatedTodo = { ...todo, title: e.target.value };
                  setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
                }}
                readOnly={!isEditing}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  border: isEditing ? '1px solid #007bff' : 'none',
                  background: isEditing ? 'white' : 'transparent',
                  flex: 1,
                  marginRight: 8,
                  padding: isEditing ? '4px 8px' : '0',
                  borderRadius: isEditing ? 4 : 0,
                  cursor: isEditing ? 'text' : 'default'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => handleUpdateClick(todo)}
                className="btn btn-warning btn-sm"
                id="wd-update-todo"
                style={{
                  background: isEditing ? '#28a745' : '#ffc107',
                  color: isEditing ? 'white' : 'black',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                {isEditing ? 'Save' : 'Update'}
              </button>
              <button
                onClick={() => removeTodo(todo)}
                className="btn btn-danger btn-sm"
                id="wd-delete-todo"
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
}
