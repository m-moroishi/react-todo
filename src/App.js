import { useState, useRef } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: '掃除', completed: true },
    { id: 2, content: '洗濯', completed: true },
  ]);

  const todoContentRef = useRef();

  const handleAddTodo = () => {
    const content = todoContentRef.current.value;
    if (content === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), content: content, completed: false }];
    });

    todoContentRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }


  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoContentRef} />
      <button onClick={handleAddTodo}>追加</button>
      <button onClick={handleClear}>完了したタスク</button>
      <div>残りのタスク{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
