'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { get } from 'http';
import { useState } from 'react';

// Lab 3

export default function Lab3Page() {


  // Variables and constants

  const constantValue = "This is a constant";
  let variableValue = "This is a variable";

  // Variable types

  const stringVar = "Hello World";
  const numberVar = 42;
  const booleanVar = true;
  const arrayVar = [1, 2, 3, 4, 5];
  const objectVar = { name: "John", age: 30 };

  // Boolean Variables

  const isLoggedIn = true;
  const hasPermission = false;
  const isAdmin = true;

  // If Else

  const getGreeting = (time) => {
    if (time < 12) {
      return "Good morning!";
    } else if (time < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  };

  // Ternary conditional operator

  const getStatus = (isActive) => {
    return isActive ? "Active" : "Inactive";
  };

  // Generating conditional output
  
  const ConditionalOutput = ({ condition }) => {
    return condition ? <p>Condition is true</p> : <p>Condition is false</p>;
  };

  // Welcome If Else
  
  const WelcomeMessage = ({ user }) => {
    if (user) {
      return <h2>Welcome back, {user.name}!</h2>;
    } else {
      return <h2>Welcome, Guest!</h2>;
    }
  };

  // Please login Inline

  const LoginPrompt = ({ loggedIn }) => {
    return <p>{loggedIn ? "Welcome!" : "Please login"}</p>;
  };

  // Legacy ES5 function
  
  function legacyFunction(name) {
    return "Hello " + name;
  }

  // ES6 arrow functions

  const arrowFunction = (name) => {
    return `Hello ${name}`;
  };

  // Implied returns

  const impliedReturn = (x, y) => x + y;

  // Template Literals

  const templateLiteral = (name, age) => {
    return `My name is ${name} and I am ${age} years old.`;
  };

  // Working with Arrays
  
  const fruits = ["Apple", "Banana", "Orange", "Grape"];
  const moreFruits = ["Mango", "Pineapple"];

  // Array index and length

  function getArrayInfo(arr) {
    return {
      first: arr[0],
      last: arr[arr.length - 1],
      length: arr.length
    };
  }

  // Adding and Removing Data from Arrays

  const [dynamicArray, setDynamicArray] = useState([1, 2, 3]);

  const addToArray = () => {
    setDynamicArray([...dynamicArray, dynamicArray.length + 1]);
  };

  const removeFromArray = () => {
    setDynamicArray(dynamicArray.slice(0, -1));
  };

  // For Loops

  const forLoopExample = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(`Item ${i + 1}`);
    }
    return result;
  };

  // The Map Function

  const mapExample = [1, 2, 3, 4, 5].map(num => num * 2);

  // The Find Function

  const findExample = [1, 2, 3, 4, 5].find(num => num > 3);

  // The Find Index Function

  const findIndexExample = [1, 2, 3, 4, 5].findIndex(num => num > 3);

  // The Filter Function

  const filterExample = [1, 2, 3, 4, 5].filter(num => num % 2 === 0);

  // JavaScript Object Notation (JSON)

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

  // Implementing a simple ToDo List using React.js

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

  const TodoItem = ({ todo, onToggle }) => {
    return (
      <div className="d-flex align-items-center mb-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="me-2"
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </div>
    );
  };

  const TodoList = ({ todos, onToggle }) => {
    return (
      <div>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
        ))}
      </div>
    );
  };

  // The Spread Operator

  const originalArray = [1, 2, 3];
  const spreadExample = [...originalArray, 4, 5];

  const originalObject = { name: "John", age: 30 };
  const spreadObjectExample = { ...originalObject, city: "Boston" };

  // Destructing

  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  const { name, age } = { name: "Alice", age: 25 };

  // Function Destructing

  const getUserInfo = ({ name, age }) => {
    return `${name} is ${age} years old`;
  };

  // Working with HTML classes

  const [isDanger, setIsDanger] = useState(false);
  const [isBlue, setIsBlue] = useState(false);

  // Red Dangerous background

  const RedBackground = ({ children }) => {
    return (
      <div className="bg-danger text-white p-3 mb-3">
        {children}
      </div>
    );
  };

  // Blue Dynamic blue background

  const BlueBackground = ({ children }) => {
    return (
      <div className="bg-primary text-white p-3 mb-3">
        {children}
      </div>
    );
  };

  // Working with the HTML Style attribute
  
  const styleExample = {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '10px',
    margin: '10px 0'
  };

  // Styles yellow, red, blue backgrounds

  const YellowBackground = ({ children }) => {
    return (
      <div style={{ backgroundColor: 'yellow', padding: '10px', margin: '10px 0' }}>
        {children}
      </div>
    );
  };

  const RedStyleBackground = ({ children }) => {
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px 0' }}>
        {children}
      </div>
    );
  };

  const BlueStyleBackground = ({ children }) => {
    return (
      <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '10px 0' }}>
        {children}
      </div>
    );
  };

  // Parameterizing Components

  const ColoredBox = ({ color, children }) => {
    return (
      <div style={{
        backgroundColor: color,
        padding: '20px',
        margin: '10px 0',
        borderRadius: '5px'
      }}>
        {children}
      </div>
    );
  };

  // Child Components

  const Card = ({ title, children }) => {
    return (
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="mb-0">{title}</h5>
        </div>
        <div className="card-body">
          {children}
        </div>
      </div>
    );
  };

  // Working with Location

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // Navigation highlights current page
  
  const NavLink = ({ href, children }) => {
    const isActive = currentPath === href;
    return (
      <a
        href={href}
        className={`nav-link ${isActive ? 'active fw-bold' : ''}`}
        style={{ color: isActive ? 'red' : 'inherit' }}
      >
        {children}
      </a>
    );
  };

  // Encoding Path Parameters
  
  const encodePath = (param) => {
    return encodeURIComponent(param);
  };

  // 1 + 2 displays 3, 3 + 4 displays 7
  
  const Calculator = ({ a, b }) => {
    return <p>{a} + {b} = {a + b}</p>;
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Lab 3</h1>

      
  <p>&quot;Variables and Constants&quot;</p>
        <p><strong>Constant:</strong> {constantValue}</p>
        <p><strong>Variable:</strong> {variableValue}</p>
      <hr></hr>

  <p>&quot;Variable Types&quot;</p>
        <p><strong>String:</strong> {stringVar}</p>
        <p><strong>Number:</strong> {numberVar}</p>
        <p><strong>Boolean:</strong> {booleanVar.toString()}</p>
        <p><strong>Array:</strong> {JSON.stringify(arrayVar)}</p>
        <p><strong>Object:</strong> {JSON.stringify(objectVar)}</p>
      <hr></hr>

  <p>&quot;Boolean Variables&quot;</p>
        <p>Logged In: {isLoggedIn.toString()}</p>
        <p>Has Permission: {hasPermission.toString()}</p>
        <p>Is Admin: {isAdmin.toString()}</p>
      <hr></hr>

      
  <p>&quot;If Else Statements&quot;</p>
        <p>{getGreeting(10)} (morning)</p>
        <p>{getGreeting(15)} (afternoon)</p>
        <p>{getGreeting(20)} (evening)</p>
      <hr></hr>

      
  <p>&quot;Ternary Operator&quot;</p>
        <p>Status: {getStatus(true)}</p>
        <p>Status: {getStatus(false)}</p>
      <hr></hr>

      
  <p>&quot;Conditional Output&quot;</p>
        <ConditionalOutput condition={true} />
        <ConditionalOutput condition={false} />
      <hr></hr>

      
  <p>&quot;Welcome Messages&quot;</p>
        <WelcomeMessage user={{ name: "Alice" }} />
        <WelcomeMessage user={null} />
      <hr></hr>

      
  <p>&quot;Login Prompts&quot;</p>
        <LoginPrompt loggedIn={true} />
        <LoginPrompt loggedIn={false} />
      <hr></hr>

      
  <p>&quot;Functions&quot;</p>
        <p><strong>ES5 Function:</strong> {legacyFunction("World")}</p>
        <p><strong>ES6 Arrow Function:</strong> {arrowFunction("World")}</p>
        <p><strong>Implied Return:</strong> 5 + 3 = {impliedReturn(5, 3)}</p>
      <hr></hr>

      
  <p>&quot;Template Literals&quot;</p>
        <p>{templateLiteral("Bob", 28)}</p>
      <hr></hr>

      
  <p>&quot;Arrays&quot;</p>
        <p><strong>Fruits:</strong> {fruits.join(", ")}</p>
        <p><strong>Array Info:</strong> {JSON.stringify(getArrayInfo(fruits))}</p>
        <p><strong>More Fruits:</strong> {JSON.stringify(getArrayInfo(moreFruits))}</p>
      <hr></hr>

      
  <p>&quot;Dynamic Arrays&quot;</p>
        <p>Current Array: {dynamicArray.join(", ")}</p>
        <button className="btn btn-success me-2" onClick={addToArray}>Add Item</button>
        <button className="btn btn-danger" onClick={removeFromArray}>Remove Item</button>
      <hr></hr>

  <p>&quot;For Loops&quot;</p>
        <ul>
          {forLoopExample().map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      <hr></hr>

      
  <p>&quot;Array Methods&quot;</p>
        <p><strong>Map (doubled):</strong> {mapExample.join(", ")}</p>
        <p><strong>Find (first &gt; 3):</strong> {findExample}</p>
        <p><strong>Find Index (first &gt; 3):</strong> {findIndexExample}</p>
        <p><strong>Filter (even numbers):</strong> {filterExample.join(", ")}</p>
      <hr></hr>

      
  <p>&quot;JSON Example&quot;</p>
        <pre>{JSON.stringify(jsonExample, null, 2)}</pre>
      <hr></hr>

      
  <p>&quot;Todo List&quot;</p>
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
      <hr></hr>

      
  <p>&quot;Spread Operator&quot;</p>
        <p><strong>Array Spread:</strong> {spreadExample.join(", ")}</p>
        <p><strong>Object Spread:</strong> {JSON.stringify(spreadObjectExample)}</p>
      <hr></hr>

      
  <p>&quot;Destructuring&quot;</p>
        <p><strong>Array Destructuring:</strong> first: {first}, second: {second}, rest: {rest.join(", ")}</p>
        <p><strong>Object Destructuring:</strong> {getUserInfo({ name, age })}</p>
      <hr></hr>

      
  <p>&quot;HTML Classes&quot;</p>
        <button
          className={`btn ${isDanger ? 'btn-danger' : 'btn-success'} me-2`}
          onClick={() => setIsDanger(!isDanger)}
        >
          Toggle Danger Class
        </button>
        <button
          className={`btn ${isBlue ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setIsBlue(!isBlue)}
        >
          Toggle Blue Class
        </button>
      <hr></hr>

      
      <RedBackground>Red Dangerous Background</RedBackground>
      <BlueBackground>Blue Dynamic Background</BlueBackground>
      <hr></hr>

      
  <p>&quot;HTML Style Attribute&quot;</p>
        <div style={styleExample}>Yellow background with inline styles</div>
      <hr></hr>


      
      <YellowBackground>Yellow Background</YellowBackground>
      <RedStyleBackground>Red Background</RedStyleBackground>
      <BlueStyleBackground>Blue Background</BlueStyleBackground>
      <hr></hr>

      
  <p>&quot;Parameterized Components&quot;</p>
        <ColoredBox color="lightblue">Light Blue Box</ColoredBox>
        <ColoredBox color="lightgreen">Light Green Box</ColoredBox>
        <ColoredBox color="lightcoral">Light Coral Box</ColoredBox>
      <hr></hr>

      
  <p>&quot;Child Components&quot;</p>
        <Card title="Nested Card">
          <p>This is a nested card component!</p>
        </Card>
      <hr></hr>

      
  <p>&quot;Current Location&quot;</p>
        <p>Current Path: {currentPath}</p>
      <hr></hr>

      
  <p>&quot;Navigation Highlighting&quot;</p>
        <nav className="nav nav-pills">
          <NavLink href="/labs/lab3">Lab 3</NavLink>
          <NavLink href="/labs/lab2">Lab 2</NavLink>
          <NavLink href="/labs/lab1">Lab 1</NavLink>
        </nav>
      <hr></hr>

  <p>&quot;Path Parameter Encoding&quot;</p>
        <p>Encoded &quot;hello world&quot;: {encodePath("hello world")}</p>
        <p>Encoded &quot;user@example.com&quot;: {encodePath("user@example.com")}</p>
      <hr></hr>  

      
  <p>&quot;Calculator Component&quot;</p>
        <Calculator a={1} b={2} />
        <Calculator a={3} b={4} />
    </div>
  );
}