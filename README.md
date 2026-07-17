# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



import React, { useEffect, useState } from 'react'

const TodoApp = () => {

  const [task, setTask] = useState("")

  const [todos, setTodos] = useState(()=>{

    const saveTodos = localStorage.getItem("todos")

    if(saveTodos){

      return JSON.parse(saveTodos)

    }

  })

  useEffect(()=>{

    localStorage.setItem("todos",JSON.stringify(todos))

  })

  const [edit,setEdit] = useState(null)

  const handleChange = (event) => {

    setTask(event.target.value)

  }

  const handleAddTodo = () => {

    if (task.trim() === "") {

      alert("Please enter a task")

      return;

    }

    if(edit){

      const updateTodos = todos.map((todo)=>{

        if(todo.id===edit){

          return {

            ...todo,
               title:task

          }

        }

        return todo

      })

      setTodos(updateTodos)

      setEdit(null)

    }else{

      setTodos([...todos,{

        id:Date.now(),

        title:task,

        complete:false

      }

      ]

      )

    }

    setTask("")

  }

  const handleEditTodo=(todo)=>{

    setTask(todo.title)

    setEdit(todo.id)

  }

  const handleDeleteTodo=(id)=>{

  const updatedTodos = todos.filter((todo)=>{

    return todo.id !== id

  })

  setTodos(updatedTodos)

  }

  return (

    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>

      <div className='w-130 shadow-lg rounded-lg p-8'>

        <h1 className='text-center font-bold text-3xl mb-6'>TODO APP</h1>

        <div className='flex gap-5'>

          <input type="text" placeholder='Enter Your task'

            className="flex-1 border p-3 rounded outline-none" value={task} onChange={handleChange} />

          <button className='bg-blue-500 text-white px-5 rounded hover:bg-blue-700'

            onClick={handleAddTodo}

          >

            {edit ? "Update":"Add"}

          </button>

        </div>

        <div className='mt-3 '>

          {todos.map((todo, id) => (

            <div key={todo.id}   className="flex justify-between items-center border p-3 rounded mb-2">

                <p>{todo.title}</p>

              <div className='flex gap-3'>

                  <button className='bg-green-500 px-3 p-1 text-white hover:bg-red-700'
                 onClick={()=>handleEditTodo(todo)}  >
                  Edit
                  </button>

                <button className='bg-red-500 px-3 p-1 text-white hover:bg-red-700'

                onClick={()=>handleDeleteTodo(todo.id)}> Delete
                 </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default TodoApp               
