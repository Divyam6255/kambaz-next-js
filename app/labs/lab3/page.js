"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { get } from 'http';
import { useState } from 'react';
import PathParameters from "./PathParameters";

export default function Lab3Page() {
  // Variables and constants
  const constantValue = "This is a constant";
  let variableValue = "This is a variable";

  // Variable types
  const numberVariable = 123;
  const floatingPointNumber = 234.345;
  const stringVariable = 'Hello World!';
  const booleanVariable = true;
  const isNumber = typeof numberVariable;
  const isString = typeof stringVariable;
  const isBoolean = typeof booleanVariable;

  // Boolean Variables
  const number = 123, floatingPoint = 234.345;
  const true1 = true, false1 = false;
  const false2 = true1 && false1;
  const true2 = true1 || false1;
  const true3 = !false2;
  const true4 = number === 123;
  const true5 = floatingPoint !== 321.432;

  // If Else
  const true6 = true, false3 = false;
  const loggedIn = true;

  // Legacy ES5 add function
  function add(a, b) {
    return a + b;
  }

  // Dynamic Arrays
  const [dynamicArray, setDynamicArray] = useState([1, 2, 3]);
  const addToArray = () => setDynamicArray([...dynamicArray, dynamicArray.length + 1]);
  const removeFromArray = () => setDynamicArray(dynamicArray.slice(0, -1));

  // For Loops
  const forLoopExample = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(`Item ${i + 1}`);
    }
    return result;
  };

  // JSON Example
  const jsonExample = {
    name: "John Doe",
    age: 30,
    hobbies: ["reading", "coding", "gaming"],
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA"
    }
  };

  // Todo List
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", completed: true },
    { id: 2, text: "Learn React", completed: false },
    { id: 3, text: "Build a project", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  const TodoItem = ({ todo, onToggle }) => (
    <div className="d-flex align-items-center mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="me-2"
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
    </div>
  );
  const TodoList = ({ todos, onToggle }) => (
    <div>{todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />)}</div>
  );

  // HTML Classes
  const [isDanger, setIsDanger] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const RedBackground = ({ children }) => (
    <div className="bg-danger text-white p-3 mb-3">{children}</div>
  );
  const BlueBackground = ({ children }) => (
    <div className="bg-primary text-white p-3 mb-3">{children}</div>
  );
  const styleExample = {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '10px',
    margin: '10px 0'
  };
  const YellowBackground = ({ children }) => (
    <div style={{ backgroundColor: 'yellow', padding: '10px', margin: '10px 0' }}>{children}</div>
  );
  const RedStyleBackground = ({ children }) => (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px 0' }}>{children}</div>
  );
  const BlueStyleBackground = ({ children }) => (
    <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '10px 0' }}>{children}</div>
  );

  // Child Components
  const Card = ({ title, children }) => (
    <div className="card mb-3">
      <div className="card-header"><h5 className="mb-0">{title}</h5></div>
      <div className="card-body">{children}</div>
    </div>
  );

  // Location & Navigation
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const NavLink = ({ href, children }) => {
    const isActive = currentPath === href;
    return (
      <a
        href={href}
        className={`nav-link ${isActive ? 'active fw-bold' : ''}`}
        style={{ color: isActive ? 'red' : 'inherit' }}
      >{children}</a>
    );
  };

  // Main Render
  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Lab 3</h1>
      {/* Variables and Constants */}
      <h2>Variables and Constants</h2>
      <p><strong>Constant:</strong> {constantValue}</p>
      <p><strong>Variable:</strong> {variableValue}</p>
      <hr />

      {/* Variable Types */}
      <h2>Variables Types</h2>
      <p>numberVariable = {numberVariable}</p>
      <p>floatingPointNumber = {floatingPointNumber}</p>
      <p>stringVariable = {stringVariable}</p>
      <p>booleanVariable = {booleanVariable.toString()}</p>
      <p>isNumber = {isNumber}</p>
      <p>isString = {isString}</p>
      <p>isBoolean = {isBoolean}</p>
      <hr />

      {/* Boolean Variables */}
      <h2>Boolean Variables</h2>
      <p>true1 = {true1.toString()}</p>
      <p>false1 = {false1.toString()}</p>
      <p>false2 = {false2.toString()}</p>
      <p>true2 = {true2.toString()}</p>
      <p>true3 = {true3.toString()}</p>
      <p>true4 = {true4.toString()}</p>
      <p>true5 = {true5.toString()}</p>
      <p>false3 = {false1.toString()}</p>
      <hr />

      {/* If Else */}
      <h2>If Else</h2>
      <p>true6 = {true6.toString()}</p>
      <p>!false3 = {(!false3).toString()}</p>
      <hr />

      {/* Ternary Operator */}
      <h2>Ternary Operator</h2>
      <div id="wd-ternary-operator">
        <h4>Logged In</h4>
        {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
        <hr />
      </div>

      {/* Conditional Output Sections */}
      <h2>Generating Conditional Output</h2>
      <p>conditionTrue = {true.toString()}</p>
      <p>conditionFalse = {false.toString()}</p>
      <p>Output (True): {true ? "True Output" : "False Output"}</p>
      <p>Output (False): {false ? "True Output" : "False Output"}</p>
      <hr />

      <h2>Welcome If Else</h2>
      <p>loggedIn = {true.toString()}</p>
      <p>Output: {(() => {
        const loggedIn = true;
        if (loggedIn) {
          return "Welcome If Else";
        } else {
          return "Please login If Else";
        }
      })()}</p>
      <hr />

      <h2>Please login Inline</h2>
      <p>loggedInInline = {false.toString()}</p>
      <p>Output: {false ? "Welcome Inline" : "Please login Inline"}</p>
      <hr />

      {/* Functions */}
      <h2>Functions</h2>
      <h3>Legacy ES5 functions</h3>
      <p>twoPlusFour = {add(2, 4)}</p>
      <p>add(2, 4) = {add(2, 4)}</p>
      <hr />

      <h3>New ES6 arrow functions</h3>
      {(() => {
        const subtract = (a, b) => a - b;
        const threeMinusOne = subtract(3, 1);
        return (
          <>
            <p>threeMinusOne = {threeMinusOne}</p>
            <p>subtract(3, 1) = {subtract(3, 1)}</p>
          </>
        );
      })()}
      <hr />

      <h3>Implied return</h3>
      {(() => {
        const multiply = (a, b) => a * b;
        const fourTimesFive = multiply(4, 5);
        return (
          <>
            <p>fourTimesFive = {fourTimesFive}</p>
            <p>multiply(4, 5) = {multiply(4, 5)}</p>
          </>
        );
      })()}
      <hr />

      {/* Template Literals */}
      <h2>Template Literals</h2>
      {(() => {
        const a = 2, b = 3;
        const result1 = `${a} + ${b} = ${a + b}`;
        const result2 = `${a} + ${b} = ${a + b}`;
        const name = "alice";
        const greeting1 = `Welcome home ${name}`;
        const loggedIn = false;
        const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;
        return (
          <>
            <p>result1 = {result1}</p>
            <p>result2 = {result2}</p>
            <p>greeting1 = {greeting1}</p>
            <p>greeting2 = {greeting2}</p>
          </>
        );
      })()}
      <hr />

      {/* Simple Arrays */}
      <h2>Simple Arrays</h2>
      {(() => {
        const numberArray1 = [1, 2, 3, 4, 5].join("");
        const stringArray1 = ["string1", "string2"].join("");
        const variableArray1 = [25, -31, numberArray1, stringArray1].join("");
        const todoList = ["Buy milk", "Feed the pets"];
        return (
          <>
            <p>numberArray1 = {numberArray1}</p>
            <p>stringArray1 = {stringArray1}</p>
            <p>variableArray1 = {variableArray1}</p>
            <div>Todo list:
              <ol>{todoList.map((item, idx) => <li key={idx}>{item}</li>)}</ol>
            </div>
          </>
        );
      })()}
      <hr />

      {/* Array index and length */}
      <h2>Array index and length</h2>
      {(() => {
        const arr = [1, 2, 3, 4, 5];
        const length1 = arr.length;
        const index1 = arr[2];
        return (
          <>
            <p>length1 = {length1}</p>
            <p>index1 = {index1}</p>
          </>
        );
      })()}
      <hr />

      {/* Dynamic Arrays */}
      <h2>Dynamic Arrays</h2>
      <p>Current Array: {dynamicArray.join(", ")}</p>
      <button className="btn btn-success me-2" onClick={addToArray}>Add Item</button>
      <button className="btn btn-danger" onClick={removeFromArray}>Remove Item</button>
      <hr />

      {/* For Loops */}
      <h2>For Loops</h2>
      <ul>{forLoopExample().map((item, index) => <li key={index}>{item}</li>)}</ul>
      <hr />

      {/* Array Methods */}
      <h2>The Map Function</h2>
      {(() => {
        const arr = [1, 2, 3, 4, 5];
        const mapped = arr.map(x => x * 2);
        return <p>Mapped (x2): {mapped.join(", ")}</p>;
      })()}
      <hr />

      <h2>The Find Function</h2>
      {(() => {
        const arr = [1, 2, 3, 4, 5];
        const found = arr.find(x => x > 3);
        return <p>Found (first &gt; 3): {found}</p>;
      })()}
      <hr />

      <h2>The Find Index Function</h2>
      {(() => {
        const arr = [1, 2, 3, 4, 5];
        const foundIdx = arr.findIndex(x => x > 3);
        return <p>Find Index (first &gt; 3): {foundIdx}</p>;
      })()}
      <hr />

      <h2>The Filter Function</h2>
      {(() => {
        const arr = [1, 2, 3, 4, 5];
        const filtered = arr.filter(x => x % 2 === 0);
        return <p>Filtered (even numbers): {filtered.join(", ")}</p>;
      })()}
      <hr />

      {/* JSON Example */}
      <h2>JSON Example</h2>
      <pre>{JSON.stringify(jsonExample, null, 2)}</pre>
      <hr />

      {/* Todo List */}
      <h2>Todo List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addTodo}>Add Todo</button>
      </div>
      <TodoList todos={todos} onToggle={toggleTodo} />
      <hr />

      {/* Spread Operator */}
      <h2>Spread Operator</h2>
      <h3>Array Spread</h3>
      {(() => {
        const arr1 = [1, 2, 3];
        const arr2 = [...arr1, 4, 5, 6];
        return (
          <>
            <p>arr1 = [{arr1.join(",")}]</p>
            <p>arr2 = [{arr2.join(",")}]</p>
          </>
        );
      })()}
      <h3>Object Spread</h3>
      {(() => {
        const obj1 = { a: 1, b: 2, c: 3 };
        const obj2 = { ...obj1, d: 4, e: 5, f: 6 };
        const obj3 = { ...obj1, b: 4 };
        return (
          <>
            <p>{JSON.stringify(obj1)}</p>
            <p>{JSON.stringify(obj2)}</p>
            <p>{JSON.stringify(obj3)}</p>
          </>
        );
      })()}
      <hr />

      {/* Destructuring */}
      <h2>Destructuring</h2>
      <h3>Object Destructing</h3>
      {(() => {
        const person = { name: "John", age: 25 };
        const { name, age } = person;
        return (
          <>
            <div>const {'{ name, age }'} = {'{ name: "John", age: 25 }'}</div>
            <p>name = {name}</p>
            <p>age = {age}</p>
          </>
        );
      })()}
      <h3>Array Destructing</h3>
      {(() => {
        const arr = ["one", "two", "three"];
        const [first, second, third] = arr;
        return (
          <>
            <div>const [first, second, third] = ["one", "two", "three"]</div>
            <p>first = {first}</p>
            <p>second = {second}</p>
            <p>third = {third}</p>
          </>
        );
      })()}
      <hr />

      {/* Function Destructuring */}
      <h2>Function Destructuring</h2>
      {(() => {
        const add = (a, b) => a + b;
        const sum = add(1, 2);
        const subtract = ({ a, b }) => a - b;
        const difference = subtract({ a: 4, b: 2 });
        return (
          <>
            <div>const add = (a, b) =&gt; a + b;</div>
            <div>const sum = add(1, 2);</div>
            <div>const subtract = (&#123; a, b &#125;) =&gt; a - b;</div>
            <div>const difference = subtract(&#123; a: 4, b: 2 &#125;);</div>
            <p>sum = {sum}</p>
            <p>difference = {difference}</p>
          </>
        );
      })()}
      <hr />

      {/* Classes */}
      <h2>Classes</h2>
      <div className="bg-warning-subtle p-3 mb-1">Yellow background</div>
      <div className="bg-info-subtle p-3 mb-1">Blue background</div>
      <div className="bg-danger-subtle p-3 mb-1">Red background</div>
      <hr />

      {/* Red/Blue Backgrounds */}
      <h2>Red Dangerous and Blue Dynamic background</h2>
      <RedBackground>Red Dangerous Background</RedBackground>
      <BlueBackground>Blue Dynamic Background</BlueBackground>
      <hr />

      {/* HTML Style Attribute */}
      <h2>HTML Style Attribute</h2>
      <div style={{ backgroundColor: '#ffffe0', padding: '12px', marginBottom: '4px' }}>Yellow background</div>
      <div style={{ backgroundColor: '#f08080', padding: '12px', marginBottom: '4px' }}>Red background</div>
      <div style={{ backgroundColor: '#b3d8ea', padding: '12px', marginBottom: '4px' }}>Blue background</div>
      <hr />

      {/* Styles yellow, red, blue backgrounds */}
      <h2>Styles yellow, red, blue backgrounds</h2>
      <YellowBackground>Yellow Background</YellowBackground>
      <RedStyleBackground>Red Background</RedStyleBackground>
      <BlueStyleBackground>Blue Background</BlueStyleBackground>
      <hr />

      {/* Parameterizing Components */}
      <h2>Parameterizing Components</h2>
      {(() => {
        function Add({ a, b }) {
          return (
            <div id="wd-add">
              <h4>Add</h4>
              a = {a}<br />
              b = {b}<br />
              a + b = {a + b}<br />
            </div>
          );
        }
        return <Add a={3} b={4} />;
      })()}
      <hr />

      {/* Child Components */}
      <h2>Child Components</h2>
      <Card title="Nested Card">
        <p>This is a nested card component!</p>
      </Card>
      <hr />

      {/* Current Location */}
      <h2>Current Location</h2>
      <p>Current Path: {currentPath}</p>
      <hr />

      {/* Navigation Highlighting */}
      <h2>Navigation Highlighting</h2>
      <nav className="nav nav-tabs mb-3">
        <NavLink href="/labs">Labs</NavLink>
        <NavLink href="/labs/lab1">Lab 1</NavLink>
        <NavLink href="/labs/lab2">Lab 2</NavLink>
        <NavLink href="/labs/lab3">Lab 3</NavLink>
        <NavLink href="/kambaz">Kambaz</NavLink>
        <NavLink href="https://github.com/Divyam6255">My GitHub</NavLink>
      </nav>
      <hr />

      {/* Path Parameter Encoding */}
      <h2>Path Parameter Encoding</h2>
      <PathParameters />
    </div>
  );
}