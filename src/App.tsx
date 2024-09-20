import {useEffect, useState} from 'react';

// you need to match this with the output of your api
type Task = {
  task_name: string;
  task_description: string;
}

function App() {
  // container for tasks from api
  const [tasks, setTasks] = useState<Task[]>([])

  // state for new task
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // state for loading
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8200/api/tasks')
    .then(response => response.json())
    .then(data => setTasks(data))
  }, [flag])

  const addTask = async (e: any) => {
    e.preventDefault()
    console.log(taskName, taskDescription);

    fetch('http://localhost:8200/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({task_name: taskName, task_description: taskDescription})
    })
    .then(response => response.json())
    .then(data => {
      setFlag(prev => prev + 1)
      setTaskName('')
      setTaskDescription('')
    })
  }


  return (
    <div>
      <h1>React + Laravel</h1>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.task_name}</h3>
            <p>{task.task_description}</p>
          </li>
        ))}
      </ul>
      <form>
        <div>
          <label htmlFor="taskName">Task Name</label><br />
          <input type="text" id="taskName" onChange={e => setTaskName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="taskDescription">Task Description</label><br />
          <input type="text" id="taskDescription" onChange={e => setTaskDescription(e.target.value)} />
        </div>
        <button type="submit" onClick={addTask}>Add Task</button>
      </form>
    </div>
  )
}

export default App;
