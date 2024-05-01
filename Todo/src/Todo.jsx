import React, { useState , useEffect } from "react";
import "./Todo.css"; // Import the CSS file
import axios from 'axios'

function Todo() {
  const [todos, setTodos] = useState([{ task: "Sample Task", description: "Sample Description", done: false }]);
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [mark, setMark] = useState(false);

  const handleAddTask = () => {
    const newTodo = { task: inputValue, description: descriptionValue, done: false };
    setTodos([...todos, newTodo]);
  
    axios.post('http://localhost:3000/data', newTodo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

  
    setInputValue("");
    setDescriptionValue("");
    console.log(todos[1]);
  };
  
  useEffect(()=> {
    fetchdata();
  },[]);

  const fetchdata = async () => {
    const resp = await axios.get('http://localhost:3000/data');
    console.log(resp.data);
    setTodos(resp.data);
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleUpdate = (currentTask, currentDesc) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.task === currentTask && todo.description === currentDesc) {
        return { ...todo, task: inputValue, description: descriptionValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
  
    // Make API call to update the todo item on the server
    axios.put(`http://localhost:3000/data/${currentTask}`, { task: inputValue, description: descriptionValue })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleDelete = (taskToDelete , taskID) => {
    const taskIdd = taskID
    const updatedTodos = todos.filter((todo) => todo.task !== taskToDelete);
    setTodos(updatedTodos);
    console.log(taskID);
    const resp = axios.get(`http://localhost:3000/data/delete?deletedData=${taskIdd}`)
  };

  const handleUppercase = (taskToUppercase) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.task === taskToUppercase) {
        return { ...todo, task: todo.task.toUpperCase() };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleToggleMark = () => {
    const updatedTodos = todos.map((todo) => ({ ...todo, done: !mark }));
    setTodos(updatedTodos);
    setMark(!mark);

  };

  const handleSingleToggelMark = (taskToMark) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.task === taskToMark) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="todo-input"
          placeholder="Task"
        />
        <input
          type="text"
          value={descriptionValue}
          onChange={handleDescriptionChange}
          className="todo-description"
          placeholder="Description"
        />
        <button onClick={handleAddTask} className="todo-button">Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.done ? 'completed' : ''}`}>
            <div>
              <strong>{todo.task}</strong>
              <p>{todo.description}</p>
              <button onClick={() => handleDelete(todo.task, todo._id)}>Delete</button>
              <button onClick={() => handleUppercase(todo.task)}>Uppercase</button>
              <button onClick={() => handleSingleToggelMark(todo.task)}>
                {todo.done ? "Mark as Undone" : "Mark as Done"}
              </button>
              <button onClick={() => handleUpdate(todo.task , todo.description)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleToggleMark} className="todo-button">
        {mark ? "Mark all as Undone" : "Mark all as Done"}
      </button>
    </div>
  );
}

export default Todo;
