import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [edit, setEdit] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTodo = (event) => {
    if (input.trim() === "") {
      toast.warning("Please enter a task");
      return;
    }

    if (edit) {
      const updateTodo = todos.map((todo) => {
        if (todo.id === edit) {
          return { ...todo, title: input };
        }
        return todo;
      });

      setTodos(updateTodo);
      toast.success("Task updated");
      setEdit(null);
      setInput("");
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: input,
          complete: false,
        },
      ]);
      toast.success("Task added successfully");
      setInput("");
    }
  };

  const handleEdit = (todo) => {
    setInput(todo.title);
    setEdit(todo.id);
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(deleteTodo);
    toast.error("Task deleted");
  };

  const handleComplete = (id) => {
    const updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans'>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className='w-full max-w-xl bg-white shadow-lg border border-gray-100 rounded-lg p-6 md:p-8'>
        <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>React Todo App</h1>
        
        {/* Input Section */}
        <div className='flex gap-3 mb-8'>
          <input type="text" placeholder='What needs to be done?' 
            className="flex-1 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" 
            value={input} 
            onChange={handleChange}  />
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-md shadow-sm transition-all'
            onClick={handleAddTodo}>
            {edit ? "Update" : "Add Task"}
          </button>
        </div>

        {/* Todo List Section */}
        <div className='space-y-3'>
          {todos.map((todo) => (
            <div 
              key={todo.id} 
              className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow" >
              <p className={`text-lg font-medium mb-3 md:mb-0 ${todo.complete ? "line-through text-gray-400" : "text-gray-700"}`}>
                {todo.title}
              </p>
              
              <div className='flex gap-2'>
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors ${todo.complete ? "bg-gray-500 hover:bg-gray-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
                  onClick={() => handleComplete(todo.id)}>
                  {todo.complete ? "Undo" : "Complete"}
                </button>
                
                <button className='bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors'
                  onClick={() => handleEdit(todo)}>
                  Edit
                </button>
                
                <button className='bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors'
                  onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Empty State Message */}
          {todos.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No tasks yet. Add a task to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;