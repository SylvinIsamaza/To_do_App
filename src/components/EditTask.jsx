import React, { useState } from 'react';

function EditTaskPage({ taskId, initialTaskName, onSave }) {
  const [taskName, setTaskName] = useState(initialTaskName);

  const handleSave = () => {
    onSave(taskId, taskName);
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditTaskPage;
