import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortBy, setSortBy] = useState('all');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = { id: Date.now(), name: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
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

  const updateTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
    setSelectedTask(null);
    setNewTask(newName); 
  };
  

  const sortTasks = () => {
    let sortedTasks = tasks;
    if (sortBy === 'completed') {
      sortedTasks = tasks.filter((task) => task.completed);
    } else if (sortBy === 'incomplete') {
      sortedTasks = tasks.filter((task) => !task.completed);
    }
    return (
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <ul>
              <li>{task.name}</li>
              <li>
                <button onClick={() => toggleComplete(task.id)}>
                  {task.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button onClick={() => setSelectedTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    );
    ;
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <h1>To-Do App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedTask) {
            updateTask(selectedTask.id, newTask);
          } else {
            addTask();
          }
        }}
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          id='text'
        />
        <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
        {selectedTask && (
          <button type="button" onClick={() => setSelectedTask(null)}>
            Cancel
          </button>
        )}
      </form>

      <select value={sortBy} onChange={handleSortChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="incomplete">Incomplete Tasks</option>
      </select>

      {sortTasks()}
    </div>
  );
};

export default TodoApp;
