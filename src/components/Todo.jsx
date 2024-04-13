import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm, setTodos } from '../redux/actions'; 

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch]);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Update current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`max-w-screen-lg mx-auto mt-8 p-8 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300'}`}>
      <h2 className={`mt-3 mb-6 text-2xl font-bold font-serif text-center uppercase ${darkMode ? 'text-white' : 'text-black'}`}>Task Manager</h2>
      <div className={`mb-4 text-center ${darkMode ? 'text-gray-500' : 'text-gray-900'}`}>{currentDateTime}</div>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}
        />
        <button
          className={`ml-4 p-2 rounded hover:bg-blue-600 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'}`}
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}
          />
          <button className={`ml-4 p-2 rounded hover:bg-blue-600 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'}`}>
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <div className="text-center">
        <button className={`p-2 rounded hover:bg-blue-600 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <TodoList />
    </div>
  );
};

export default Todo;
