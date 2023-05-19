import { useState } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do App</h1>
    
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          id='text'
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
        <li>completion</li>
        <li>name</li>
        <li className='action'>action</li>
      </ul>
      </div>
      
        {tasks.map((task) => (
          <ul>
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            </li>
            <li>
            {task.completed ? <s>{task.name}</s> : task.name}
            </li>
            <div className='action'><li>
            <button onClick={() => deleteTask(task.id)}>d</button>

            </li>
           <li>  <button onClick={() => editTask(task.id, prompt('Enter a new name', task.name))}>
              
            </button></li></div>
            
          
          
          </ul>
        ))}
      
    </div>
  );
}

export default TodoApp;
