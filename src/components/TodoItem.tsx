import React, { useState } from "react";
import { Button } from "./Button";
import { useTasks } from "./TaskContext";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
}

interface TodoItemProps {
  task: Task;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const { deleteTask, editTask, toggleEdit } = useTasks(); // Access context
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    editTask(task.id, editTitle);
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b">
      {task.isEditing ? (
        <>
          <input
            className="flex-1 border p-2 rounded w-full sm:w-auto"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2"
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <span className="flex-1 break-words whitespace-normal">
            {task.title}
          </span>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button onClick={() => toggleEdit(task.id)}>Edit</Button>
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
