"use client";
import { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Redux Slices
import { createSlice } from '@reduxjs/toolkit';

const helloSlice = createSlice({
  name: 'hello',
  initialState: { message: 'Hello World' },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false, selected: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    selectTodo: (state, action) => {
      state.forEach(todo => {
        todo.selected = todo.id === action.payload;
      });
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    hello: helloSlice.reducer,
    counter: counterSlice.reducer,
    todos: todosSlice.reducer,
  },
});

const { setMessage } = helloSlice.actions;
const { increment, decrement, incrementByAmount } = counterSlice.actions;
const { addTodo, toggleTodo, deleteTodo, selectTodo, updateTodo } = todosSlice.actions;

// Components
function HelloWorldRedux() {
  const message = useSelector((state) => state.hello.message);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Hello World Redux</h3>
      <p>{message}</p>
      <button onClick={() => dispatch(setMessage('Hello Redux!'))}>
        Change Message
      </button>
    </div>
  );
}

function PassingFunctions({ theFunction }) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button onClick={theFunction}>
        Invoke the Function
      </button>
    </div>
  );
}

function EventObject() {
  const [event, setEvent] = useState(null);
  const handleClick = (e) => {
    e.target = e.target.outerHTML;
    delete e.view;
    setEvent(e);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      {event && <pre>{JSON.stringify(event, null, 2)}</pre>}
    </div>
  );
}

function BooleanStateVariables() {
  const [done, setDone] = useState(true);
  return (
    <div id="wd-boolean-state-variables">
      <h2>Boolean State Variables</h2>
      <p>{done ? "Done" : "Not done"}</p>
      <label>
        <input type="checkbox" checked={done}
               onChange={() => setDone(!done)} /> Done
      </label>
      {done && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
               Yay! you are done</div>}
    </div>
  );
}

function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());
  const dateObjectToHtmlDateString = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1
    }-${date.getDate() < 10 ? 0 : ""}${date.getDate()}`;
  };
  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <input
        type="date"
        defaultValue={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
    </div>
  );
}

function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        type="text"
        defaultValue={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="number"
        defaultValue={person.age}
        onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })}
        placeholder="Age"
      />
    </div>
  );
}

function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement}>Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li key={index}> {item}
            <button onClick={() => deleteElement(index)}>
              Delete</button>
          </li>))}
      </ul>
    </div>
  );
}

function CounterRedux() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Counter Redux</h3>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}

function TodoListRedux() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div>
      <h3>Todo List Redux</h3>
      <div>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd}>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ backgroundColor: todo.selected ? '#f0f0f0' : 'transparent' }}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleUpdate(todo.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  onClick={() => dispatch(selectTodo(todo.id))}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.text);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lab4Content() {
  // Component State Variables
  const [integerState, setIntegerState] = useState(0);
  const [stringState, setStringState] = useState('');

  // Sharing State
  const [sharedState, setSharedState] = useState('Shared Value');

  // Click Event functions
  const hello = () => {
    alert("Hello World!");
  };
  const lifeIs = (good) => {
    alert(`Life is ${good}`);
  };

  // Passing Data on Event function
  const add = (a, b) => {
    alert(`${a} + ${b} = ${a + b}`);
  };

  // Passing Functions callback
  function sayHello() {
    alert("Hello");
  };

  // Child Component for Sharing State
  function ChildComponent({ value, onChange }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
        <h5>Child Component</h5>
        <p>Shared Value: {value}</p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Change shared value"
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lab 4 - A4 Rubric Implementation</h1>

      {/* User Events */}
      <div style={{ marginBottom: '20px' }}>
        <h1>User Events</h1>

        <div id="wd-click-event">
          <h2>Handling Click Events</h2>
          <button onClick={hello} id="wd-hello-world-click">
            Hello World!</button>
          <button onClick={() => lifeIs("Good!")}
                  id="wd-life-is-good-click">
            Life is Good!</button>
          <button onClick={() => {
                    hello();
                    lifeIs("Great!");
                  }} id="wd-life-is-great-click">
            Life is Great!
          </button>
        </div>

        <div id="wd-passing-data-on-event">
          <h2>Passing Data on Event</h2>
          <button onClick={() => add(2, 3)}
                  // onClick={add(2, 3)}
                  id="wd-pass-data-click">
            Pass 2 and 3 to add()
          </button>
        </div>

        <PassingFunctions theFunction={sayHello} />

        <EventObject />
      </div>

      <hr />

      {/* Component State */}
      <div style={{ marginBottom: '20px' }}>
        <h1>Component State</h1>

        <h2>Integer State Variables</h2>
        <p>Integer: {integerState}</p>
        <button onClick={() => setIntegerState(integerState + 1)}>
          Increment
        </button>
        <button onClick={() => setIntegerState(integerState - 1)}>
          Decrement
        </button>

        <BooleanStateVariables />

        <h3>String State Variables</h3>
        <p>String: {stringState}</p>
        <input
          type="text"
          value={stringState}
          onChange={(e) => setStringState(e.target.value)}
          placeholder="Update string state"
        />

        <DateStateVariable />

        <ObjectStateVariable />

        <ArrayStateVariable />

        <h2>Sharing State Between Components</h2>
        <ChildComponent value={sharedState} onChange={setSharedState} />
      </div>

      <hr />

      {/* Application State */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Application State</h2>
        <HelloWorldRedux />
        <CounterRedux />
        <TodoListRedux />
      </div>

      <hr />

      {/* Todo List (Local State) */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Todo List (Local State)</h2>
        <TodoListLocal />
      </div>
    </div>
  );
}

function TodoListLocal() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JavaScript', completed: false, selected: false },
    { id: 2, text: 'Learn React', completed: false, selected: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, selected: false }]);
      setNewTodo('');
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSelect = (id) => {
    setTodos(todos.map(todo => ({ ...todo, selected: todo.id === id })));
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd}>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ backgroundColor: todo.selected ? '#f0f0f0' : 'transparent' }}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleUpdate(todo.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  onClick={() => handleSelect(todo.id)}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.text);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Lab4Page() {
  return (
    <Provider store={store}>
      <Lab4Content />
    </Provider>
  );
}