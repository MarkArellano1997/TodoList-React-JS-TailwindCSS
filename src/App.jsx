import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [task, setTask] = useState({
    name: "",
    complete: false
  })

  const [listTasks, setListTasks] = useState([])

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleButton = (task) => {
    if (!Object.values(task).includes('')) {
      const newTask = { ...task, id: uuidv4() }
      setListTasks([
        ...listTasks,
        newTask
      ])
      task.name = ''
    } else {
      setError('Todos los campos son requeridos')
      setTimeout(()=>{
        setError('')
      },4000)
    }

  }

  const handleButtonTask = (id) => {
    setListTasks(listTasks.filter(task => task.id !== id))
  }

  const handleSpan = (state) => {
    setListTasks(listTasks.map(task => task.id === state.id ? {
      id: state.id, complete: !state.complete, name: state.name
    } : task))
    console.log(listTasks);
  }

  return (
    <div className="h-[90vh]">
      <div className="w-1/4 h-2/5 bg-white mt-12 mx-auto">
        <h1 className="pt-5 text-center text-3xl font-semibold">Todo List</h1>
        {
          error && <p className="text-center text-red-500">{error}</p>

        }
        <div className="text-center py-3">
          <input type="text" name="name" value={task.name} onChange={handleChange} className="border mx-4" placeholder="Escriba su tarea" />

          <button onClick={() => handleButton(task)} className="bg-blue-500 px-1 rounded text-white">Añadir</button>
        </div>

        <ul>

          {
            listTasks.map(task => (
              <li key={task.id} className="flex justify-between bg-gray-300 p-1 mx-3 my-2 rounded"><span onClick={() => handleSpan(task)} className={`hover:cursor-pointer ${task.complete ? "line-through opacity-45" : ""}`}>{`${task.name}`}</span><button onClick={() => handleButtonTask(task.id)} className="bg-red-500 px-1 rounded text-white">Eliminar</button></li>
            ))
          }
        </ul>


      </div>

    </div>
  )
}

export default App
